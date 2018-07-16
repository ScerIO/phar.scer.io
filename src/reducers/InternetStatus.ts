import {
  InternetStatusAction,
  InternetStatusActionName,
  InternetStatusType,
} from 'actions/InternetStatus'

export type State = InternetStatusType

export default (state: State = InternetStatusType.online, action: InternetStatusAction): State =>
  (action.type === InternetStatusActionName) ? action.payload : state
