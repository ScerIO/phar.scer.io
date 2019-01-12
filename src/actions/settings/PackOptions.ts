import { BaseAction } from '../Base'
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

export const
  /**
   * @param {SignatureType} - Signature enum
   * @returns {SignatureAction}
   */
  setSignature = (payload: Signature) => ({
    type: SignatureActionName, payload
  } as SignatureAction),

  /**
   * @param {boolean} payload - Compress
   * @returns {CompressAction}
   */
  setCompress = (payload: boolean) => ({
    type: CompressActionName, payload
  } as CompressAction),

  /**
   * @param {string} payload - Stub
   * @returns {StubAction}
   */
  setStub = (payload: string) => ({
    type: StubActionName, payload,
  } as StubAction)
