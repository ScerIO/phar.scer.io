import * as React from 'react'
import withThemeController, { Props as ThemeControllerProps, ThemeType } from './withThemeController'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline'
import * as Themes from 'theme'

interface Props extends ThemeControllerProps {
  children: React.ReactNode
}

function ThemeProvider({
  theme,
  children,
}: Props) {
  return (
    <MuiThemeProvider theme={Themes[ThemeType[theme]]}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default withThemeController(ThemeProvider)
