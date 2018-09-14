import * as React from 'react'
import * as ReactDOM from 'react-dom'
import grey from '@material-ui/core/colors/grey'
import { injectGlobal } from 'styled-components'
import { MuiThemeProvider } from '@material-ui/core/styles'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'

import { Provider } from 'react-redux'
import RootStore from 'store/Root'
import App from 'components/app'

import theme from './theme'

OfflinePluginRuntime.install()

injectGlobal`
  body {
    min-height: 100vh;
    margin: 0;
    background-color: ${grey[50]};
    font-family: Roboto;
  }
`

ReactDOM.render(
  <Provider store={RootStore()} >
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
