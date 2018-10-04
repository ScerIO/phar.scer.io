import {
  UISettingsModalActionName,
  UISettingsModalAction,
} from 'actions/UI'

export interface State {
  settingsModal?: boolean
}

const InitialState: State = {
  settingsModal: false,
}

type Action = UISettingsModalAction

export default (state: State = InitialState, action: Action): State => {
  switch (action.type) {
    case UISettingsModalActionName:
      return { ...state, settingsModal: action.payload } as State
  }
  return state
}
