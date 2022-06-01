import {
  AcceptConnectionPayload,
  AddConnectionPayload,
  DeleteConnectionPayload,
} from '@/models/connection'
import { useConnectionsStore } from '@/store/connections'
import Parse from 'parse'
import i18n from '../i18n/i18n'
import NotificationService from './NotificationService'

class ActivityService {
  async addConnection(addConnectionPayload: AddConnectionPayload) {
    const response = await Parse.Cloud.run('addConnection', addConnectionPayload)
    if (response == 'USER_NOT_FOUND') {
      NotificationService.showNotification(i18n.global.t('userNotFound'))
    } else if (response == 'CONNECTION_ALREADY_EXISTS') {
      NotificationService.showNotification(i18n.global.t('connectionAlreadyExists'))
    }
  }

  async getMyPendingConnections() {
    const connections = await Parse.Cloud.run('getPendingConnections')
    useConnectionsStore().pendingConnections = await connections
  }

  async getMyConnections() {
    const connections = await Parse.Cloud.run('getConnections')
    useConnectionsStore().connections = await connections
  }

  async acceptConnection(acceptConnectionPayload: AcceptConnectionPayload) {
    await Parse.Cloud.run('acceptConnection', acceptConnectionPayload)
  }

  async deleteConnection(deleteConnectionPayload: DeleteConnectionPayload) {
    await Parse.Cloud.run('deleteConnection', deleteConnectionPayload)
  }
}

export default new ActivityService()
