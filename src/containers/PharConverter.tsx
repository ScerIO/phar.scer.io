import * as React from 'react'
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
import { processFile } from 'utils/phar'

interface Props extends WithWidth, WithTranslation {
  settingsStore?: SettingsStore
  notificationStore?: NotificationStore
}

interface State {
  processIsRunned: boolean
}


interface ResultEvent extends Event {
  data: {
    blob: Blob
    fileName: string
  }
}

class PharConverter extends React.Component<Props, State> {
  public state = {
    processIsRunned: false
  }
  private worker: Worker

  public componentDidMount() {
    if (typeof (Worker) !== 'undefined') {
      this.worker = new PharWorker()

      this.worker.addEventListener('message', (event: ResultEvent) =>
        this.handleSuccess(event.data.blob, event.data.fileName)
      )

      this.worker.addEventListener('error', (event: ErrorEvent) =>
        this.handleError(event.error)
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
          }).then((value) => this.handleSuccess(value.blob, value.fileName))
        } catch (error) {
          this.handleError(error)
        }
      }
    }
  }

  private handleSuccess(blob: Blob, fileName: string) {
    saveAs(blob, fileName)
    this.props.notificationStore.notify({
      message: this.props.t('success'),
      type: NotificationType.SUCCESS,
      length: NotificationLength.SHORT,
    })
    this.setState({
      processIsRunned: false,
    })
  }

  private handleError(error: Error) {
    debug(() => console.error(error.message))
    this.props.notificationStore.notify({
      message: error.message,
      type: NotificationType.ERROR,
      length: NotificationLength.LONG,
    })
    this.setState({
      processIsRunned: false,
    })
  }
}

export default inject('settingsStore', 'notificationStore')(withWidth()(withTranslation()(PharConverter))) as React.ComponentType
