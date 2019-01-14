import BaseAction from './BaseAction'

export enum NotificationType {
  info,
  success,
  error,
}

export enum NotificationLength {
  short = 2000,
  long = 6000,
}

export interface Notification {
  message: string,
  type: NotificationType,
  length?: NotificationLength,
}

export const NotificationActionName = 'NOTIFICATION'

export interface NotificationAction extends BaseAction {
  payload: Notification | null
}

/**
 * @param {Notification} payload - Internet status
 * @returns {NotificationAction}
 */
export function setNotification(payload: Notification): NotificationAction {
  return { type: NotificationActionName, payload }
}

export function clearNotification(): NotificationAction {
  return { type: NotificationActionName, payload: null }
}
