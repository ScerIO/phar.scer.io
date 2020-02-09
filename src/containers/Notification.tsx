import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { observer, inject as injectStore } from 'mobx-react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { NotificationStore, NotificationType } from 'store/Notification'

interface IProps extends WithTranslation {
  notificationStore?: NotificationStore
}

function Notification({ notificationStore, t }: IProps) {
  function handleClose(_: React.SyntheticEvent) {
    notificationStore.close()
  }

  const { detail } = notificationStore

  if (detail == null) {
    return;
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={detail !== null}
      onClose={handleClose}>
      <MuiAlert
        elevation={6}
        variant='filled'
        onClose={handleClose}
        severity={detail.type || NotificationType.INFO}>
        {!detail.isTranslatable
          ? detail.message || ''
          : t(detail.message)}
      </MuiAlert>
    </Snackbar>
  )
}

export default withTranslation()(injectStore('notificationStore')(observer(Notification)))
