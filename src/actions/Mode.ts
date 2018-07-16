import { BaseAction } from './Base'

export enum ModeType {
  /**
   * Files to phar
   */
  pack,
  /**
   * Phar to zip
   */
  unpack,
}

export const ModeActionName = 'MODE'

export interface ModeAction extends BaseAction {
  payload: ModeType
}

/**
 * @param {ModeType} payload - Mode
 * @returns {ModeAction}
 */
export const setMode = (payload: ModeType) => {
  return { type: ModeActionName, payload } as ModeAction
}
