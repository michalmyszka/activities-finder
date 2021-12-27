import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    appTitle: 'Virtual Arena',
  },
}

const i18n = createI18n({
  fallbackLocale: 'en',
  messages: messages,
})

export default i18n
