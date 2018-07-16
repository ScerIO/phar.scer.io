import { Dispatch, connect } from 'react-redux'
import { State as StateProps } from 'reducers/ui'
import { setUIDrawerStatus } from 'actions/ui'
import { ApplicationState } from 'reducers/Root'

export interface DispatchProps {
  setUIDrawerStatus?: typeof setUIDrawerStatus
}

export type Props = StateProps & DispatchProps

const
  mapStateToProps = (state: ApplicationState): StateProps => ({
    drawerStatus: state.ui.drawerStatus,
  }),
  mapDispatchToProps = (dispatch: Dispatch<DispatchProps>) => ({
    setUIDrawerStatus: (uiDrawerStatus: boolean) => dispatch(setUIDrawerStatus(uiDrawerStatus)),
  }),
  withUIDrawerStatus = <P extends Props>(
    WrappedComponent: React.ComponentType<P>,
  ) => connect<StateProps>(mapStateToProps, mapDispatchToProps)(WrappedComponent)

export default withUIDrawerStatus
