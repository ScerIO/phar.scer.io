import * as React from 'react'
import withInternetStatus, { Props as InternetStatusProps, InternetStatusType } from './withInternetStatus'
import MaterialAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import Collapse from '@material-ui/core/Slide';
import withWidth, { WithWidth, isWidthUp } from '@material-ui/core/withWidth'

import { withI18n, WithI18n } from 'react-i18next'

interface Props extends InternetStatusProps, WithWidth, WithI18n {
  settingsClick(): void
}

const Header = ({
  isOnline,
  setInternetStatus,
  width,
  settingsClick,
  t,
}: Props) => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)

  function updateOnlineStatus(_event: Event) {
    setInternetStatus(navigator.onLine
      ? InternetStatusType.online
      : InternetStatusType.offline
    )
  }

  return (
    <Collapse direction='down' in={true} timeout={1200}>
      <MaterialAppBar position='static'>
          <Toolbar>
            <Typography component='h1' variant='h6' color='inherit' style={{flexGrow: 1}}>
              PHAR {isWidthUp('sm', width) && ' ' + t('title')}
            </Typography>
            {isOnline &&
              <Button
                color='inherit'
                onClick={() => window.open(homepageUrl, '_blank')} >
                GitHub
              </Button>}
            <IconButton
                color='inherit'
                aria-label='Pack settings'
                onClick={settingsClick}>
              <SettingsIcon />
            </IconButton>
          </Toolbar>
      </MaterialAppBar>
    </Collapse>
  )
}

export default withInternetStatus(withI18n()(withWidth()(Header)))
