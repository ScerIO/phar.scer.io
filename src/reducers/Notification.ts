import {
  NotificationAction,
  NotificationActionName,
  Notification,
} from 'actions/Notification'

export type State = Notification

export default function (state: State = null, action: NotificationAction): State {
  return (action.type === NotificationActionName) ? action.payload : state
}
