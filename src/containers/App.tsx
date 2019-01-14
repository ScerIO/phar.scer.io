import * as React from 'react'

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'

import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'
import CenteredContainer from 'components/CenteredContainer'
import Notification from 'containers/Notification'
import Settings from 'containers/Settings'
import Header from 'containers/Header'
import HowTo from 'containers/HowTo'
import PharConverter from 'containers/PharConverter'

import { Theme } from '@material-ui/core/styles/createMuiTheme'

type Props = WithStyles<typeof styles>

const styles = (theme: Theme) => createStyles({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    padding: theme.spacing.unit * 2,
  },
})

function App({
  classes,
}: Props) {
  const [ settingsOpen, setSettingsOpen ] = React.useState(false)

  function openSettings() {
    setSettingsOpen(true)
  }

  function closeSettings() {
    setSettingsOpen(false)
  }

  return (
    <Grid className={classes.container}>
      <Header settingsClick={openSettings} />

      <Settings open={settingsOpen} onClose={closeSettings} />

      <CenteredContainer className={classes.content}>
        <Grow in timeout={1200}>
          <Grid container direction='column' alignItems='center'>
            <HowTo />
            <PharConverter />
          </Grid>
        </Grow>
      </CenteredContainer>

      <Notification />
    </Grid>
  )
}

export default withStyles(styles)(App)
