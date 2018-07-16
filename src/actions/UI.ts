import { BaseAction } from './Base'

export const UIDrawerStatusActionName = 'UI_DRAWER_STATUS'

export interface UIDrawerStatusAction extends BaseAction {
  payload: boolean
}

/**
 * @param {UIDrawerStatus} payload - Drawer status
 * @returns {UIDrawerStatusAction}
 */
export const setUIDrawerStatus = (payload: boolean) => ({
  type: UIDrawerStatusActionName, payload
})
