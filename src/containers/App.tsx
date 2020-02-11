import * as React from 'react'
import ReactGA from 'react-ga'
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'
import CenteredContainer from 'components/CenteredContainer'
import Notification from 'containers/Notification'
import Settings from 'containers/Settings'
import Header from 'containers/Header'
import HowTo from 'containers/HowTo'
import PharConverter from 'containers/PharConverter'
import hmr from 'utils/hmr'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

const styles = (theme: Theme) => createStyles({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    padding: theme.spacing(2),
  },
})

class App extends React.Component<WithStyles> {
  @observable
  isSettingsOpen: boolean = false;

  openSettings = () => {
    ReactGA.modalview('settings');
    this.isSettingsOpen = true;
  }

  closeSettings = () => {
    this.isSettingsOpen = false;
  }

  render() {
    const classes = this.props.classes;

    return (
      <Grid className={classes.container}>
        <Header settingsClick={this.openSettings} />

        <Settings open={this.isSettingsOpen} onClose={this.closeSettings} />

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
}

export default hmr(module)(withStyles(styles)(observer(App)));
