import Parse from 'parse'

export class Activity extends Parse.Object {
  constructor() {
    super('Activity')
  }

  title(): string {
    return this.get('title')
  }

  description(): string {
    return this.get('description')
  }

  category(): string {
    return this.get('category')
  }

  subcategory(): string {
    return this.get('subcategory')
  }

  dateTime(): Date {
    return this.get('dateTime')
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

export interface ActivityPayload {
  title: string
  description: string
  activityCategory: string
  activitySubcategory: string
  dateTime: Date
}

export interface GetActivityPayload {
  activityId: string
}

export interface DeleteActivityPayload {
  activityId: string
}
