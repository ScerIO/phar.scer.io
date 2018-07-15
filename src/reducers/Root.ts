import { combineReducers } from 'redux'
import { routerReducer as router, RouterState } from 'react-router-redux'

import mode, { State as ModeState } from './Mode'
import packOptions, { State as PackOptionsState } from './PackOptions'

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
