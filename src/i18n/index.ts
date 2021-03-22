import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ru from './ru.json';

const language = navigator.language === 'ru-RU' ? 'ru' : 'en';

i18n.use(initReactI18next).init({
  resources: { en, ru },
  lng: language,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
