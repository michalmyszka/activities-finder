import {
  Activity,
  ActivityCategory,
  ActivityPayload,
  DeleteActivityPayload,
  GetActivityPayload,
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

  async getUsersActivities() {
    const query = new Parse.Query(Activity)
    query.equalTo('user', useAuthStore().user)
    useActivitiesStore().usersActivities = await query.find()
  }

  async getActivityById(payload: GetActivityPayload): Promise<Activity> {
    const query = new Parse.Query(Activity)
    return await query.get(payload.activityId)
  }

  async createActivity(payload: ActivityPayload) {
    const activity = new Activity()
    activity.set('user', useAuthStore().user)
    activity.set('category', payload.activityCategory)
    activity.set('subcategory', payload.activitySubcategory)
    activity.set('title', payload.title)
    activity.set('description', payload.description)
    activity.set('dateTime', payload.dateTime)
    await activity.save()
  }

  async updateActivity(payload: ActivityPayload, activity: Activity) {
    activity.set('user', useAuthStore().user)
    activity.set('category', payload.activityCategory)
    activity.set('subcategory', payload.activitySubcategory)
    activity.set('title', payload.title)
    activity.set('description', payload.description)
    activity.set('dateTime', payload.dateTime)
    await activity.save()
  }

  async deleteActivity(payload: DeleteActivityPayload) {
    const query = new Parse.Query(Activity)
    const activity = await query.get(payload.activityId)
    await activity.destroy()
  }
}

export default new ActivityService()
