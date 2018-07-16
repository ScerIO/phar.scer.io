import * as React from 'react'
import { Dispatch } from 'react-redux'

import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import withWidth, { isWidthUp, WithWidthProps } from '@material-ui/core/withWidth'

import { ZipConverter, Archive, Compression } from 'phar'
import { saveAs } from 'file-saver'

import { connect } from 'utils/Connect'
import { ApplicationState } from 'reducers/Root'
import { ModeType } from 'actions/Mode'
import { Signature } from 'actions/PackOptions'
import PharToolbar from 'components/phar-toolbar'
import DropArea from 'components/dropzone'
import PackOptions from 'components/pack-options'

import Styled from 'components/app/style'
import debug from 'utils/debug'
import { InternetStatusType, setInternetStatus } from 'actions/InternetStatus'

interface StateProps {
  mode?: ModeType
  signature?: Signature
  compress?: boolean
  stub?: string
  internetStatus?: InternetStatusType
}

interface State {
  mobileOpenDrawer: boolean
  error: string | null
}

interface DispatchProps {
  setInternetStatus?: typeof setInternetStatus
}

type Props = StateProps & DispatchProps & WithWidthProps

@connect(App.mapStateToProps, App.mapDispatchToProps)
class App extends React.Component<Props, State> {
  static mapStateToProps(state: ApplicationState): StateProps {
    return {
      internetStatus: state.internetStatus,
      mode: state.mode,
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
    mobileOpenDrawer: false,
    error: null,
  }

  public componentDidMount() {
    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)
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

  private handleDrawerToggle = () =>
    this.setState({ mobileOpenDrawer: !this.state.mobileOpenDrawer })

  private handleErrorClose = (_event, reason) =>
    (reason !== 'clickaway') && this.setState({ error: null })

  public render(): JSX.Element {
    const
      {
        internetStatus,
        mode,
      } = this.props,
      { error } = this.state,
      noHideDrawer = mode === ModeType.pack,
      online = internetStatus === InternetStatusType.online,
      largeScreen = isWidthUp('sm', this.props.width),
      drawer = (
        <Styled.DrawerContent>
          <PackOptions />
        </Styled.DrawerContent>
      )

    /**
     * TODO: transfer Drawer to independent component
     */

    return (
      <>
        <Drawer
          variant={noHideDrawer && largeScreen ? 'permanent' : 'temporary'}
          anchor='left'
          open={largeScreen ? noHideDrawer : this.state.mobileOpenDrawer}
          onClose={largeScreen ? null : this.handleDrawerToggle}>
          {drawer}
        </Drawer>

        <Styled.Content drawerOffset={noHideDrawer}>
          <Styled.OverlayMain>
            <AppBar position='static'>
              <Toolbar>
                {!largeScreen &&
                  <IconButton
                    disabled={!noHideDrawer}
                    color='inherit'
                    aria-label='open drawer'
                    onClick={this.handleDrawerToggle}>
                    <MenuIcon />
                  </IconButton>
                }
                <Styled.Title variant='title' color='inherit'>
                  PHAR
                </Styled.Title>
                {
                  online &&
                  <Button
                    color='inherit'
                    onClick={() => window.open('https://github.com/pharjs/pharjs.github.io', '_blank')} >
                    GitHub
                    </Button>
                }
              </Toolbar>
            </AppBar>
            <PharToolbar />
          </Styled.OverlayMain>

          <Styled.Main>
            <DropArea title='Select file or drop here' onSuccess={(files: File[]) => this.process(files)} />
          </Styled.Main>
        </Styled.Content>

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
          message={<span id="message-id">Error {error}</span>}
        />
      </>
    )
  }

  private process(files: File[]) {
    files.forEach((file: File) => this.props.mode === ModeType.unpack ? this.pharToZip(file) : this.zipToPhar(file))
  }

  private pharToZip(file: File) {
    const reader = new FileReader(),
      fileName = file.name.substring(0, file.name.length - 4) + 'zip'

    reader.onload = async () => {
      try {
        const archive = new Archive()
          .loadPharData(new Uint8Array(reader.result)),
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
          .toPhar(new Uint8Array(reader.result), compress && Compression.GZ)
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

export default withWidth()(App)
