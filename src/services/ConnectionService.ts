import { AddConnectionPayload } from '@/models/connection'
import Parse from 'parse'

class ActivityService {
  async addConnection(addConnectionPayload: AddConnectionPayload) {
    const response = await Parse.Cloud.run('addConnection', addConnectionPayload)
    console.log(response)
  }
}

export default new ActivityService()
