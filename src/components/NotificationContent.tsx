import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import CloseIcon from '@material-ui/icons/Close'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import IconButton from '@material-ui/core/IconButton'
import SnackbarContentUI from '@material-ui/core/SnackbarContent'
import { NotificationType } from 'store/Notification'
import Typography from '@material-ui/core/Typography'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

interface IProps {
  message: string
  variant: NotificationType
  onClose(...args: any): void
}

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}))

export default function NotificationContent({
  message,
  onClose,
  variant,
  ...props
}: IProps) {
  const Icon = variantIcon[variant]
  const classes = useStyles({})

  return (
    <SnackbarContentUI
      className={classes[variant]}
      aria-describedby='client-snackbar'
      message={
        <Typography id='client-snackbar' color='textPrimary' className={classes.message}>
          <Icon className={classes.iconVariant} />
          {message}
        </Typography>
      }
      action={[
        <IconButton
          key='close'
          aria-label='Close'
          onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...props}
    />
  )
}
