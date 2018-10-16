import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import DropZone from 'react-dropzone'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import createStyles from '@material-ui/core/styles/createStyles'

const styles = (theme: Theme) => createStyles({
  container: {
    transition: 'all .3s ease-in',
    height: '90vw',
    width: '90vw',
    [theme.breakpoints.up('md')]: {
      height: '400px',
      width: '400px',
    },
    [theme.breakpoints.up('lg')]: {
      height: '600px',
      width: '600px',
    },
  },
  dropzone: {
    padding: 40,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props extends WithStyles<typeof styles> {
  onSuccess: (files: File[]) => void
}

interface State {
  elevation: number
}

class DropArea extends React.Component<Props, State> {
  public state: State = {
    elevation: 1
  }

  public render() {
    const {
      children,
      classes,
    } = this.props

    return (
      <Paper elevation={this.state.elevation} className={classes.container}>
        <DropZone className={classes.dropzone}
          onDragLeave={this.onDragLeave}
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}>
          {children}
        </DropZone>
      </Paper>
    )
  }

  private onDragEnter = () => this.setState({ elevation: 5 })
  private onDragLeave = () => this.setState({ elevation: 1 })

  private onDrop = (files: File[]) => {
    this.onDragLeave()
    this.props.onSuccess(files)
  }
}

export default withStyles(styles)(DropArea)
