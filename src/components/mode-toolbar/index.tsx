import * as React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import withMode, { Props, ModeType } from 'containers/mode'
import Styled from './style'

const PharToolbar = ({ mode, setMode }: Props) =>
  <Toolbar>
    <Styled.RadioGroup
      aria-label='signature'
      name='signature'
      value={mode.toString()}
      onChange={(_event, value) => setMode(Number(value))}>

      <FormControlLabel value={ModeType.unpack.toString()} control={<Radio />} label='Unpack' />
      <FormControlLabel value={ModeType.pack.toString()} control={<Radio />} label='Pack' />

    </Styled.RadioGroup>
  </Toolbar>

export default withMode(PharToolbar)
