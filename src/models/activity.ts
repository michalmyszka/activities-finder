import Parse from 'parse'

export class Activity extends Parse.Object {
  constructor() {
    super('Activity')
  }

  getTitle(): string {
    return this.get('title')
  }

  getDescription(): string {
    return this.get('description')
  }

  getCategory(): string {
    return this.get('category')
  }

  getSubcategory(): string {
    return this.get('subcategory')
  }

  getDateTime(): Date {
    return this.get('dateTime')
  }
}

export class ActivityCategory extends Parse.Object {
  constructor() {
    super('ActivityCategory')
  }

  getName(): string {
    return this.get('name')
  }

  getSubcategories(): string[] {
    return this.get('subcategories')
  }
}

export interface ActivityPayload {
  activity?: Activity
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
