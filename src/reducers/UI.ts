import {
  UIDrawerStatusActionName,
  UIDrawerStatusAction,
} from 'actions/ui'

export interface State {
  drawerStatus?: boolean
}

const InitialState: State = {
  drawerStatus: false,
}

type Action = UIDrawerStatusAction

export default (state: State = InitialState, action: Action): State => {
  switch (action.type) {
    case UIDrawerStatusActionName:
      return { ...state, drawerStatus: action.payload } as State
  }
  return state
}
