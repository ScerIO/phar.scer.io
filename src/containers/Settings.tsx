import * as React from 'react'
import ReactGA from 'react-ga'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import PackOptions from 'containers/PackOptions'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { withTranslation, WithTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import { inject, observer, Observer } from 'mobx-react'
import { SettingsStore } from 'store/Settings'
import { isSystemPrefersThemeSupport } from 'utils'
import { ThemeType } from 'theme'

interface IProps extends WithTranslation {
  fullScreen?: boolean
  settingsStore?: SettingsStore
  open: boolean
  onClose(): void
}

function Settings({
  fullScreen,
  open,
  onClose,
  settingsStore,
  i18n,
}: IProps) {
  function changeTheme(event: React.ChangeEvent<HTMLSelectElement>) {
    settingsStore.theme = ThemeType[event.target.value]
    ReactGA.event({
      category: 'Settings',
      action: 'Set theme',
      label: event.target.value
    })
  }

  return (
    <Dialog
      fullWidth
      transitionDuration={600}
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby='responsive-dialog-title'>
      <DialogTitle id='responsive-dialog-title'>{i18n.t('settings')}</DialogTitle>
      <DialogContent>
        <PackOptions />
        <Grid container direction='column'>
          <Grid item>
            <Observer>
              {() => <FormControl fullWidth margin='normal'>
                <InputLabel htmlFor='select-theme'>{i18n.t('theme')}</InputLabel>
                <Select
                  value={ThemeType[settingsStore.theme]}
                  onChange={changeTheme}
                  inputProps={{
                    name: 'theme',
                    id: 'select-theme',
                  }}>
                  {isSystemPrefersThemeSupport() && <MenuItem value={ThemeType.system}>{i18n.t('themes.system')}</MenuItem>}
                  <MenuItem value={ThemeType.light}>{i18n.t('themes.light')}</MenuItem>
                  <MenuItem value={ThemeType.dark}>{i18n.t('themes.dark')}</MenuItem>
                </Select>
              </FormControl>}
            </Observer>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          {i18n.t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default inject('settingsStore')(observer(withMobileDialog()(withTranslation()(Settings))))
