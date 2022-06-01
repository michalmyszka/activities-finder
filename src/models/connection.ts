import Parse from 'parse'
import { User } from './auth'

export interface AddConnectionPayload {
  email: string
}

export interface AcceptConnectionPayload {
  connectionId: string
}

export interface DeleteConnectionPayload {
  connectionId: string
}

export class Connection extends Parse.Object {
  constructor() {
    super('Connection')
  }

  private getUserA(): User {
    return this.get('userA')
  }

  private getUserB(): User {
    return this.get('userB')
  }

  getConnectionUser(thisUser: User): User {
    if (this.getUserA().id == thisUser.id) {
      return this.getUserB()
    }
    return this.getUserA()
  }

  pendingAcceptanceFromThisUser(thisUser: User): boolean {
    return this.getUserB().id == thisUser.id
  }
}
