import { combineReducers } from 'redux'

import internetStatus, { State as InternetStatusState } from 'reducers/InternetStatus'
import settings, { State as SettingsState } from 'reducers/settings'
import ui, { State as UIState } from 'reducers/UI'

export interface ApplicationState {
  internetStatus: InternetStatusState
  settings: SettingsState
  ui: UIState
}

export default combineReducers({
  internetStatus,
  settings,
  ui,
})
