import {
  IPharConverterResult as IResult,
  IZipToPharOptions,
  IPharConverterResultEvent,
} from './phar.interfaces';
import { debug } from 'utils'

export type IPharConverterResult = IResult;

export type ProcessResultCallback = (result: IPharConverterResult) => void;

export abstract class ConvertStrategy {
  public processFile(_: IZipToPharOptions) { }

  static async findStrategy(onResult: ProcessResultCallback): Promise<ConvertStrategy> {
    if ((typeof Worker) !== 'undefined') {
      try {
        const PharWorker = await import('services/phar.worker');
        return new ConvertWorkerStrategy(
          onResult,
          new PharWorker.default(),
        );
      } catch (_) {
        debug(() => console.error('Error usage worker convert strategy'))
      }
    }

    const PharCommon = await import('services/phar.common');

    return new ConvertRawStrategy(onResult, PharCommon.processFile)
  }
}

class ConvertWorkerStrategy extends ConvertStrategy {
  public constructor(
    protected onResult: ProcessResultCallback,
    private worker: Worker,
  ) {
    super()
    this.worker.addEventListener('message', (event: IPharConverterResultEvent) =>
      this.onResult(event.data)
    )
    debug(() => console.info('Usage worker convert strategy'))
  }

  public processFile(options: IZipToPharOptions) {
    this.worker.postMessage(options)
  }
}


class ConvertRawStrategy extends ConvertStrategy {
  public constructor(
    protected onResult: ProcessResultCallback,
    protected convert: (options: IZipToPharOptions) => Promise<IResult>,
  ) {
    super()
    debug(() => console.info('Usage raw convert strategy'))
  }

  public async processFile(options: IZipToPharOptions) {
    let result: IPharConverterResult;
    try {
      result = await this.convert(options);
      this.onResult(result)
    } catch (error) {
      this.onResult({
        type: 'Unknown error',
        blob: null,
        fileName: null,
        error: 'unknown_extension',
      })
    }
  }
}
