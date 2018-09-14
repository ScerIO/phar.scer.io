import * as React from 'react'
import { Dispatch } from 'react-redux'

import Snackbar from '@material-ui/core/Snackbar'
import withWidth, { isWidthUp, WithWidthProps } from '@material-ui/core/withWidth'

import { ZipConverter, Archive, Compression } from 'phar'
import { saveAs } from 'file-saver'

import { connect } from 'utils/Connect'
import { ApplicationState } from 'reducers/Root'
import { ModeType } from 'actions/Mode'
import { Signature } from 'actions/PackOptions'
import PharToolbar from 'components/mode-toolbar'
import DropArea from 'components/dropzone'
import PackOptions from 'components/pack-options'

import Styled from 'components/app/style'
import debug from 'utils/debug'
import { InternetStatusType, setInternetStatus } from 'actions/InternetStatus'
import Drawer from 'components/drawer'
import AppBar from 'components/app-toolbar'

interface StateProps {
  mode?: ModeType
  signature?: Signature
  compress?: boolean
  stub?: string
  internetStatus?: InternetStatusType
}

interface State {
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
      largeScreen = isWidthUp('sm', this.props.width)

    return (
      <>
        <Drawer
          noHideDrawer={noHideDrawer}
          largeScreen={largeScreen}>
          <PackOptions />
        </Drawer>

        <Styled.Content drawerOffset={noHideDrawer}>
          <AppBar
            noHideDrawer={noHideDrawer}
            largeScreen={largeScreen}
            online={online}/>
          <PharToolbar />

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

export default withWidth()(App)
