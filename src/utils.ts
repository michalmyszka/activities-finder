export function isEmptyString(string?: string) {
  return string === 'undefined' || !string?.trim()
}

const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')
export const passwordValidator = (value: string) => passwordRegex.test(value)
