export function isEmptyString(string?: string) {
  return string === 'undefined' || !string?.trim()
}
