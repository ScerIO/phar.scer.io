import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Divider from '@material-ui/core/Divider'

import withPackOptions, { Props as PackProps, Signature } from 'containers/pack-options'
import { InjectedTranslateProps, translate } from 'react-i18next'

interface State {
  stub: string
}

type Props = PackProps & InjectedTranslateProps

export class PackOptions extends React.Component<Props, State> {
  public state = {
    stub: this.props.stub,
  }

  public render(): JSX.Element {
    const { t } = this.props
    const { stub } = this.state

    return (
      <>
        <Grid>
          <FormLabel component='legend'>{t('signature')}</FormLabel>
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
        <Grid>
          <FormControlLabel
            control={<Switch
              checked={this.props.compress}
              onChange={this.handleCompressChange}
            />}
            label={t('compress')}
          />
        </Grid>
        <Divider />
        <Grid>
          <TextField
            fullWidth
            variant='filled'
            id='stub'
            label={t('stub')}
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

export default translate('translations')(withPackOptions(PackOptions))
