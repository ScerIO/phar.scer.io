import { BaseAction } from './Base'

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
export const setInternetStatus = (payload: InternetStatusType) => {
  return { type: InternetStatusActionName, payload } as InternetStatusAction
}
