export interface Activity {
  readonly id: string
  readonly category: ActivityCategory
  readonly subcategory: ActivitySubcategory
  readonly title: string
  readonly description: string
  readonly date: string
  readonly time: string
}

export interface ActivityCategory {
  id: string
  name: ActivityCategoryName
  subcategories: ActivitySubcategory[]
}

export type ActivityCategoryName = 'SPORT'

export interface ActivitySubcategory {
  id: string
  name: ActivitySubcategoryName
}

export type ActivitySubcategoryName = 'RUNNING' | 'NORDIC_WALKING'

export interface CreateActivityPayload {
  activityCategory: ActivityCategory
  activitySubcategory: ActivitySubcategory
  title: string
  description: string
  date: string
  time: string
}

export interface GetActivityPayload {
  activityId: string
}

export interface DeleteActivityPayload {
  activityId: string
}
