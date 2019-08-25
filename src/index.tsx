import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'

import { Provider } from 'mobx-react'
import { AsyncTrunk } from 'mobx-sync'
import App from 'containers/App'

import 'i18n'
import ThemeProvider from 'containers/ThemeProvider'
import { settingsStore } from 'store/Settings'
import { notificationStore } from 'store/Notification'
import setThemeColor from 'utils/setThemeColor'
import { getMainColorByTheme } from 'theme'
import { connectionStatusStore } from 'store/ConnectionStatus'

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

const trunk = new AsyncTrunk(settingsStore, { storage: localStorage })

trunk.init().then(() => {
  ReactDOM.render(
    <Provider
      settingsStore={settingsStore}
      notificationStore={notificationStore}
      connectionStatusStore={connectionStatusStore}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>,
    document.getElementById('root')
  )

  setThemeColor(getMainColorByTheme(settingsStore.theme))
})
