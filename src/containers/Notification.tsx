import * as React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import withNotification, { Props, NotificationLength } from './withNotification'

function Notification({
  _notification,
  clearNotification,
}: Props) {
  function handleClose(_event: React.SyntheticEvent<any, Event>, reason: string) {
    if (reason !== 'clickaway') clearNotification()
  }

  return (


    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={_notification !== null}
      autoHideDuration={_notification && _notification.length || NotificationLength.short }
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id='message-id'>{_notification && _notification.message}</span>} />
  )
}

export default withNotification(Notification)
