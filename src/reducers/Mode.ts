import { ModeAction, ModeActionName, ModeType } from 'actions/Mode'

export type State = ModeType

export default (state: State = ModeType.unpack, action: ModeAction): State => (action.type === ModeActionName) ? action.payload : state
