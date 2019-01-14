import * as React from 'react'
import withWidth, { isWidthUp, WithWidth } from '@material-ui/core/withWidth'
import { withI18n, WithI18n } from 'react-i18next'
import { pharToZip, zipToPhar, ZipToPharOptions } from 'utils/phar'
import debug from 'utils/debug'
import { saveAs } from 'file-saver'
import DropArea from 'components/Dropzone'
import Typography from '@material-ui/core/Typography'
import withPackOptions, { Props as PackOptionsProps } from './withPackOptions'
import withNotification, { Props as NotificationProps } from './withNotification'
import { NotificationType, NotificationLength } from 'actions/Notification'

type Props = WithWidth & WithI18n & PackOptionsProps & NotificationProps

async function processFile(file: File, options: ZipToPharOptions): Promise<{ blob: Blob, fileName: string }> {
  const extension = file.name.split('.').pop()
  switch (extension) {
    case 'phar':
      return pharToZip(file)
    case 'zip':
      return zipToPhar(file, options)
    default:
      throw new Error(`Error: file '${file.name}' has an unsupported format '.${extension}'`)
  }
}

function PharConverter({
  width,
  t,
  signature,
  stub,
  compress,
  notification,
}: Props) {
  async function process(files: File[]) {
    try {
      for (const file of files) {
        const result = await processFile(file, {
          signature,
          stub,
          compress,
        })
        saveAs(result.blob, result.fileName)
      }
    } catch ({ message }) {
      notification({
        message,
        type: NotificationType.error,
        length: NotificationLength.long,
      })
      debug(() => console.error(message))
    }
  }

  return (
    <DropArea onSuccess={process}>
      <Typography component='h2' variant='h5' align='center'>
        {isWidthUp('sm', width) ? t('select-or-drop') : t('select-file')}
      </Typography>
    </DropArea>
  )
}

export default withNotification(withPackOptions(withWidth()(withI18n()(PharConverter)))) as React.ComponentType
