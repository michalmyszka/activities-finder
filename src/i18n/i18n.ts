import { createI18n } from 'vue-i18n'

const messages = {
  'en-US': {
    appTitle: 'Activities Finder',
    activities: 'Activities',
    myActivities: 'My activities',
    settings: 'Settings',
    logOut: 'Log out',
    createActivity: 'Create activity',
    ok: 'OK',
    cancel: 'Cancel',
    title: 'Title',
    titleExample: 'e.g. Basketball game',
    dateTime: 'Date and time',
    description: 'Description',
    descriptionExample: 'e.g. Basketball game between Chicago Bulls and Phoenix Suns',
    activityCategory: 'Activity category',
    activitySubcategory: 'Activity subcategory',
    submit: 'Submit',
    email: 'E-mail',
    password: 'Password',
    confirmPassword: 'Confirm password',
    login: 'Login',
    signUp: 'Sign up',
    confirmEmail:
      'Please follow the instructions sent to your e-mail to finish the sign-up process.',
    resetPassword: 'Reset password',
    resetPasswordRequested: 'Reset password requested. Please check your inbox for instructions.',
    delete: 'Delete',
    edit: 'Edit',
    invalidEmail: 'Invalid email address',
    invalidPassword:
      'Password must have minimum eight characters, at least one upper case letter, one lower case letter, one digit and one special character.',
    passwordsDontMatch: "Passwords don't match",
    fieldRequired: 'This field is required',
    deleteActivity: 'Delete activity',
    back: 'Back',
    update: 'Update',
    profile: 'Profile',
    emailPasswordEtc: 'Email, password etc.',
    updateEmail: 'Update email',
    updatePassword: 'Update password',
    passwordUpdated: 'Password updated',
    emailUpdated: 'Email updated. Pleas check your inbox to confirm your new email address.',
    nickname: 'Name/nickname',
    updateNickname: 'Update name/nickname',
    nicknameUpdated: 'Name/nickname updated',
    viewOptions: 'View options',
    selectAll: 'Select all',
    place: 'Place',
    placeExample: 'e.g. Chicago',
    clear: 'Clear',
    address: 'Address',
    addressExample: 'e.g. 1901 WEST MADISON STREET, CHICAGO, ILLINOIS 60612',
    manage: 'Manage',
    manageJudges: 'Manage judges',
  },
}

const i18n = createI18n({
  fallbackLocale: 'en-US',
  messages: messages,
})

export default i18n
