import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'

export const light = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'light',
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: green[400]
    },
  },
})

export const dark = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
    primary: {
      main: grey[800],
    },
    secondary: {
      main: green[400]
    },
  },
})
