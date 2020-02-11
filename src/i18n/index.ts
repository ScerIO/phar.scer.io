import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import resources from '@alienfast/i18next-loader!./locales'

let newRes = {};
for (const ang in resources) {
  newRes[ang] = {'translation': resources[ang]};
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: newRes,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',

    ns: ['translation'],
    fallbackNS: 'translation',

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
