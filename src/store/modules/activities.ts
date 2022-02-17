import { Commit } from 'vuex'
import {
  Activity,
  ActivityCategory,
  CreateActivityPayload,
  DeleteActivityPayload,
  GetActivityPayload,
} from '@/models/models'
import Parse from 'parse'

export interface ActivitiesState {
  activityCategories: ActivityCategory[]
  activities: Activity[]
  selectedActivity: Activity
}

const state = () => ({
  activityCategories: null,
  activities: null,
  selectedActivity: null,
})

const getters = {}

const actions = {
  async getActivityCategories({ commit }: { commit: Commit }) {
    const query = new Parse.Query(ActivityCategory)
    const activityCategories = await query.find()
    commit('setActivityCategories', activityCategories)
  },

  async getAllActivities({ commit }: { commit: Commit }) {
    const query = new Parse.Query('Activity')
    const activities = await query.find()
    commit('setActivities', activities)
  },

  async getActivityById(
    { commit }: { commit: Commit },
    payload: GetActivityPayload
  ) {
    const activity = null
    commit('setSelectedActivity', activity)
  },

  async createActivity(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { commit }: { commit: Commit },
    payload: CreateActivityPayload
  ) {
    const object = new Parse.Object('Activity')
    object.set('category', payload.activityCategory)
    object.set('subcategory', payload.activitySubcategory)
    object.set('title', payload.title)
    object.set('description', payload.description)
    await object.save()
  },

  async deleteActivity(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { commit }: { commit: Commit },
    payload: DeleteActivityPayload
  ) {
    console.log('Deleting...')
  },
}

const mutations = {
  setActivityCategories(
    state: ActivitiesState,
    activityCategories: ActivityCategory[]
  ) {
    state.activityCategories = activityCategories
  },

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
