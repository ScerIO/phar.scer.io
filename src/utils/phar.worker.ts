import { IZipToPharOptions, processFile } from './phar'

interface IPharConvertEvent extends Event {
  data: IPharConvertEventData
}

interface IPharConvertEventData extends IZipToPharOptions {
  file: File
}

self.addEventListener('message', async (event: IPharConvertEvent) => {
  const result = await processFile(event.data.file, event.data)
  const mySelf = (self as any)
  mySelf.postMessage(result, null)
}, false)
