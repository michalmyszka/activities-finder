import { createI18n } from 'vue-i18n'

const messages = {
  'en-US': {
    appTitle: 'Virtual Arena',
    activities: 'Activities',
    settings: 'Settings',
    signOut: 'Sign out',
    ok: 'OK',
    cancel: 'Cancel',
    activityType: 'Activity type',
  },
}

const i18n = createI18n({
  fallbackLocale: 'en-US',
  messages: messages,
})

export default i18n
