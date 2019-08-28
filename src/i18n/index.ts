import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import {
  en,
  ru,
} from './translations'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: en,
      },
      ru: {
        translations: ru,
      },
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',

    ns: ['translations'],
    fallbackNS: 'translations',

    keySeparator: '.',

    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },

    react: {
      wait: true,
    },
  })

export default i18n
