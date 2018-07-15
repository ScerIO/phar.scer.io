import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import Styled from './style'

interface DropAreaProps {
  title: string
  onSuccess: (files: File[]) => void
}

interface DropAreaState {
  elevation: number
}

export default class DropArea extends React.Component<DropAreaProps, DropAreaState> {
  public state: DropAreaState = {
    elevation: 1
  }

  private onDragEnter = () => this.setState({ elevation: 3 })
  private onDragLeave = () => this.setState({ elevation: 1 })

  private onDrop = (files: File[]) => {
    this.onDragLeave()
    this.props.onSuccess(files)
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

}
