import { combineReducers } from 'redux'
import main, { State as SettingsMainState } from './Main'
import packOptions, { State as SettingsPackOptionsState } from './PackOptions'

export interface State {
  main: SettingsMainState
  packOptions: SettingsPackOptionsState
}

export default combineReducers({
  main,
  packOptions,
})
