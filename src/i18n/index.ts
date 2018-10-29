import * as i18n from 'i18next'
import * as LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translations: {
          'title': 'Online archiver',
          'select-file': 'Select file',
          'select-or-drop': '$t(select-file) or drop here',
          'settings': 'Settings',
          'close': 'Close',
          'signature': 'Signature',
          'compress': 'Compress',
          'stub': 'Stub',
          'how-to-use': {
            'title': 'How to use?',
            'content': `To unpack the PHAR archive, you need to click on the area below or drag the * .phar file into it with the mouse. As a result of unpacking, you will receive a ZIP archive. <br />
            To package the PHAR archive, you need to click on the area below or drag the * .zip file into it with the mouse. As a result of unpacking, you will receive a PHAR archive.`,
          },
          'theme': 'Theme',
          'themes': {
            'light': 'Light',
            'dark': 'Dark',
          },
        }
      },
      ru: {
        translations: {
          'title': 'Онлайн архиватор',
          'select-file': 'Выберите файл',
          'select-or-drop': '$t(select-file) или перетащите сюда',
          'settings': 'Настройки',
          'close': 'Закрыть',
          'signature': 'Подпись',
          'compress': 'Сжатие',
          'stub': 'Заглушка',
          'how-to-use': {
            'title': 'Как использовать?',
            'content': `Для распаковки PHAR архива вам необходимо кликнуть на область снизу или перетянуть в неё файл *.phar при помощи мыши. В результате распаковки вы получите ZIP архив.<br />
            Для упаковки PHAR архива вам необходимо кликнуть на область снизу или перетянуть в неё файл *.zip при помощи мыши. В результате распаковки вы получите PHAR архив.`,
          },
          'theme': 'Тема',
          'themes': {
            'light': 'Светлая',
            'dark': 'Темная',
          },
        }
      }
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',

    ns: ['translations'],
    fallbackNS: 'translations',

    keySeparator: '.',

    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },

    react: {
      wait: true
    },
  })

export default i18n
