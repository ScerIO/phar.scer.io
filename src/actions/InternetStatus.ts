import BaseAction from './BaseAction'

export enum InternetStatusType {
  online,
  offline,
}

export const InternetStatusActionName = 'INTERNET_STATUS'

export interface InternetStatusAction extends BaseAction {
  payload: InternetStatusType
}

/**
 * @param {InternetStatusType} payload - Internet status
 * @returns {InternetStatusAction}
 */
export function setInternetStatus(payload: InternetStatusType): InternetStatusAction {
  return { type: InternetStatusActionName, payload }
}
