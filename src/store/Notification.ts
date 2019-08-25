import { observable, action } from 'mobx'

export interface NotificationDetail {
  message: string
  type: NotificationType
}

interface NotifyArgs extends NotificationDetail {
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
  @observable detail: NotificationDetail = null

  timeoutCallback: Function = null

  @action
  notify = ({
    message,
    type = NotificationType.INFO,
    length = NotificationLength.SHORT,
  }: NotifyArgs) => new Promise((resolve) => {
    let timeout: number
    this.detail = {
      type,
      message,
    }
    this.timeoutCallback = () => {
      this.detail = null
      resolve()
      clearTimeout(timeout)
    }
    timeout = setTimeout(this.timeoutCallback, length)
  })

  @action
  close = () => this.timeoutCallback()
}

export const notificationStore = new NotificationStore()
