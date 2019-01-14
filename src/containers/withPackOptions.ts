import { Dispatch, connect } from 'react-redux'
import {
  Signature,
  setSignature,
  setCompress,
  setStub,
} from 'actions/settings/PackOptions'
import { ApplicationState } from 'reducers/Root'
export { Signature }

export interface StateProps {
  signature?: Signature
  compress?: boolean
  stub?: string
}

export interface DispatchProps {
  setSignature?: typeof setSignature
  setCompress?: typeof setCompress
  setStub?: typeof setStub
}

export type Props = StateProps & DispatchProps

const
  mapStateToProps = (state: ApplicationState): StateProps => ({
    signature: state.settings.packOptions.signature,
    compress: state.settings.packOptions.compress,
    stub: state.settings.packOptions.stub,
  }),
  mapDispatchToProps = (dispatch: Dispatch<DispatchProps>) => ({
    setSignature: (signature: Signature) => dispatch(setSignature(signature)),
    setCompress: (compress: boolean) => dispatch(setCompress(compress)),
    setStub: (stub: string) => dispatch(setStub(stub)),
  }),
  withPackOptions = <P extends Props>(
    WrappedComponent: React.ComponentType<P>,
  ) => connect<StateProps>(mapStateToProps, mapDispatchToProps)(WrappedComponent)

export default withPackOptions
