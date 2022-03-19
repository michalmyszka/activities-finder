import { isEmptyString } from '@/utils'
import Parse from 'parse'
import {
  Activity,
  ActivityCategory,
  CreateActivityPayload,
  DeleteActivityPayload,
  GetActivityPayload,
} from '@/models/activity'
import { useActivitiesStore } from '@/store/activities'

class ActivityService {
  isTitleValid(title: string) {
    return !isEmptyString(title)
  }

  isDescriptionValid(description: string) {
    return !isEmptyString(description)
  }

  async loadActivityCategories() {
    const query = new Parse.Query(ActivityCategory)
    useActivitiesStore().activityCategories = await query.find()
  }

  async getAllActivities() {
    const query = new Parse.Query(Activity)
    useActivitiesStore().activities = await query.find()
  }

  async getActivityById(payload: GetActivityPayload) {
    const activity = null
    // this.selectedActivity = activity
  }

  async createActivity(payload: CreateActivityPayload) {
    console.log(payload.dateTime)
    const object = new Parse.Object('Activity')
    object.set('category', payload.activityCategory)
    object.set('subcategory', payload.activitySubcategory)
    object.set('title', payload.title)
    object.set('description', payload.description)
    object.set('dateTime', payload.dateTime)
    await object.save()
  }

  async deleteActivity(payload: DeleteActivityPayload) {
    console.log('Deleting...')
  }
}

export default new ActivityService()
