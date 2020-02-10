import * as React from 'react'
import ReactGA from 'react-ga'
import { withTranslation, WithTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Divider from '@material-ui/core/Divider'
import { inject, observer } from 'mobx-react'
import { SettingsStore } from 'store/Settings'
import { Signature } from 'phar'

interface IProps extends WithTranslation {
  settingsStore?: SettingsStore
}

interface IState {
  stub: string
}

export class PackOptions extends React.Component<IProps, IState> {
  public state: IState = {
    stub: this.props.settingsStore.stub,
  }

  public render(): JSX.Element {
    const
      { t, settingsStore } = this.props,
      { stub } = this.state

    return (
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <FormLabel>{t('signature')}</FormLabel>
          <RadioGroup
            aria-label='signature'
            name='signature'
            value={settingsStore.signature.toString()}
            onChange={this.handleSignatureChange}>
            {['MD5', 'SHA1', 'SHA256', 'SHA512'].map((method, index) =>
              <FormControlLabel
                key={index}
                value={Signature[method].toString()}
                control={<Radio />}
                label={method} />,
            )}
          </RadioGroup>
        </Grid>
        <Divider />
        <Grid item>
          <FormControlLabel
            control={<Switch
              checked={settingsStore.compress}
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

  private handleSignatureChange = (_: React.ChangeEvent<{}>, value: string) => {
    this.props.settingsStore.signature = Number(value)
    ReactGA.event({
      category: 'Settings',
      action: 'Set signature',
      label: value,
    })
  }

  private handleCompressChange = (_: React.ChangeEvent<{}>, checked: boolean) => {
    this.props.settingsStore.compress = Boolean(checked)
    ReactGA.event({
      category: 'Settings',
      action: 'Set compress',
      label: checked.toString(),
    })
  }

  private handleStubBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this.props.settingsStore.stub = String(event.target.value)
    ReactGA.event({
      category: 'Settings',
      action: 'Set stub',
    })
  }

  private handleStubChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ stub: event.target.value })
}

// export default withPackOptions(withTranslation()(PackOptions)) // inject('settingsStore')(
export default withTranslation()(inject('settingsStore')(observer(PackOptions))) // inject('settingsStore')(
