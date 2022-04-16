import {
  Activity,
  ActivityCategory,
  ActivityPayload,
  DeleteActivityPayload,
  GetActivityPayload,
} from '@/models/activity'
import { useActivitiesStore } from '@/store/activities'
import { useAuthStore } from '@/store/auth'
import Parse from 'parse'

class ActivityService {
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

  async getActivityById(getActivityPayload: GetActivityPayload): Promise<Activity> {
    const query = new Parse.Query(Activity)
    return await query.get(getActivityPayload.activityId)
  }

  async createActivity(activityPayload: ActivityPayload) {
    const activity = new Activity()
    activity.set('user', useAuthStore().user)
    activity.set('category', activityPayload.activityCategory)
    activity.set('subcategory', activityPayload.activitySubcategory)
    activity.set('title', activityPayload.title)
    activity.set('description', activityPayload.description)
    activity.set('dateTime', activityPayload.dateTime)
    await activity.save()
  }

  async updateActivity(activityPayload: ActivityPayload) {
    const activity = activityPayload.activity as Activity
    activity.set('user', useAuthStore().user)
    activity.set('category', activityPayload.activityCategory)
    activity.set('subcategory', activityPayload.activitySubcategory)
    activity.set('title', activityPayload.title)
    activity.set('description', activityPayload.description)
    activity.set('dateTime', activityPayload.dateTime)
    await activity.save()
  }

  async deleteActivity(deleteActivityPayload: DeleteActivityPayload) {
    const query = new Parse.Query(Activity)
    const activity = await query.get(deleteActivityPayload.activityId)
    await activity.destroy()
  }
}

export default new ActivityService()
