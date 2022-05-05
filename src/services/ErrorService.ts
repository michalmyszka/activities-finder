import Parse from 'parse'
import router from '../router/index'
import NotificationService from './NotificationService'

class ErrorService {
  handleError(error: unknown) {
    console.error(error)
    if (error instanceof Parse.Error) {
      handleParseError(error)
    }
  }
}

function handleParseError(error: Parse.Error) {
  if (error.code == Parse.Error.INVALID_SESSION_TOKEN) {
    router.push({ name: 'Login' })
  } else {
    NotificationService.showNotification(error.code + ': ' + error.message)
  }
}

export default new ErrorService()
