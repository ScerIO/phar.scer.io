import { BaseAction } from './Base'

export const UISettingsModalActionName = 'UI_SETTINGS_MODAL'

export interface UISettingsModalAction extends BaseAction {
  payload: boolean
}

/**
 * @param {UISettingsModal} payload
 * @returns {UISettingsModalAction}
 */
export const setUISettingsModal = (payload: boolean) => ({
  type: UISettingsModalActionName, payload,
})
