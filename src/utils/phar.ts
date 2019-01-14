import readFileAsync from 'utils/readFileAsync'
import { ZipConverter, Archive, Compression, Signature } from 'phar'

export interface ZipToPharOptions {
  signature: Signature
  stub: string
  compress: boolean
}

export async function zipToPhar(file: File, { signature, stub, compress }: ZipToPharOptions) {
  const fileName = file.name.substring(0, file.name.length - 3) + 'phar'

  const
    content = await readFileAsync(file),
    phar = await ZipConverter.toPhar(new Uint8Array(content as ArrayBuffer), compress && Compression.GZ)
  phar
    .setSignatureType(signature)
    .setStub(stub)

  return {
    blob: new Blob([phar.savePharData(true)], {
      type: 'application/phar'
    }),
    fileName,
  }
}

export async function pharToZip(file: File) {
  const fileName = file.name.substring(0, file.name.length - 4) + 'zip'

  const
    content = await readFileAsync(file),
    archive = new Archive().loadPharData(new Uint8Array(content as ArrayBuffer)),
    data = await ZipConverter.toZip(archive),
    zip = await data.generateAsync({
      type: 'uint8array'
    })

  return {
    blob: new Blob([zip], {
      type: 'application/zip'
    }),
    fileName,
  }
}
