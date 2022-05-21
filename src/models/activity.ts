import Parse from 'parse'
import { User } from './auth'

export class Activity extends Parse.Object {
  constructor() {
    super('Activity')
  }

  setUser(user: User) {
    this.set('user', user)
  }

  getTitle(): string {
    return this.get('title')
  }

  setTitle(title: string) {
    this.set('title', title)
  }

  getDescription(): string {
    return this.get('description')
  }

  setDescription(description: string) {
    this.set('description', description)
  }

  getCategory(): string {
    return this.get('category')
  }

  setCategory(category: string) {
    this.set('category', category)
  }

  getSubcategory(): string {
    return this.get('subcategory')
  }

  setSubcategory(subcategory: string) {
    this.set('subcategory', subcategory)
  }

  getDateTime(): Date {
    return this.get('dateTime')
  }

  setDateTime(dateTime: Date) {
    this.set('dateTime', dateTime)
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
