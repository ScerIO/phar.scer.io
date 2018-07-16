import * as React from 'react'
import MaterialAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'

import Styled from './style'
import withUIDrawerStatus, { Props as StateProps } from 'containers/drawer-status'

interface Props extends StateProps {
  noHideDrawer: boolean
  largeScreen: boolean
  online: boolean
}

const AppBar = ({
  noHideDrawer,
  largeScreen,
  online,
  drawerStatus,
  setUIDrawerStatus,
}: Props) =>
  <MaterialAppBar position='static'>
    <Toolbar>
      {!largeScreen &&
        <IconButton
          disabled={!noHideDrawer}
          color='inherit'
          aria-label='open drawer'
          onClick={() => setUIDrawerStatus(!drawerStatus)}>
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
  </MaterialAppBar>

export default withUIDrawerStatus(AppBar)
