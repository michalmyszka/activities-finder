import { isEmptyString } from '@/utils'

class ActivityService {
  isTitleValid(title: string) {
    return !isEmptyString(title)
  }

  isDescriptionValid(description: string) {
    return !isEmptyString(description)
  }
}

export default new ActivityService()
