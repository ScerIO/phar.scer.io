import { combineReducers } from 'redux'
import { routerReducer as router, RouterState } from 'react-router-redux'

import mode, { State as ModeState } from 'reducers/Mode'
import packOptions, { State as PackOptionsState } from 'reducers/PackOptions'

export interface ApplicationState {
  router: RouterState
  mode: ModeState
  packOptions: PackOptionsState
}

export default combineReducers({
  router,
  mode,
  packOptions
})
