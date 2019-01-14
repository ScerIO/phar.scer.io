import * as React from 'react'
import withPackOptions, { Props as PackProps, Signature } from 'containers/withPackOptions'
import { withI18n, WithI18n } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Divider from '@material-ui/core/Divider'

interface State {
  stub: string
}

type Props = PackProps & WithI18n

export class PackOptions extends React.Component<Props, State> {
  public state = {
    stub: this.props.stub,
  }

  public render(): JSX.Element {
    const
      { t } = this.props,
      { stub } = this.state

    return (
      <Grid container direction='column'>
        <Grid item>
          <FormLabel>{t('signature')}</FormLabel>
          <RadioGroup
            aria-label='signature'
            name='signature'
            value={this.props.signature.toString()}
            onChange={this.handleSignatureChange}>
            {['MD5', 'SHA1', 'SHA256', 'SHA512'].map((method, index) =>
              <FormControlLabel key={index} value={Signature[method].toString()} control={<Radio />} label={method} />
            )}
          </RadioGroup>
        </Grid>
        <Divider />
        <Grid item>
          <FormControlLabel
            control={<Switch
              checked={this.props.compress}
              onChange={this.handleCompressChange}
            />}
            label={t('compress')}
          />
        </Grid>
        <Divider />
        <Grid item>
          <TextField
            fullWidth
            variant='filled'
            id='stub'
            label={t('stub')}
            value={stub}
            multiline
            onChange={this.handleStubChange}
            onBlur={this.handleStubBlur}
            margin='normal' />
        </Grid>
      </Grid>
    )
  }

  private handleSignatureChange = (_event: React.ChangeEvent<{}>, value: string) =>
    this.props.setSignature(Number(value))

  private handleCompressChange = (_event: React.ChangeEvent<{}>, checked: boolean) =>
    this.props.setCompress(Boolean(checked))

  private handleStubChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ stub: event.target.value })

  private handleStubBlur = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.props.setStub(String(event.target.value))
}

export default withPackOptions(withI18n()(PackOptions))
