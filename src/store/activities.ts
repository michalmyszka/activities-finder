import {
  Activity,
  ActivityCategory,
  ActivityCategoryFilter,
  ActivitySubcategoryFilter,
} from '@/models/activity'
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

  getters: {
    selectedActivitySubcategoryFilters(): ActivitySubcategoryFilter[] {
      return this.activityCategoryFilters
        .flatMap((activityCategoryFilter) => activityCategoryFilter.subcategoryFilters)
        .filter((activitySubcategoryFilter) => activitySubcategoryFilter.selected)
    },
  },

  actions: {},
})
