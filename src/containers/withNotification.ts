import { Dispatch, connect } from 'react-redux'
import {
  setNotification,
  clearNotification,
  Notification,
  NotificationType,
  NotificationLength,
} from 'actions/Notification'
import { ApplicationState } from 'reducers/Root'
export { Notification, NotificationType, NotificationLength }

export interface StateProps {
  _notification?: Notification
}

export interface DispatchProps {
  notification?: typeof setNotification
  clearNotification?: typeof clearNotification
}

export type Props = StateProps & DispatchProps

const
  mapStateToProps = (state: ApplicationState): StateProps => ({
    _notification: state.notification,
  }),
  mapDispatchToProps = (dispatch: Dispatch<DispatchProps>) => ({
    notification(notification: Notification) {
      dispatch(setNotification(notification))
      setTimeout(() => {
        dispatch(clearNotification())
      }, notification.length || NotificationLength.short )
    },
    clearNotification: () => dispatch(clearNotification())
  }),
  withNotification = <P extends Props>(
    WrappedComponent: React.ComponentType<P>,
  ) => connect<StateProps>(mapStateToProps, mapDispatchToProps)(WrappedComponent)

export default withNotification
