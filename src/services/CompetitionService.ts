import { DataStore } from 'aws-amplify'
import { Competition } from '@/models'

class CompetitionService {
  async getAll() {
    const models = await DataStore.query(Competition)
    console.log(models)
  }
}

export default new CompetitionService()
