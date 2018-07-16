import { Dispatch, connect } from 'react-redux'
import { setMode, ModeType } from 'actions/Mode'
import { ApplicationState } from 'reducers/Root'
export { ModeType }


export interface StateProps {
  mode?: ModeType
}

export interface DispatchProps {
  setMode?(mode: ModeType)
}

export type Props = StateProps & DispatchProps

const
  mapStateToProps = (state: ApplicationState): StateProps => ({
    mode: state.mode,
  }),
  mapDispatchToProps = (dispatch: Dispatch<DispatchProps>) => ({
    setMode: (mode: ModeType) => dispatch(setMode(mode)),
  }),
  withMode = <P extends Props>(
    WrappedComponent: React.ComponentType<P>,
  ) => connect<StateProps>(mapStateToProps, mapDispatchToProps)(WrappedComponent)

export default withMode
