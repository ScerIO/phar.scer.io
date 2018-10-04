import { createMuiTheme } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'

export default createMuiTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: green[400]
    },
  },
})
