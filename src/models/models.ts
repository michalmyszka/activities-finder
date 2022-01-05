import { ActivityType } from '@/models/index'

export interface CreateActivityPayload {
  activityType: ActivityType
}

export interface GetActivityPayload {
  activityId: string
}
