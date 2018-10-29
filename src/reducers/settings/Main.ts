import {
  ThemeActionName,
  ThemeAction,
  ThemeType,
} from 'actions/settings/Main'

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
      return { ...state, theme: action.payload } as State
  }
  return state
}
