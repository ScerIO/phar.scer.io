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
        }
      },
      ru: {
        translations: {
          'title': 'Онлайн архиватор',
          'select-file': 'Выберите файл',
          'select-or-drop': '$t(select-file) или переместите сюда',
        }
      }
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',

    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false,

    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },

    react: {
      wait: true
    },
  })

export default i18n
