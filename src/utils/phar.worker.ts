import { ZipToPharOptions, processFile } from './phar'

interface PharConvertEvent extends Event {
  data: PharConvertEventData
}

interface PharConvertEventData extends ZipToPharOptions {
  file: File,
}

self.addEventListener('message', async function (event: PharConvertEvent) {
  const result = await processFile(event.data.file, event.data)
  self.postMessage(result, null)
}, false)
