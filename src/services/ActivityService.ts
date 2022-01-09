import { ActivityCategory, ActivitySubcategory } from '@/models'

class ActivityService {
  isTitleValid(title: string) {
    return !isEmpty(title)
  }

  isDescriptionValid(description: string) {
    return !isEmpty(description)
  }

  mostRecentlyUsedCategory() {
    return ActivityCategory.SPORT
  }

  mostRecentlyUsedSubcategory() {
    return ActivitySubcategory.RUNNING
  }
}

function isEmpty(string?: string) {
  return string === 'undefined' || !string?.trim()
}

export default new ActivityService()
