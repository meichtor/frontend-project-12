import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from './locales/ru'

const initI18n = () => {
  const instance = i18n.createInstance()

  instance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      fallbackLng: 'ru',
      resources: {
        ru,
      },
      debug: true,
      interpolation: {
        escapeValue: false,
      },
    })

  return instance
}

export default initI18n
