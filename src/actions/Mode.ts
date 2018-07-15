export enum ModeType {
  /**
   * Files to phar
   */
  pack,
  /**
   * Phar to zip
   */
  unpack
}

export const ModeActionName = 'MODE'

export interface ModeAction {
  type: typeof ModeActionName,
  payload: ModeType
}

export const setMode = (mode: ModeType) => {
  return { type: ModeActionName, payload: mode } as ModeAction
}
