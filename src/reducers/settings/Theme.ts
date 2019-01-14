import {
  ThemeActionName,
  ThemeAction,
  ThemeType,
} from 'actions/settings/Theme'
import setThemeColor from 'utils/setThemeColor'
import { getMainColorByTheme } from 'theme'

export type State = ThemeType

export default function(state: State = ThemeType.light, action: ThemeAction): State {
  if (action.type !== ThemeActionName) return state

  setThemeColor(getMainColorByTheme(action.payload))
  return action.payload
}
