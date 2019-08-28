import { observable, action } from 'mobx'

export interface INotificationDetail {
  message: string
  type: NotificationType
  isTranslatable?: boolean
}

interface INotifyArgs extends INotificationDetail {
  length: NotificationLength,
}

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export enum NotificationLength {
  SHORT = 4000,
  LONG = 6000,
}

export class NotificationStore {
  @observable
  public detail: INotificationDetail = null

  public timeoutCallback: () => void = null

  @action
  public notify = ({
    message,
    type = NotificationType.INFO,
    length = NotificationLength.SHORT,
    isTranslatable = true,
  }: INotifyArgs) => new Promise((resolve) => {
    let timeout: NodeJS.Timeout | number
    this.detail = {
      type,
      message,
      isTranslatable,
    }
    this.timeoutCallback = () => {
      this.detail = null
      resolve()
      clearTimeout(timeout as NodeJS.Timeout)
    }
    timeout = setTimeout(this.timeoutCallback, length)
  })

  @action
  public close = () => this.timeoutCallback()
}

export const notificationStore = new NotificationStore()
