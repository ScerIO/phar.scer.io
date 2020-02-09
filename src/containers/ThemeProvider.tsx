import * as React from 'react'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import * as Themes from 'theme'
import { inject, observer } from 'mobx-react'
import { SettingsStore, ThemeType } from 'store/Settings'

interface IProps {
  children: React.ReactNode
  settingsStore?: SettingsStore
}

const ThemeProvider = ({
  settingsStore: {
    theme,
  },
  children,
}: IProps) =>
  <MuiThemeProvider theme={Themes[ThemeType[theme]]}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>

export default inject('settingsStore')(observer(ThemeProvider))
