import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import ReactGA from 'react-ga'

import { Provider } from 'mobx-react'
import { AsyncTrunk } from 'mobx-sync'
import { autorun } from 'mobx'
import App from 'containers/App'

import 'i18n'
import ThemeProvider from 'containers/ThemeProvider'
import { settingsStore, ThemeType } from 'store/Settings'
import { notificationStore, NotificationLength } from 'store/Notification'
import { setThemeColor, isSystemPrefersDarkTheme } from 'utils'
import { getMainColorByTheme } from 'theme'
import { connectionStatusStore } from 'store/ConnectionStatus'

const trunk = new AsyncTrunk(settingsStore, { storage: localStorage })

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  OfflinePluginRuntime.install({
    onUpdateReady() {
      notificationStore.success('updates.progress', {
        length: NotificationLength.SHORT,
      })
      OfflinePluginRuntime.applyUpdate()
    },
    async onUpdated() {
      await notificationStore.warning('updates.attention', {
        length: NotificationLength.LONG,
      })
      ReactGA.event({
        category: 'General',
        action: 'App updated',
      })
      window.location.reload()
    },
    onUpdateFailed() {
      notificationStore.error('updates.error')
      ReactGA.exception({
        description: 'Update filed',
      });
    },
  })
}

ReactGA.initialize('UA-125755321-1', {
  debug: !isProduction,
  titleCase: false,
})
ReactGA.pageview(window.location.pathname + window.location.search)

trunk.init({
  theme: isSystemPrefersDarkTheme()
    ? ThemeType.dark
    : ThemeType.light
}).then(() => {
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

  autorun(() => setThemeColor(getMainColorByTheme(settingsStore.theme)))
})
