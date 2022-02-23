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
  NotificationService.showNotification(error.code + ': ' + error.message)
}

export default new ErrorService()
