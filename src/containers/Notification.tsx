import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { observer, inject as injectStore } from 'mobx-react'
import Snackbar from '@material-ui/core/Snackbar'
import NotificationContent from 'components/NotificationContent'
import { NotificationStore, NotificationType } from 'store/Notification'

interface IProps extends  WithTranslation {
  notificationStore?: NotificationStore
}

function Notification({ notificationStore, t }: IProps) {
  function handleClose(_: React.SyntheticEvent, reason: string) {
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
          message={!detail.isTranslatable
            ? detail.message || ''
            : t(detail.message)}/>
      }
    </Snackbar>
  )
}

export default withTranslation()(injectStore('notificationStore')(observer(Notification)))
