import { createI18n } from 'vue-i18n'

const messages = {
  'en-US': {
    appTitle: 'Activities Finder',
    activities: 'Activities',
    settings: 'Settings',
    signOut: 'Sign out',
    createActivity: 'Create activity',
    ok: 'OK',
    cancel: 'Cancel',
    title: 'Title',
    date: 'Date',
    time: 'Time',
    description: 'Description',
    activityCategory: 'Activity category',
    activitySubcategory: 'Activity subcategory',
    submit: 'Submit',
    email: 'E-mail',
    password: 'Password',
    confirmPassword: 'Confirm password',
    login: 'Login',
    signUp: 'Sign Up',
    noAccount: 'No account yet?',
    confirmEmail:
      'Please follow the instructions sent to your e-mail to finish the sign-up process.',
  },
}

const i18n = createI18n({
  fallbackLocale: 'en-US',
  messages: messages,
})

export default i18n
