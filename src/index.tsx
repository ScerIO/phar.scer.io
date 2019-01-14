import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'

import { Provider } from 'react-redux'
import RootStore from 'store/Root'
import App from 'containers/App'

import 'i18n'
import ThemeProvider from 'containers/ThemeProvider';

OfflinePluginRuntime.install({
  onUpdating() {
    console.log('SW Event:', 'onUpdating')
  },
  onUpdateReady() {
    console.log('SW Event:', 'onUpdateReady')
    OfflinePluginRuntime.applyUpdate()
  },
  onUpdated() {
    console.log('SW Event:', 'onUpdated')
    window.location.reload()
  },
  onUpdateFailed() {
    console.log('SW Event:', 'onUpdateFailed')
  }
})

ReactDOM.render(
  <Provider store={RootStore()} >
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
