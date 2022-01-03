import { DataStore } from 'aws-amplify'
import { Activity } from '@/models'
import { Commit } from 'vuex'

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
