class ActivityService {
  isTitleValid(title: string) {
    return !isEmpty(title)
  }

  isDescriptionValid(description: string) {
    return !isEmpty(description)
  }
}

function isEmpty(string?: string) {
  return string === 'undefined' || !string?.trim()
}

export default new ActivityService()
