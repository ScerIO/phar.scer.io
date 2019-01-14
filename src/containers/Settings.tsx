import * as React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import PackOptions from 'containers/PackOptions'
import withThemeController, { Props as ThemeControllerProps, ThemeType } from 'containers/withThemeController'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { withI18n, WithI18n } from 'react-i18next'
import Grid from '@material-ui/core/Grid'

interface OriginProps {
  open: boolean
  onClose(): void
}

interface Props extends OriginProps, ThemeControllerProps, WithI18n {
  fullScreen?: boolean
}

function Settings({
  fullScreen,
  open,
  onClose,
  theme,
  setTheme,
  t,
}: Props) {
  function changeTheme(event: React.ChangeEvent<HTMLSelectElement>) {
    setTheme(ThemeType[event.target.value])
  }

  return (
    <Dialog
      fullWidth
      transitionDuration={600}
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby='responsive-dialog-title'>
      <DialogTitle id='responsive-dialog-title'>{t('settings')}</DialogTitle>
      <DialogContent>
        <PackOptions />
        <Grid container direction='column'>
          <Grid item>
            <FormControl fullWidth margin='normal'>
              <InputLabel htmlFor='select-theme'>{t('theme')}</InputLabel>
              <Select
                value={ThemeType[theme]}
                onChange={changeTheme}
                inputProps={{
                  name: 'theme',
                  id: 'select-theme',
                }}>
                <MenuItem value={ThemeType.light}>{t('themes.light')}</MenuItem>
                <MenuItem value={ThemeType.dark}>{t('themes.dark')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withMobileDialog()(withThemeController(withI18n()(Settings))) as React.ComponentType<OriginProps>
