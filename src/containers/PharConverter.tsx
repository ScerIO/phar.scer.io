import * as React from 'react'
import ReactGA from 'react-ga'
import withWidth, { isWidthUp, WithWidth } from '@material-ui/core/withWidth'
import { withTranslation, WithTranslation } from 'react-i18next'
import { debug } from 'utils'
import { saveAs } from 'file-saver'
import DropZone from 'components/DropZone'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { inject } from 'mobx-react'
import { SettingsStore } from 'store/Settings'
import { NotificationStore, NotificationLength } from 'store/Notification'
import { IPharConverterResult, ConvertStrategy } from 'services/phar'

interface IProps extends WithWidth, WithTranslation {
  settingsStore?: SettingsStore
  notificationStore?: NotificationStore
}

interface IState {
  processIsRun: boolean
}

class PharConverter extends React.Component<IProps, IState> {
  public state: IState = {processIsRun: true}
  private convertStrategy: ConvertStrategy

  public componentDidMount() {
    ConvertStrategy.findStrategy(this.handleResult).then((strategy) => {
      this.convertStrategy = strategy;
      this.setState({ processIsRun: false })
    });
  }

  private handleResult = (result: IPharConverterResult) => {
    if (result.error) {
      this.handleError(result.error)
    } else {
      this.handleSuccess(result)
    }
  }

  private process = async (files: File[]) => {
    this.setState({ processIsRun: true })
    for (const file of files) {
      this.convertStrategy.processFile({file, ...this.props.settingsStore});
    }
  }

  private handleSuccess(result: IPharConverterResult) {
    saveAs(result.blob, result.fileName)
    this.props.notificationStore.success('success')
    this.setState({ processIsRun: false })
    ReactGA.event({
      category: 'Converting',
      action: result.type,
    })
  }

  private handleError(error: Error | string) {
    debug(() => console.error(error))

    const isUnsupportedExtension = error === 'unsupported_extension';

    this.props.notificationStore.error(isUnsupportedExtension
      ? 'unsupported-extension'
      : `${error}`, {
      length: NotificationLength.LONG,
      isTranslatable: isUnsupportedExtension,
    })
    this.setState({processIsRun: false})
    ReactGA.exception({
      description: !isUnsupportedExtension ? 'Unknown convert error' : 'Unsupported extension',
    });
  }

  public render(): JSX.Element {
    const { width, t } = this.props
    const { processIsRun } = this.state

    return (
      <DropZone onSuccess={this.process}>
        {processIsRun
          ? <CircularProgress color='secondary' />
          : <Typography component='h2' variant='h5' align='center'>
            {isWidthUp('sm', width) ? t('select-or-drop') : t('select-file')}
          </Typography>}
      </DropZone>
    )
  }
}

export default inject('settingsStore', 'notificationStore')(
  withWidth()(withTranslation()(PharConverter)),
) as React.ComponentType
