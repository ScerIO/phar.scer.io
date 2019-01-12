import * as React from 'react'
import MaterialAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import Collapse from '@material-ui/core/Slide';
import withWidth, { WithWidth, isWidthUp } from '@material-ui/core/withWidth'

import withUISettingsModal, { Props as StateProps } from 'containers/settings-modal'
import { withNamespaces, WithNamespaces } from 'react-i18next'

interface Props extends StateProps, WithWidth, WithNamespaces {
  online: boolean
}

const AppBar = ({
  online,
  settingsModal,
  setUISettingsModal,
  width,
  t,
}: Props) =>
  <Collapse direction='down' in={true} timeout={1200}>
    <MaterialAppBar position='static'>
        <Toolbar>
          <Typography component='h1' variant='h6' color='inherit' style={{flexGrow: 1}}>
            PHAR {isWidthUp('sm', width) && ' ' + t('title')}
          </Typography>
          {
            online &&
              <Button
                color='inherit'
                onClick={() => window.open('https://github.com/pharjs/pharjs.github.io', '_blank')} >
                GitHub
              </Button>
          }
          <IconButton
              color='inherit'
              aria-label='Pack settings'
              onClick={() => setUISettingsModal(!settingsModal)}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
    </MaterialAppBar>
  </Collapse>

export default withUISettingsModal(withNamespaces()(withWidth()(AppBar)))
