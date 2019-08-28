import readFileAsync from 'utils/readFileAsync'
import { ZipConverter, Archive, Compression, Signature } from 'phar'

export interface IZipToPharOptions {
  signature: Signature
  stub: string
  compress: boolean
}

export interface IPharConverterResult {
  type: string
  blob: Blob,
  fileName: string,
  error?: string
}

export async function zipToPhar(
  file: File, { signature, stub, compress }: IZipToPharOptions): Promise<IPharConverterResult> {
  const fileName = file.name.substring(0, file.name.length - 3) + 'phar'

  const
    content = await readFileAsync(file),
    phar = await ZipConverter.toPhar(new Uint8Array(content as ArrayBuffer), compress && Compression.GZ)
  phar
    .setSignatureType(signature)
    .setStub(stub)

  return {
    blob: new Blob([phar.savePharData(true)], {
      type: 'application/phar',
    }),
    fileName,
    type: 'ZIP to PHAR',
  }
}

export async function pharToZip(file: File): Promise<IPharConverterResult> {
  const fileName = file.name.substring(0, file.name.length - 4) + 'zip'

  const
    content = await readFileAsync(file),
    archive = new Archive().loadPharData(new Uint8Array(content as ArrayBuffer)),
    data = await ZipConverter.toZip(archive),
    zip = await data.generateAsync({
      type: 'uint8array',
    })

  return {
    blob: new Blob([zip], {
      type: 'application/zip',
    }),
    fileName,
    type: 'PHAR TO ZIP',
  }
}

export async function processFile(
  file: File, options: IZipToPharOptions, callback?: (fileType: string) => void): Promise<IPharConverterResult> {
  const extension = file.name.split('.').pop()
  switch (extension) {
    case 'phar':
      if (callback) {
        callback('phar_to_zip')
      }
      return pharToZip(file)
    case 'zip':
      if (callback) {
        callback('ZIP to PHAR')
      }
      return zipToPhar(file, options)
    default:
      return {
        type: 'unsupported extension',
        blob: null,
        fileName: file.name,
        error: 'unsupported_extension',
      }
  }
}
