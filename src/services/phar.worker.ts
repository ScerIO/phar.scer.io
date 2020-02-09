import { processFile } from 'services/phar.common'
import { ZipToPharOptionEvent, IPharConverterResult } from './phar.interfaces';

self.addEventListener('message', async (event: ZipToPharOptionEvent) => {
  let result: IPharConverterResult;
  try {
    result = await processFile(event.data);
    self.postMessage(result, null)
  } catch (error) {
    self.postMessage({
      type: 'Unknown error',
      blob: null,
      fileName: null,
      error: 'unknown_extension',
    }, null)
  }
}, false)

export default {} as typeof Worker & {new (): Worker};
