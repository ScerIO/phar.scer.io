import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Divider from '@material-ui/core/Divider'

import withPackOptions, { Props, Signature } from 'containers/pack-options'

interface State {
  stub: string
}

export class PackOptions extends React.Component<Props, State> {
  public state = {
    stub: this.props.stub,
  }

  public render(): JSX.Element {
    const { stub } = this.state

    return (
      <>
        <Grid>
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
        </Grid>
        <Divider />
        <Grid>
          <FormControlLabel
            control={
              <Switch
                checked={this.props.compress}
                onChange={this.handleCompressChange}
              />
            }
            label='Compress'
          />
        </Grid>
        <Divider />
        <Grid>
          <TextField
            fullWidth
            variant='filled'
            id='stub'
            label='Stub'
            value={stub}
            multiline
            onChange={this.handleStubChange}
            onBlur={this.handleStubBlur}
            margin='normal'
          />
        </Grid>
      </>
    )
  }

  private handleSignatureChange = (_event, value: string) =>
    this.props.setSignature(Number(value))

  private handleCompressChange = (_event, checked: boolean) =>
    this.props.setCompress(Boolean(checked))

  private handleStubChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ stub: event.target.value })

  private handleStubBlur = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.props.setStub(String(event.target.value))
}

export default withPackOptions(PackOptions)
