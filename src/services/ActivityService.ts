import {
  Activity,
  ActivityCategory,
  DeleteActivityPayload,
  GetActivityPayload,
  SubmitActivityPayload,
} from '@/models/activity'
import { useActivitiesStore } from '@/store/activities'
import { useAuthStore } from '@/store/auth'
import { isEmptyString } from '@/utils'
import Parse from 'parse'

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

  async getUsersActivities(user: Parse.User) {
    const query = new Parse.Query(Activity)
    query.equalTo('user', user)
    useActivitiesStore().usersActivities = await query.find()
  }

  async getActivityById(payload: GetActivityPayload) {
    const query = new Parse.Query(Activity)
    useActivitiesStore().selectedActivity = await query.get(payload.activityId)
  }

  async createActivity(payload: SubmitActivityPayload) {
    const object = new Activity()
    object.set('user', useAuthStore().user)
    object.set('category', payload.activityCategory)
    object.set('subcategory', payload.activitySubcategory)
    object.set('title', payload.title)
    object.set('description', payload.description)
    object.set('dateTime', payload.dateTime)
    await object.save()
  }

  async deleteActivity(payload: DeleteActivityPayload) {
    const query = new Parse.Query(Activity)
    const activity = await query.get(payload.activityId)
    await activity.destroy()
  }
}

export default new ActivityService()
