import readFileAsync from 'utils/readFileAsync'
import { IZipToPharOptions, IPharConverterResult } from './phar.interfaces'
import { ZipConverter, Archive, Compression } from 'phar'

export async function zipToPhar(
  { file, signature, stub, compress }: IZipToPharOptions): Promise<IPharConverterResult> {
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
  options: IZipToPharOptions,
): Promise<IPharConverterResult> {
  const extension = options.file.name.split('.').pop()
  switch (extension) {
    case 'phar':
      return pharToZip(options.file)
    case 'zip':
      return zipToPhar(options)
    default:
      return {
        type: 'unsupported extension',
        blob: null,
        fileName: options.file.name,
        error: 'unsupported_extension',
      }
  }
}
