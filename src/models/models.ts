import Parse from 'parse'

export class Activity extends Parse.Object {
  constructor() {
    super('Activity')
  }
}

export class ActivityCategory extends Parse.Object {
  constructor() {
    super('ActivityCategory')
  }

  name(): string {
    return this.get('name')
  }

  subcategories(): string[] {
    return this.get('subcategories')
  }
}

export interface CreateActivityPayload {
  title: string
  description: string
  activityCategory: string
  activitySubcategory: string
  date: string
  time: string
}

export interface GetActivityPayload {
  activityId: string
}

export interface DeleteActivityPayload {
  activityId: string
}
