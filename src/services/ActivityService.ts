import {
  Activity,
  ActivityCategory,
  ActivityPayload,
  DeleteActivityPayload,
  GetActivityPayload,
} from '@/models/activity'
import { CategoryFilter } from '@/models/filter'
import { useActivitiesStore } from '@/store/activities'
import { useAuthStore } from '@/store/auth'
import { useFiltersStore } from '@/store/filters'
import Parse from 'parse'

class ActivityService {
  async loadActivityCategories() {
    const query = new Parse.Query(ActivityCategory)
    const activityCategories = await query.find()
    useActivitiesStore().activityCategories = activityCategories
    useFiltersStore().categoryFilters = activityCategories.flatMap(
      (activityCategory) =>
        new CategoryFilter(activityCategory.getName(), activityCategory.getSubcategories())
    )
  }

  async getAllActivities() {
    let query = new Parse.Query(Activity)
    query.select('title', 'category', 'subcategory', 'dateTime')
    const selectedCategories = useFiltersStore().selectedCategories
    if (selectedCategories.length > 0) {
      const categoryQueries = [] as Parse.Query<Activity>[]
      selectedCategories.forEach((categoryFilter) => {
        const categoryQuery = new Parse.Query(Activity)
        categoryQuery.equalTo('category', categoryFilter.category)
        categoryQuery.containedIn(
          'subcategory',
          categoryFilter
            .getSelectedSubcategories()
            .flatMap((subcategoryFilter) => subcategoryFilter.subcategory)
        )
        categoryQueries.push(categoryQuery)
      })
      const filterQueries = Parse.Query.or(...categoryQueries)
      query = Parse.Query.and<Activity>(query, filterQueries)
    }
    const place = useFiltersStore().placeFilters
    if (place) {
      const placeQuery = new Parse.Query(Activity)
      placeQuery.equalTo('place', place)
      query = Parse.Query.and<Activity>(query, placeQuery)
    }
    useActivitiesStore().activities = await query.find()
  }

  async getMyActivities() {
    const query = new Parse.Query(Activity)
    query.select('title', 'category', 'subcategory', 'dateTime')
    query.equalTo('user', useAuthStore().user)
    useActivitiesStore().myActivities = await query.find()
  }

  async getActivityById(getActivityPayload: GetActivityPayload): Promise<Activity> {
    const query = new Parse.Query(Activity)
    return await query.get(getActivityPayload.activityId)
  }

  async createActivity(activityPayload: ActivityPayload) {
    const activity = new Activity()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    activity.setUser(useAuthStore().user!)
    this.setActivityFields(activity, activityPayload)
    await activity.save()
  }

  async updateActivity(activityPayload: ActivityPayload) {
    const activity = activityPayload.activity as Activity
    this.setActivityFields(activity, activityPayload)
    await activity.save()
  }

  private setActivityFields(activity: Activity, activityPayload: ActivityPayload) {
    activity.setCategory(activityPayload.activityCategory)
    activity.setSubcategory(activityPayload.activitySubcategory)
    activity.setTitle(activityPayload.title)
    activity.setDescription(activityPayload.description)
    activity.setPlace(activityPayload.place)
    activity.setAddress(activityPayload.address)
    activity.setDateTime(activityPayload.dateTime)
  }

  async deleteActivity(deleteActivityPayload: DeleteActivityPayload) {
    const query = new Parse.Query(Activity)
    const activity = await query.get(deleteActivityPayload.activityId)
    await activity.destroy()
  }
}

export default new ActivityService()
