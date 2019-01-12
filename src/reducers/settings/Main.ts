import {
  ThemeActionName,
  ThemeAction,
  ThemeType,
} from 'actions/settings/Main'
import setThemeColor from 'utils/setThemeColor'
import { getMainColorByTheme } from 'theme'

export interface State {
  theme?: ThemeType
}

const InitialState: State = {
  theme: ThemeType.light,
}

type Action = ThemeAction

export default (state: State = InitialState, action: Action): State => {
  switch (action.type) {
    case ThemeActionName:
      setThemeColor(getMainColorByTheme(action.payload))
      return { ...state, theme: action.payload } as State
  }
  return state
}
