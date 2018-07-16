import * as React from 'react'
import MaterialDrawer from '@material-ui/core/Drawer'

import Styled from './style'
import withUIDrawerStatus, { Props as StateProps } from 'containers/drawer-status'

interface Props extends StateProps {
  noHideDrawer: boolean
  largeScreen: boolean
  children: JSX.Element
}

const Drawer = ({
  noHideDrawer,
  largeScreen,
  children,
  drawerStatus,
  setUIDrawerStatus,
}: Props) =>
  <MaterialDrawer
    variant={noHideDrawer && largeScreen ? 'permanent' : 'temporary'}
    anchor='left'
    open={largeScreen ? noHideDrawer : drawerStatus}
    onClose={largeScreen ? null : () => setUIDrawerStatus(!drawerStatus)} >
    <Styled.DrawerContent>
      {children}
    </Styled.DrawerContent>
  </MaterialDrawer>

export default withUIDrawerStatus(Drawer)
