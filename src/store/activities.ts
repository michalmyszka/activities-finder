import { Activity, ActivityCategory, ActivityCategoryFilter } from '@/models/activity'
import { defineStore } from 'pinia'

export interface ActivitiesState {
  activityCategories: ActivityCategory[]
  activities: Activity[]
  usersActivities: Activity[] | undefined
  activityCategoryFilters: ActivityCategoryFilter[]
}

export const useActivitiesStore = defineStore('activities', {
  state: (): ActivitiesState => ({
    activityCategories: [] as ActivityCategory[],
    activities: [] as Activity[],
    usersActivities: undefined,
    activityCategoryFilters: [] as ActivityCategoryFilter[],
  }),

  getters: {},

  actions: {},
})
