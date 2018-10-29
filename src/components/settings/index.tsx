import * as React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import withUISettingsModal, { Props as SettingsModalProps } from 'containers/settings-modal'
import PackOptions from 'components/pack-options'
import withThemeController, { Props as ThemeControllerProps, ThemeType } from 'containers/theme-controller'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { withNamespaces, WithNamespaces } from 'react-i18next'
import { Grid } from '@material-ui/core';

interface Props extends SettingsModalProps, ThemeControllerProps, WithNamespaces {
  fullScreen?: boolean
}

class Settings extends React.Component<Props> {
  handleClose = () =>
    this.props.setUISettingsModal(false)

  changeTheme = (event: React.ChangeEvent<HTMLSelectElement>) =>
    this.props.setTheme(ThemeType[event.target.value])

  render() {
    const {
      fullScreen,
      settingsModal: open,
      theme,
      t,
    } = this.props

    return (
      <Dialog
        fullWidth
        transitionDuration={600}
        fullScreen={fullScreen}
        open={open}
        onClose={this.handleClose}
        aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>{t('settings')}</DialogTitle>
        <DialogContent>
          <PackOptions />
          <Grid container direction='column'>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel htmlFor='select-theme'>{t('theme')}</InputLabel>
                <Select
                  value={ThemeType[theme]}
                  onChange={this.changeTheme}
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
          <Button onClick={this.handleClose} autoFocus>
            {t('close')}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withMobileDialog()(withUISettingsModal(withThemeController(withNamespaces()(Settings))))
