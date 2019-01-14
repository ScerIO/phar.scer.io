import BaseAction from 'actions/BaseAction'

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
export function setTheme(payload: ThemeType): ThemeAction {
  return { type: ThemeActionName, payload }
}
