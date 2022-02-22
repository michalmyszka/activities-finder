import {
  Activity,
  ActivityCategory,
  CreateActivityPayload,
  DeleteActivityPayload,
  GetActivityPayload,
} from '@/models/activity'
import Parse from 'parse'
import { defineStore } from 'pinia'

export interface ActivitiesState {
  activityCategories: ActivityCategory[]
  activities: Activity[]
  selectedActivity: Activity | undefined
}

export const useActivitiesStore = defineStore('activities', {
  state: (): ActivitiesState => ({
    activityCategories: [] as ActivityCategory[],
    activities: [] as Activity[],
    selectedActivity: undefined,
  }),

  getters: {},

  actions: {
    async getActivityCategories() {
      const query = new Parse.Query(ActivityCategory)
      const activityCategories = await query.find()
      this.activityCategories = activityCategories
    },

    async getAllActivities() {
      const query = new Parse.Query(Activity)
      const activities = await query.find()
      this.activities = activities
    },

    async getActivityById(payload: GetActivityPayload) {
      const activity = null
      // this.selectedActivity = activity
    },

    async createActivity(payload: CreateActivityPayload) {
      const object = new Parse.Object('Activity')
      object.set('category', payload.activityCategory)
      object.set('subcategory', payload.activitySubcategory)
      object.set('title', payload.title)
      object.set('description', payload.description)
      const saveResult = object.save()
      console.log(saveResult)
      await saveResult
    },

    async deleteActivity(payload: DeleteActivityPayload) {
      console.log('Deleting...')
    },
  },
})
