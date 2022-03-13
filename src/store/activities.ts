import { Activity, ActivityCategory } from '@/models/activity'
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

  actions: {},
})
