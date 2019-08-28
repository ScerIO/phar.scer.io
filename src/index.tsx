import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import ReactGA from 'react-ga'

import { Provider } from 'mobx-react'
import { AsyncTrunk } from 'mobx-sync'
import App from 'containers/App'

import 'i18n'
import ThemeProvider from 'containers/ThemeProvider'
import { settingsStore } from 'store/Settings'
import { notificationStore, NotificationType, NotificationLength } from 'store/Notification'
import setThemeColor from 'utils/setThemeColor'
import { getMainColorByTheme } from 'theme'
import { connectionStatusStore } from 'store/ConnectionStatus'

const trunk = new AsyncTrunk(settingsStore, { storage: localStorage })

if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install({
    onUpdateReady() {
      notificationStore.notify({
        type: NotificationType.SUCCESS,
        message: 'updates.progress',
        length: NotificationLength.SHORT,
      })
      OfflinePluginRuntime.applyUpdate()
    },
    async onUpdated() {
      await notificationStore.notify({
        type: NotificationType.WARNING,
        message: 'updates.attention',
        length: NotificationLength.SHORT,
      })
      window.location.reload()
    },
    onUpdateFailed() {
      notificationStore.notify({
        type: NotificationType.ERROR,
        message: 'updates.error',
        length: NotificationLength.SHORT,
      })
    },
  })
}

ReactGA.initialize('UA-125755321-1')
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
    document.getElementById('root'),
  )

  setThemeColor(getMainColorByTheme(settingsStore.theme))
})
