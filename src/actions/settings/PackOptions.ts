import BaseAction from '../BaseAction'
import { Signature } from 'phar'
export { Signature }

export const
  SignatureActionName = 'SIGNATURE',
  CompressActionName = 'COMPRESS',
  StubActionName = 'STUB'

interface SignatureAction extends BaseAction {
  payload: Signature
}

interface CompressAction extends BaseAction {
  payload: boolean
}

interface StubAction extends BaseAction {
  payload: string
}

export {
  SignatureAction,
  CompressAction,
  StubAction,
}

/**
 * @param {SignatureType} - Signature enum
 * @returns {SignatureAction}
 */
export function setSignature(payload: Signature): SignatureAction {
  return { type: SignatureActionName, payload }
}

/**
 * @param {boolean} payload - Compress
 * @returns {CompressAction}
 */
export function setCompress(payload: boolean): CompressAction {
  return { type: CompressActionName, payload }
}

/**
 * @param {string} payload - Stub
 * @returns {StubAction}
 */
export function setStub(payload: string): StubAction {
  return { type: StubActionName, payload }
}
