import { ActivityCategory, ActivitySubcategory } from '@/models/index'

export interface CreateActivityPayload {
  activityCategory: ActivityCategory
  activitySubcategory: ActivitySubcategory
  date: string
  time: string
  title: string
  description: string
}

export interface GetActivityPayload {
  activityId: string
}

export interface DeleteActivityPayload {
  activityId: string
}
