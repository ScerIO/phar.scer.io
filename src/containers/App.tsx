import * as React from 'react'
import ReactGA from 'react-ga'
import { Theme, makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'
import CenteredContainer from 'components/CenteredContainer'
import Notification from 'containers/Notification'
import Settings from 'containers/Settings'
import Header from 'containers/Header'
import HowTo from 'containers/HowTo'
import PharConverter from 'containers/PharConverter'
import hmr from 'utils/hmr'


const useStyles = makeStyles((theme: Theme) => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    padding: theme.spacing(2),
  },
}))

function App() {
  const [settingsOpen, setSettingsOpen] = React.useState(false)

  function openSettings() {
    ReactGA.modalview('settings');
    setSettingsOpen(true)
  }

  function closeSettings() {
    setSettingsOpen(false)
  }

  const classes = useStyles({})

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

export default hmr(module)(App)
