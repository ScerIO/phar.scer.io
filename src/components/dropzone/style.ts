import styled from 'styled-components'
import ReactDropZone from 'react-dropzone'
import Paper from '@material-ui/core/Paper'

import * as Media from 'utils/Media'

const Container = styled(Paper)`
  transition: all .3s ease;
`

const DropZone = styled(ReactDropZone)`
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${Media.down.sm`
    width: calc(100vw - 20px);
    height: calc(50vh);
  `}
`

export default {
  Container,
  DropZone,
}
