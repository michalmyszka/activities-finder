import { DataStore } from 'aws-amplify'
import { Activity } from '@/models'

class ActivitiesService {
  async getAll() {
    const models = await DataStore.query(Activity)
    console.log(models)
  }
}

export default new ActivitiesService()
