import { combineReducers } from 'redux'
import theme, { State as ThemeState } from './Theme'
import packOptions, { State as SettingsPackOptionsState } from './PackOptions'

export interface State {
  theme: ThemeState
  packOptions: SettingsPackOptionsState
}

export default combineReducers({
  theme,
  packOptions,
})
