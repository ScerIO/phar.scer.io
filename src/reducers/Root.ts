import { combineReducers } from 'redux'

import internetStatus, { State as InternetStatusState } from 'reducers/InternetStatus'
import settings, { State as SettingsState } from 'reducers/settings'
import notification, { State as NotificationState } from 'reducers/Notification'

export interface ApplicationState {
  internetStatus: InternetStatusState
  settings: SettingsState
  notification: NotificationState
}

export default combineReducers({
  internetStatus,
  settings,
  notification,
})
