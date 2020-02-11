import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import ReactDropzone from 'react-dropzone'
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles'

const styles = (theme: Theme) => createStyles({
  root: {
    'transition': 'all .3s ease-in',
    'height': '90vw',
    'width': '90vw',
    [theme.breakpoints.up('md')]: {
      height: '400px',
      width: '400px',
    },
    [theme.breakpoints.up('lg')]: {
      height: '600px',
      width: '600px',
    },
    '& div:focus': {
      outline: 'none',
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
})

interface IProps extends WithStyles<typeof styles> {
  onSuccess: (files: File[]) => void
}

interface IState {
  elevation: number
}

class DropZone extends React.Component<IProps, IState> {
  public state: IState = {
    elevation: 1,
  }

  public render() {
    const { children, classes } = this.props

    return (
      <Paper elevation={this.state.elevation} className={classes.root}>
        <ReactDropzone
          onDragLeave={this.onDragLeave}
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}>
          {({ getRootProps, getInputProps }) =>
            <div
              {...getRootProps()}
              className={classes.dropzone}>
              <input {...getInputProps()} />
              {children}
            </div>}
        </ReactDropzone>
      </Paper>
    )
  }

  private onDragEnter = () =>
    this.setState({ elevation: 5 })

  private onDragLeave = () =>
    this.setState({ elevation: 1 })

  private onDrop = (files: File[]) => {
    this.onDragLeave()
    this.props.onSuccess(files)
  }
}

export default withStyles(styles)(DropZone)
