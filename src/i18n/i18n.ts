import { createI18n } from 'vue-i18n'

const messages = {
  'en-US': {
    appTitle: 'Activities Finder',
    activities: 'Activities',
    settings: 'Settings',
    logOut: 'Log out',
    createActivity: 'Create activity',
    ok: 'OK',
    cancel: 'Cancel',
    title: 'Title',
    dateTime: 'Date and time',
    description: 'Description',
    activityCategory: 'Activity category',
    activitySubcategory: 'Activity subcategory',
    submit: 'Submit',
    email: 'E-mail',
    password: 'Password',
    confirmPassword: 'Confirm password',
    login: 'Login',
    signUp: 'Sign up',
    noAccount: 'No account yet?',
    confirmEmail:
      'Please follow the instructions sent to your e-mail to finish the sign-up process.',
    forgotPassword: 'Forgot password?',
    resetPassword: 'Reset password',
    resetPasswordRequested: 'Reset password requested. Please check your inbox for instructions.',
    delete: 'Delete',
    edit: 'Edit',
    invalidEmail: 'Invalid email address',
    invalidPassword: 'Invalid password',
    passwordsDontMatch: "Passwords don't match",
  },
}

const i18n = createI18n({
  fallbackLocale: 'en-US',
  messages: messages,
})

export default i18n
