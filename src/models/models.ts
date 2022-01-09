import { ActivityCategory, ActivitySubcategory } from '@/models/index'

export interface CreateActivityPayload {
  activityCategory: ActivityCategory
  activitySubcategory: ActivitySubcategory
}

export interface GetActivityPayload {
  activityId: string
}

export interface DeleteActivityPayload {
  activityId: string
}
