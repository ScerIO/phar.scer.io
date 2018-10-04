import * as React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import withUISettingsModal, { Props as SettingsModlProps } from 'containers/settings-modal'

interface Props extends SettingsModlProps {
  fullScreen?: boolean
  title: string
  closeButtonText: string
}

class Settings extends React.Component<Props> {
  handleClose = () => {
    this.props.setUISettingsModal(false)
  }

  render() {
    const {
      fullScreen,
      settingsModal: open,
      children,
      title,
      closeButtonText,
    } = this.props

    return (
      <Dialog
        fullWidth
        transitionDuration={600}
        fullScreen={fullScreen}
        open={open}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} autoFocus>
            {closeButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withMobileDialog<Props>()(withUISettingsModal(Settings))
