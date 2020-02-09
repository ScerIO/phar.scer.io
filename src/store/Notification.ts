import { observable, action } from 'mobx'

export interface INotificationDetail {
  message?: string
  type?: NotificationType
  isTranslatable?: boolean
}

interface INotifyArgs extends INotificationDetail {
  length?: NotificationLength,
}

export enum NotificationType {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
}

export enum NotificationLength {
  SHORT = 4000,
  LONG = 6000,
}

export class NotificationStore {
  @observable
  public detail: INotificationDetail = null

  private timeoutCallback: () => void = null

  @action
  public notify = ({
    message,
    type = NotificationType.INFO,
    length = NotificationLength.SHORT,
    isTranslatable = true,
  }: INotifyArgs) => new Promise<void>((resolve) => {
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

  public success = (message: string, {
    length = NotificationLength.SHORT,
    isTranslatable = true,
  }: INotifyArgs = {}): Promise<void> =>
    this.notify({
      message,
      type: NotificationType.SUCCESS,
      length,
      isTranslatable,
    });

  public warning = (message: string, {
    length = NotificationLength.SHORT,
    isTranslatable = true,
  }: INotifyArgs = {}): Promise<void> =>
    this.notify({
      message,
      type: NotificationType.WARNING,
      length,
      isTranslatable,
    });

  public error = (message: string, {
    length = NotificationLength.SHORT,
    isTranslatable = true,
  }: INotifyArgs = {}): Promise<void> =>
    this.notify({
      message,
      type: NotificationType.ERROR,
      length,
      isTranslatable,
    });

  @action
  public close = () => this.timeoutCallback()
}

export const notificationStore = new NotificationStore()
