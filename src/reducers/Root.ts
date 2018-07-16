import { combineReducers } from 'redux'
import { routerReducer as router, RouterState } from 'react-router-redux'

import internetStatus, { State as InternetStatusState } from 'reducers/InternetStatus'
import mode, { State as ModeState } from 'reducers/Mode'
import packOptions, { State as PackOptionsState } from 'reducers/PackOptions'

export interface ApplicationState {
  router: RouterState
  internetStatus: InternetStatusState
  mode: ModeState
  packOptions: PackOptionsState
}

export default combineReducers({
  router,
  internetStatus,
  mode,
  packOptions,
})
