import { Signature } from 'phar'

export interface IZipToPharOptions {
  file: File
  signature: Signature
  stub: string
  compress: boolean
}

export interface ZipToPharOptionEvent extends Event {
  data: IZipToPharOptions
}

export interface IPharConverterResult {
  type: string
  blob: Blob,
  fileName: string,
  error?: string
}

export interface IPharConverterResultEvent extends Event {
  data: IPharConverterResult
}
