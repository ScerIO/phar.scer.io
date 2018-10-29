import { combineReducers } from 'redux'
import { routerReducer as router, RouterState } from 'react-router-redux'

import internetStatus, { State as InternetStatusState } from 'reducers/InternetStatus'
import settings, { State as SettingsState } from 'reducers/settings'
import ui, { State as UIState } from 'reducers/UI'

export interface ApplicationState {
  router: RouterState
  internetStatus: InternetStatusState
  settings: SettingsState
  ui: UIState
}

export default combineReducers({
  router,
  internetStatus,
  settings,
  ui,
})
