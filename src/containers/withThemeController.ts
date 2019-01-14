import { Dispatch, connect } from 'react-redux'
import { setTheme, ThemeType } from 'actions/settings/Theme'
import { ApplicationState } from 'reducers/Root'
export { ThemeType }

export interface StateProps {
  theme?: ThemeType
}

export interface DispatchProps {
  setTheme?(theme: ThemeType): void
}

export type Props = StateProps & DispatchProps

const
  mapStateToProps = (state: ApplicationState): StateProps => ({
    theme: state.settings.theme,
  }),
  mapDispatchToProps = (dispatch: Dispatch<DispatchProps>) => ({
    setTheme: (theme: ThemeType) => dispatch(setTheme(theme)),
  }),
  withThemeController = <P extends Props>(
    WrappedComponent: React.ComponentType<P>,
  ) => connect<StateProps>(mapStateToProps, mapDispatchToProps)(WrappedComponent)

export default withThemeController
