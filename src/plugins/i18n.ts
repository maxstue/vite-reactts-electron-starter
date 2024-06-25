import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translations from '../locales';

i18n
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    resources: translations,
    defaultNS: 'translations'
  });

export default i18n;
