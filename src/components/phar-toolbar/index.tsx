import * as React from 'react'
import { Dispatch } from 'react-redux'
import Toolbar from '@material-ui/core/Toolbar'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import styled from 'styled-components'

import { connect } from 'utils/Connect'
import { ApplicationState } from 'reducers/Root'
import { setMode, ModeType } from 'actions/Mode'

const RadioButtonGroup = styled(RadioGroup)`
  && {
    display: block;
  }
`

interface StateProps {
  mode?: ModeType
}

interface DispatchProps {
  setMode?(mode: ModeType)
}

type Props = StateProps & DispatchProps

@connect(PharToolbar.mapStateToProps, PharToolbar.mapDispatchToProps)
export default class PharToolbar extends React.Component<Props, {}> {
  static mapStateToProps(state: ApplicationState): StateProps {
    return {
      mode: state.mode,
    }
  }

  static mapDispatchToProps(dispatch: Dispatch<DispatchProps>) {
    return {
      setMode: (mode: ModeType) => dispatch(setMode(mode)),
    }
  }

  private handleModeChange = (_event, value) =>
    this.props.setMode(Number(value))

  public render(): JSX.Element {
    const { mode } = this.props

    return (
      <Toolbar>
        <RadioButtonGroup
          aria-label='signature'
          name='signature'
          value={mode.toString()}
          onChange={this.handleModeChange}>

          <FormControlLabel value={ModeType.unpack.toString()} control={<Radio />} label='Unpack' />
          <FormControlLabel value={ModeType.pack.toString()} control={<Radio />} label='Pack' />
        </RadioButtonGroup>
      </Toolbar>
    )
  }
}
