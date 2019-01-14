import i18n from 'i18next'
import * as LanguageDetector from 'i18next-browser-languagedetector'
import { reactI18nextModule } from 'react-i18next'
import {
  en,
  ru,
} from './translations'

i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    resources: {
      en: {
        translations: en,
      },
      ru: {
        translations: ru,
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
