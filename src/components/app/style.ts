import styled from 'styled-components'
import * as Media from 'utils/Media'

import UITypography from '@material-ui/core/Typography'

const drawerWidth = 250

const Title = styled(UITypography)`
  flex: 1;
`

const DrawerContent = styled.div`
  min-width: ${drawerWidth}px;
`

const Content = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  ${({ drawerOffset }: { drawerOffset: boolean }) => drawerOffset && Media.up.md`
    margin-left: ${drawerWidth}px};
  `}
`

const OverlayMain = styled.div`
  z-index: 1;
`

const Main = styled.main`
  margin: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    margin-top: -128px;
    ${Media.down.sm`
      margin-top: -112px};
    `}
  }
`

const HiddenLink = styled.a`
  display: none;
`

export default {
  Title,
  DrawerContent,
  Content,
  OverlayMain,
  Main,
  HiddenLink,
}
