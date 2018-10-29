import { BaseAction } from '../Base'

export enum ThemeType {
  light = 'light',
  dark = 'dark',
}

export const ThemeActionName = 'THEME'

export interface ThemeAction extends BaseAction {
  payload: ThemeType
}

/**
 * @param {ThemeType} payload
 * @returns {ThemeAction}
 */
export const setTheme = (payload: ThemeType) => ({
  type: ThemeActionName, payload,
})
