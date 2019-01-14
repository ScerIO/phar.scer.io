import { Dispatch, connect } from 'react-redux'
import { setInternetStatus, InternetStatusType } from 'actions/InternetStatus'
import { ApplicationState } from 'reducers/Root'
export { InternetStatusType }

export interface StateProps {
  internetStatus?: InternetStatusType
  isOnline?: boolean
  isOffline?: boolean
}

export interface DispatchProps {
  setInternetStatus?(internetStatus: InternetStatusType): void
}

export type Props = StateProps & DispatchProps

const
  mapStateToProps = (state: ApplicationState): StateProps => ({
    internetStatus: state.internetStatus,
    isOnline: state.internetStatus === InternetStatusType.online,
    isOffline: state.internetStatus === InternetStatusType.offline,
  }),
  mapDispatchToProps = (dispatch: Dispatch<DispatchProps>) => ({
    setInternetStatus: (internetStatus: InternetStatusType) => dispatch(setInternetStatus(internetStatus)),
  }),
  withInternetStatus = <P extends Props>(
    WrappedComponent: React.ComponentType<P>,
  ) => connect<StateProps>(mapStateToProps, mapDispatchToProps)(WrappedComponent)

export default withInternetStatus
