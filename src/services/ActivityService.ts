import {
  Activity,
  ActivityCategory,
  ActivityPayload,
  DeleteActivityPayload,
  GetActivityPayload,
  ActivityCategoryFilter,
} from '@/models/activity'
import { useActivitiesStore } from '@/store/activities'
import { useAuthStore } from '@/store/auth'
import Parse from 'parse'

class ActivityService {
  async loadActivityCategories() {
    const query = new Parse.Query(ActivityCategory)
    const activityCategories = await query.find()
    useActivitiesStore().activityCategories = activityCategories
    useActivitiesStore().activityCategoryFilters = activityCategories.flatMap(
      (activityCategory) => new ActivityCategoryFilter(activityCategory)
    )
  }

  async getAllActivities() {
    const query = new Parse.Query(Activity)
    query.select('title', 'category', 'subcategory', 'dateTime')
    useActivitiesStore().activities = await query.find()
  }

  async getUsersActivities() {
    const query = new Parse.Query(Activity)
    query.select('title', 'category', 'subcategory', 'dateTime')
    query.equalTo('user', useAuthStore().user)
    useActivitiesStore().usersActivities = await query.find()
  }

  async getActivityById(getActivityPayload: GetActivityPayload): Promise<Activity> {
    const query = new Parse.Query(Activity)
    return await query.get(getActivityPayload.activityId)
  }

  async createActivity(activityPayload: ActivityPayload) {
    const activity = new Activity()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    activity.setUser(useAuthStore().user!)
    activity.setCategory(activityPayload.activityCategory)
    activity.setSubcategory(activityPayload.activitySubcategory)
    activity.setTitle(activityPayload.title)
    activity.setDescription(activityPayload.description)
    activity.setDateTime(activityPayload.dateTime)
    await activity.save()
  }

  async updateActivity(activityPayload: ActivityPayload) {
    const activity = activityPayload.activity as Activity
    activity.setCategory(activityPayload.activityCategory)
    activity.setSubcategory(activityPayload.activitySubcategory)
    activity.setTitle(activityPayload.title)
    activity.setDescription(activityPayload.description)
    activity.setDateTime(activityPayload.dateTime)
    await activity.save()
  }

  async deleteActivity(deleteActivityPayload: DeleteActivityPayload) {
    const query = new Parse.Query(Activity)
    const activity = await query.get(deleteActivityPayload.activityId)
    await activity.destroy()
  }
}

export default new ActivityService()
