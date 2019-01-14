import {
  InternetStatusAction,
  InternetStatusActionName,
  InternetStatusType,
} from 'actions/InternetStatus'

export type State = InternetStatusType

export default function (state: State = InternetStatusType.online, action: InternetStatusAction): State {
  return (action.type === InternetStatusActionName) ? action.payload : state
}
