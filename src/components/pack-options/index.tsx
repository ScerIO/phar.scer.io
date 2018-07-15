import * as React from 'react'
import { Dispatch } from 'react-redux'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'

import Styled from './style'

import { connect } from 'utils/Connect'
import { ApplicationState } from 'reducers/Root'
import {
  Signature,
  setSignature,
  setCompress,
  setStub,
} from 'actions/PackOptions'

import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Divider from '@material-ui/core/Divider'

interface StateProps {
  signature?: Signature
  compress?: boolean
  stub?: string
}

interface State {
  stub: string
}

interface DispatchProps {
  setSignature?: typeof setSignature
  setCompress?: typeof setCompress
  setStub?: typeof setStub
}

type Props = StateProps & DispatchProps

@connect(PackOptions.mapStateToProps, PackOptions.mapDispatchToProps)
export default class PackOptions extends React.Component<Props, State> {
  public state = {
    stub: this.props.stub,
  }

  static mapStateToProps(state: ApplicationState): StateProps {
    return {
      signature: state.packOptions.signature,
      compress: state.packOptions.compress,
      stub: state.packOptions.stub,
    }
  }

  static mapDispatchToProps(dispatch: Dispatch<DispatchProps>) {
    return {
      setSignature: (signature: Signature) => dispatch(setSignature(signature)),
      setCompress: (compress: boolean) => dispatch(setCompress(compress)),
      setStub: (stub: string) => dispatch(setStub(stub)),
    }
  }

  private handleSignatureChange = (_event, value: string) =>
    this.props.setSignature(Number(value))

  private handleCompressChange = (_event, checked: boolean) =>
    this.props.setCompress(Boolean(checked))

  private handleStubChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ stub: event.target.value })

  private handleStubBlur = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.props.setStub(String(event.target.value))

  public render(): JSX.Element {
    const { stub } = this.state

    return (
      <Styled.Container>
        <Styled.FormContainer>
          <FormLabel component='legend'>Signature</FormLabel>
          <RadioGroup
            aria-label='signature'
            name='signature'
            value={this.props.signature.toString()}
            onChange={this.handleSignatureChange}>

            <FormControlLabel value={Signature.MD5.toString()} control={<Radio />} label='MD5' />
            <FormControlLabel value={Signature.SHA1.toString()} control={<Radio />} label='SHA1' />
            <FormControlLabel value={Signature.SHA256.toString()} control={<Radio />} label='SHA256' />
            <FormControlLabel value={Signature.SHA512.toString()} control={<Radio />} label='SHA512' />
          </RadioGroup>
        </Styled.FormContainer>
        <Divider />
        <Styled.FormContainer>
          <FormControlLabel
            control={
              <Switch
                checked={this.props.compress}
                onChange={this.handleCompressChange}
              />
            }
            label='Compress'
          />
        </Styled.FormContainer>
        <Divider />
        <Styled.FormContainer>
          <TextField
            id='stub'
            label='Stub'
            value={stub}
            multiline
            onChange={this.handleStubChange}
            onBlur={this.handleStubBlur}
            margin='normal'
          />
        </Styled.FormContainer>
      </Styled.Container>
    )
  }
}
