import { createMuiTheme } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'

export default createMuiTheme({
  palette: {
    primary: {
      main: grey[200],
    },
    secondary: {
      main: green[400]
    },
  },
})
