import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'
import { ThemeType } from 'actions/settings/Main'

const mainLightColor = '#FFFFFF'
export const light = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'light',
    primary: {
      main: mainLightColor,
    },
    secondary: {
      main: green[400]
    },
  },
})

const mainDarkColor = grey[800]
export const dark = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
    primary: {
      main: mainDarkColor,
    },
    secondary: {
      main: green[400]
    },
  },
})

export function getMainColorByTheme(theme: ThemeType) {
  switch(theme) {
    case ThemeType.light:
      return mainLightColor
    case ThemeType.dark:
      return mainDarkColor
    default:
      throw new Error(`Theme "${theme}" not found`)
  }
}
