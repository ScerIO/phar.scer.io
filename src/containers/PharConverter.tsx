import * as React from 'react'
import ReactGA from 'react-ga'
import withWidth, { isWidthUp, WithWidth } from '@material-ui/core/withWidth'
import { withTranslation, WithTranslation } from 'react-i18next'
import debug from 'utils/debug'
import { saveAs } from 'file-saver'
import DropZone from 'components/DropZone'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { inject } from 'mobx-react'
import { SettingsStore } from 'store/Settings'
import { NotificationStore, NotificationType, NotificationLength } from 'store/Notification'
import PharWorker from 'worker-loader!../utils/phar.worker.ts'
import { processFile, IPharConverterResult } from 'utils/phar'

interface IProps extends WithWidth, WithTranslation {
  settingsStore?: SettingsStore
  notificationStore?: NotificationStore
}

interface IState {
  processIsRunned: boolean
}

interface IResultEvent extends Event {
  data: IPharConverterResult
}

class PharConverter extends React.Component<IProps, IState> {
  public state: IState = {
    processIsRunned: false,
  }
  private worker: Worker

  public componentDidMount() {
    if (typeof (Worker) !== 'undefined') {
      this.worker = new PharWorker()

      this.worker.addEventListener('message', (event: IResultEvent) => {
        if (event.data.error) {
          this.handleError(event.data.error)
        } else {
          this.handleSuccess(event.data)
        }
      })

      this.worker.addEventListener('error', (event: ErrorEvent) =>
        this.handleError(event.error),
      )
    }
  }

  public render(): JSX.Element {
    const { width, t } = this.props
    const { processIsRunned } = this.state

    return (
      <DropZone onSuccess={this.process}>
        {processIsRunned
          ? <CircularProgress color='secondary' />
          : <Typography component='h2' variant='h5' align='center'>
            {isWidthUp('sm', width) ? t('select-or-drop') : t('select-file')}
          </Typography>}
      </DropZone>
    )
  }

  private process = async (files: File[]) => {
    const {
      signature,
      stub,
      compress,
    } = this.props.settingsStore
    this.setState({
      processIsRunned: true,
    })
    for (const file of files) {
      if (typeof (Worker) !== 'undefined') {
        this.worker.postMessage({
          file,
          signature,
          stub,
          compress,
        })
      } else {
        try {
          processFile(file, {
            signature,
            stub,
            compress,
          }).then((this.handleSuccess))
        } catch (error) {
          this.handleError(error)
        }
      }
    }
  }

  private handleSuccess(result: IPharConverterResult) {
    saveAs(result.blob, result.fileName)
    this.props.notificationStore.notify({
      message: 'success',
      type: NotificationType.SUCCESS,
      length: NotificationLength.SHORT,
    })
    this.setState({
      processIsRunned: false,
    })
    this.sendStatistics(result.type)
  }

  private handleError(error: Error | string) {
    debug(() => console.error(error))

    this.props.notificationStore.notify({
      message: error === 'unsupported_extension'
        ? 'unsupportded-extension'
        : `${error}`,
      type: NotificationType.ERROR,
      length: NotificationLength.LONG,
      isTranslatable: error === 'unsupported_extension',
    })
    this.setState({
      processIsRunned: false,
    })
  }

  private sendStatistics(action: string) {
    ReactGA.event({
      category: 'Converting',
      action,
    })
  }
}

export default inject('settingsStore', 'notificationStore')(
  withWidth()(withTranslation()(PharConverter)),
) as React.ComponentType
