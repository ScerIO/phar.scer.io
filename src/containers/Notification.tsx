import React from 'react'
import { observer, inject as injectStore } from 'mobx-react'
import Snackbar from '@material-ui/core/Snackbar'
import NotificationContent from 'components/NotificationContent'
import { NotificationStore, NotificationType } from 'store/Notification'

interface Props {
  notificationStore?: NotificationStore
}

function Notification({ notificationStore }: Props) {
  function handleClose(_event: React.SyntheticEvent, reason: string) {
    if (reason === 'clickaway') return
    notificationStore.close()
  }

  const { detail } = notificationStore

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={detail !== null}
      onClose={handleClose}>
      {detail &&
        <NotificationContent
          onClose={handleClose}
          variant={detail.type || NotificationType.INFO}
          message={detail.message || ''}/>
      }
    </Snackbar>
  )
}

export default injectStore('notificationStore')(observer(Notification))
