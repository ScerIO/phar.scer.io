import { Dispatch, connect } from 'react-redux'
import { State as StateProps } from 'reducers/UI'
import { setUISettingsModal } from 'actions/UI'
import { ApplicationState } from 'reducers/Root'

export interface DispatchProps {
  setUISettingsModal?: typeof setUISettingsModal
}

export type Props = StateProps & DispatchProps

const
  mapStateToProps = (state: ApplicationState): StateProps => ({
    settingsModal: state.ui.settingsModal,
  }),
  mapDispatchToProps = (dispatch: Dispatch<DispatchProps>) => ({
    setUISettingsModal: (uiSettingsModal: boolean) => dispatch(setUISettingsModal(uiSettingsModal)),
  }),
  withUISettingsModal = <P extends Props>(
    WrappedComponent: React.ComponentType<P>,
  ) => connect<StateProps>(mapStateToProps, mapDispatchToProps)(WrappedComponent)

export default withUISettingsModal
