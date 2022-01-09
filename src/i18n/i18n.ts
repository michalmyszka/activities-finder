import { createI18n } from 'vue-i18n'

const messages = {
  'en-US': {
    appTitle: 'Virtual Arena',
    activities: 'Activities',
    settings: 'Settings',
    signOut: 'Sign out',
    createActivity: 'Create activity',
    ok: 'OK',
    cancel: 'Cancel',
    title: 'Title',
    description: 'Description',
    activityCategory: 'Activity category',
    activitySubcategory: 'Activity subcategory',
    submit: 'Submit',
  },
}

const i18n = createI18n({
  fallbackLocale: 'en-US',
  messages: messages,
})

export default i18n
