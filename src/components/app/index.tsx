import * as React from 'react'
import { Dispatch } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar'
import Typography from '@material-ui/core/Typography'

import { ZipConverter, Archive, Compression } from 'phar'
import { saveAs } from 'file-saver'

import { connect } from 'utils/Connect'
import { ApplicationState } from 'reducers/Root'
import { Signature } from 'actions/PackOptions'
import DropArea from 'components/dropzone'
import PackOptions from 'components/pack-options'
import Settings from 'components/settings'

import debug from 'utils/debug'
import { InternetStatusType, setInternetStatus } from 'actions/InternetStatus'
import AppBar from 'components/app-toolbar'

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import Grow from '@material-ui/core/Grow'
import { translate, InjectedTranslateProps } from 'react-i18next'
import withWidth, { isWidthUp, WithWidth } from '@material-ui/core/withWidth'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Theme } from '@material-ui/core/styles/createMuiTheme'

interface StateProps {
  signature?: Signature
  compress?: boolean
  stub?: string
  internetStatus?: InternetStatusType
}

interface State {
  error: string | null
  ready: boolean
}

interface DispatchProps {
  setInternetStatus?: typeof setInternetStatus
}

type Props = StateProps & DispatchProps & WithWidth & WithStyles<typeof styles> & InjectedTranslateProps

const styles = (theme: Theme) => createStyles({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  howto: {
    width: '90vw',
    [theme.breakpoints.up('md')]: {
      width: '400px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '600px',
    },
  },
})

@connect(App.mapStateToProps, App.mapDispatchToProps)
class App extends React.Component<Props, State> {
  static mapStateToProps(state: ApplicationState): StateProps {
    return {
      internetStatus: state.internetStatus,
      signature: state.packOptions.signature,
      compress: state.packOptions.compress,
      stub: state.packOptions.stub,
    }
  }

  static mapDispatchToProps(dispatch: Dispatch<DispatchProps>) {
    return {
      setInternetStatus: (internetStatus: InternetStatusType) => dispatch(setInternetStatus(internetStatus)),
    }
  }

  public state: State = {
    error: null,
    ready: false,
  }

  public componentDidMount() {
    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)
    this.setState({ready: true})
  }

  public componentWillUnmount() {
    window.removeEventListener('online', this.updateOnlineStatus)
    window.removeEventListener('offline', this.updateOnlineStatus)
  }

  private updateOnlineStatus = (_event) =>
    this.props.setInternetStatus(navigator.onLine
      ? InternetStatusType.online
      : InternetStatusType.offline
    )

  private handleErrorClose = (_event, reason) =>
    (reason !== 'clickaway') && this.setState({ error: null })

  public render(): JSX.Element {
    const
      {
        internetStatus,
        classes,
        width,
        t,
      } = this.props,
      {
        error,
        ready,
      } = this.state,
      online = internetStatus === InternetStatusType.online

    return (
      <Grid className={classes.container}>
        <AppBar online={online}/>

        <Settings
          title={t('settings')}
          closeButtonText={t('close')}>
          <PackOptions />
        </Settings>

        <Grid
          container
          alignItems='center'
          justify='center'
          className={classes.content}>
          <Grow in={ready} timeout={1200}>
            <Grid item>
              <ExpansionPanel className={classes.howto}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{t('how-to-use.title')}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography dangerouslySetInnerHTML={{__html: t('how-to-use.content')}} />
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <DropArea onSuccess={(files: File[]) => this.process(files)}>
                <Typography variant='headline' align='center'>
                  {isWidthUp('sm', width) ? t('select-or-drop') : t('select-file')}
                </Typography>
              </DropArea>
            </Grid>
          </Grow>
        </Grid>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={Boolean(error)}
          autoHideDuration={5000}
          onClose={this.handleErrorClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{error}</span>}/>
      </Grid>
    )
  }

  private process = (files: File[]) =>
    files.forEach((file: File) => {
      const extension = file.name.split('.').pop()
      switch(extension) {
        case 'phar':
          return this.pharToZip(file)
        case 'zip':
          return this.zipToPhar(file)
        default:
          this.setState({error: `Error: file "${file.name}" has an unsupported format ".${extension}"`})
      }
    })

  private pharToZip(file: File) {
    const reader = new FileReader(),
      fileName = file.name.substring(0, file.name.length - 4) + 'zip'

    reader.onload = async () => {
      try {
        const archive = new Archive()
          .loadPharData(new Uint8Array(reader.result as ArrayBuffer)),
          data = await ZipConverter.toZip(archive),
          zip = await data.generateAsync({
            type: 'uint8array'
          })
        saveAs(new Blob([zip], {
          type: 'application/zip'
        }), fileName)
      } catch (error) {
        this.setState({ error: error.message })
        debug(() => console.error(error))
      }
    }

    reader.readAsArrayBuffer(file)
  }

  private zipToPhar(file: File) {
    const {
      signature,
      stub,
      compress,
    } = this.props,
      reader = new FileReader(),
      fileName = file.name.substring(0, file.name.length - 3) + 'phar'

    reader.onload = async () => {
      try {
        const phar = await ZipConverter
          .toPhar(new Uint8Array(reader.result as ArrayBuffer), compress && Compression.GZ)
        phar.setSignatureType(signature)
        phar.setStub(stub)
        saveAs(new Blob([phar.savePharData(true)], {
          type: 'application/phar'
        }), fileName)
      } catch (error) {
        this.setState({ error: error.message })
        debug(() => console.error(error))
      }
    }

    reader.readAsArrayBuffer(file)
  }
}

export default translate('translations')(withStyles(styles)(withWidth()(App)))
