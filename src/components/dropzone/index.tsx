import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import Styled from './style'

interface Props {
  title: string
  onSuccess: (files: File[]) => void
}

interface State {
  elevation: number
}

export default class DropArea extends React.Component<Props, State> {
  public state: State = {
    elevation: 1
  }

  public render() {
    return (
      <Styled.Container elevation={this.state.elevation}>
        <Styled.DropZone
          onDragLeave={this.onDragLeave}
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}>
          <Typography variant='subheading'>
            {this.props.title}
          </Typography>
        </Styled.DropZone>
      </Styled.Container>
    )
  }

  private onDragEnter = () => this.setState({ elevation: 3 })
  private onDragLeave = () => this.setState({ elevation: 1 })

  private onDrop = (files: File[]) => {
    this.onDragLeave()
    this.props.onSuccess(files)
  }
}
