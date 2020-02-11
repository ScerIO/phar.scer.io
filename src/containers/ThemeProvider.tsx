import * as React from 'react'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeType, getThemeByType, getMainColorByTheme } from 'theme';
import { inject, observer } from 'mobx-react'
import { SettingsStore } from 'store/Settings'
import { systemPrefersTheme, SystemThemeCodes, setThemeColor } from 'utils';

interface IProps {
  children: React.ReactNode
  settingsStore?: SettingsStore
}

function findTheme(theme: ThemeType): ThemeType.light | ThemeType.dark {
  if (theme != ThemeType.system) {
    return theme;
  }
  let prefersTheme = systemPrefersTheme();
  switch (prefersTheme) {
    case SystemThemeCodes.dark:
      return ThemeType.dark;
    case SystemThemeCodes.light:
    default:
      return ThemeType.light;
  }
}

function ThemeProvider({
  settingsStore,
  children,
}: IProps) {
  let theme = findTheme(settingsStore.theme)
  setThemeColor(getMainColorByTheme(theme))

  return (
    <MuiThemeProvider theme={getThemeByType(ThemeType[theme])}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default inject('settingsStore')(observer(ThemeProvider))
