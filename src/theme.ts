import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import green from '@material-ui/core/colors/green'

export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: green[400]
    },
  },
})
