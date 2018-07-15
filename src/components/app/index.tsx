import * as React from 'react'

import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'

import { ZipConverter, Archive, Compression } from 'phar'
import { saveAs } from 'file-saver'

import { connect } from 'utils/Connect'
import { ApplicationState } from 'reducers/Root'
import { ModeType } from 'actions/Mode'
import { Signature } from 'actions/PackOptions'
import PharToolbar from 'components/phar-toolbar'
import DropArea from 'components/dropzone'
import PackOptions from 'components/pack-options'

import Styled from './style'

interface StateProps {
  mode?: ModeType
  signature?: Signature
  compress?: boolean
  stub?: string
}

interface State {
  mobileOpenDrawer: boolean
  error: string | null
}

type Props = StateProps

@connect(App.mapStateToProps)
export default class App extends React.Component<Props, State> {
  private hiddenLink: HTMLLinkElement

  static mapStateToProps(state: ApplicationState): StateProps {
    return {
      mode: state.mode,
      signature: state.packOptions.signature,
      compress: state.packOptions.compress,
      stub: state.packOptions.stub,
    }
  }

  public state: State = {
    mobileOpenDrawer: false,
    error: null,
  }

  private handleDrawerToggle = () => {
    this.setState({ mobileOpenDrawer: !this.state.mobileOpenDrawer })
  }

  private handleErrorClose = (_event, reason) => {
    if (reason === 'clickaway') return

    this.setState({ error: null })
  }

  public render(): JSX.Element {
    const noHideDrawer = this.props.mode === ModeType.pack,
      { error } = this.state,
      drawer = (
        <Styled.DrawerContent>
          <PackOptions />
        </Styled.DrawerContent>
      )

    return (
      <>
        <Hidden mdUp>
          <Drawer
            variant='temporary'
            anchor='left'
            open={this.state.mobileOpenDrawer}
            onClose={this.handleDrawerToggle}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            variant={noHideDrawer ? 'permanent' : 'temporary'}
            open={noHideDrawer}>
            {drawer}
          </Drawer>
        </Hidden>

        <Styled.Content drawerOffset={noHideDrawer}>
          <Styled.HiddenLink target='_blank' innerRef={(hiddenLink: HTMLLinkElement) => { this.hiddenLink = hiddenLink }} />
          <Styled.OverlayMain>
            <AppBar position='static'>
              <Toolbar>
                <Hidden mdUp>
                  <IconButton
                    disabled={!noHideDrawer}
                    color='inherit'
                    aria-label='open drawer'
                    onClick={this.handleDrawerToggle}>
                    <MenuIcon />
                  </IconButton>
                </Hidden>
                <Styled.Title variant='title' color='inherit'>
                  PHAR
              </Styled.Title>
                <Button color='inherit' onClick={() => this.openLink('https://github.com/pharjs/pharjs.github.io')} >GitHub</Button>
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
          open={!!error}
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

  private openLink(href: string) {
    const { hiddenLink } = this
    hiddenLink.href = href
    hiddenLink.click()
  }

  private process(files: File[]) {
    files.forEach((file: File) => this.props.mode === ModeType.unpack ? this.pharToZip(file) : this.zipToPhar(file))
  }

  private pharToZip(file: File) {
    const reader = new FileReader(),
      fileName = file.name.substring(0, file.name.length - 4) + 'zip'

    reader.onload = () => {
      try {
        const archive = new Archive()
        archive.loadPharData(new Uint8Array(reader.result))
        ZipConverter
          .toZip(archive)
          .then((data) => data.generateAsync({
            type: 'uint8array'
          }))
          .then((zip) => saveAs(new Blob([zip], {
            type: 'application/zip'
          }), fileName))
      } catch (error) {
        this.setState({ error: error.message })
        console.error(error)
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

    reader.onload = () => {
      try {
        ZipConverter
          .toPhar(new Uint8Array(reader.result), compress && Compression.GZ)
          .then((phar: Archive) => {
            phar.setSignatureType(signature)
            phar.setStub(stub)
            saveAs(new Blob([phar.savePharData(true)], {
              type: 'application/phar'
            }), fileName)
          })
      } catch (error) {
        this.setState({ error: error.message })
        console.error(error)
      }
    }

    reader.readAsArrayBuffer(file)
  }
}
