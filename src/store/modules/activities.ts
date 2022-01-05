import { DataStore } from '@aws-amplify/datastore'
import { Activity } from '@/models'
import { Commit } from 'vuex'
import { CreateActivityPayload, GetActivityPayload } from '@/models/models'

export interface ActivitiesState {
  activities: Activity[]
  selectedActivity: Activity
}

const state = () => ({
  activities: null,
  selectedActivity: null,
})

const getters = {}

const actions = {
  async getAllActivities({ commit }: { commit: Commit }) {
    const activities = await DataStore.query(Activity)
    commit('setActivities', activities)
  },

  async getActivityById(
    { commit }: { commit: Commit },
    payload: GetActivityPayload
  ) {
    const activity = await DataStore.query(Activity, payload.activityId)
    commit('setSelectedActivity', activity)
  },

  async createActivity(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  setSelectedActivity(state: ActivitiesState, activity: Activity) {
    state.selectedActivity = activity
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
