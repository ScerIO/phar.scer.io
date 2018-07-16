import * as Redux from 'redux'
import { connect } from 'react-redux'
import { ApplicationState } from 'reducers/Root'

export interface MapPropsParam<TProps> {
  (state: ApplicationState, ownProps?: TProps): TProps
}

export interface MapDispatchParam<TProps, TDispatchProps> {
  (dispatch: Redux.Dispatch<ApplicationState>, ownProps?: TProps): TDispatchProps;
}

export interface ConnectedComponent<TProps> {
  <TComponent extends React.ComponentType<TProps>>(component: TComponent): TComponent;
}

function connectToAppState<TProps, TDispatchProps = {}>(mapProps: MapPropsParam<TProps>, mapDispatch?: MapDispatchParam<TProps, TDispatchProps>): ConnectedComponent<TProps> {
  return connect<TProps, TDispatchProps, TProps>(mapProps, mapDispatch) as ConnectedComponent<TProps & TDispatchProps>;
}

export {
  connectToAppState as connect
}
