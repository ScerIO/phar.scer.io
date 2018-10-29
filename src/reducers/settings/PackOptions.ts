import {
  SignatureAction,
  SignatureActionName,
  CompressAction,
  CompressActionName,
  StubAction,
  StubActionName,
  Signature,
} from 'actions/settings/PackOptions'

export interface State {
  signature?: Signature
  compress?: boolean
  stub?: string
}

const InitialState: State = {
  signature: Signature.SHA1,
  compress: true,
  stub: '<?php __HALT_COMPILER();',
}

type Action = SignatureAction | CompressAction | StubAction

export default (state: State = InitialState, action: Action): State => {
  switch (action.type) {
    case SignatureActionName:
      return { ...state, signature: action.payload } as State
    case CompressActionName:
      return { ...state, compress: action.payload } as State
      case CompressActionName:
    case StubActionName:
      return { ...state, stub: action.payload } as State
  }
  return state
}
