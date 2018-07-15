import { Signature } from 'phar'
export { Signature }

export const
  SignatureActionName = 'SIGNATURE',
  CompressActionName = 'COMPRESS',
  StubActionName = 'STUB'

interface SignatureAction {
  type: typeof SignatureActionName
  payload: Signature
}

interface CompressAction {
  type: typeof CompressActionName
  payload: boolean
}

interface StubAction {
  type: typeof StubActionName
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
