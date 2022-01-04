import { DataStore } from '@aws-amplify/datastore'
import { Activity } from '@/models'
import { Commit } from 'vuex'
import { CreateActivityPayload } from '@/models/models'

export interface ActivitiesState {
  activities: Activity[]
}

const state = () => ({
  activities: null,
})

const getters = {}

const actions = {
  async getAllActivities({ commit }: { commit: Commit }) {
    const activities = await DataStore.query(Activity)
    commit('setActivities', activities)
  },

  async createActivity(
    { commit }: { commit: Commit },
    payload: CreateActivityPayload
  ) {
    await DataStore.save(
      new Activity({
        type: payload.activityType,
      })
    )
  },
}

const mutations = {
  setActivities(state: ActivitiesState, activities: Activity[]) {
    state.activities = activities
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
