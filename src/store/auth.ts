import { defineStore } from 'pinia'

export interface AuthsState {
  user: Parse.User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthsState => ({
    user: null,
  }),

  getters: {},

  actions: {
    setUser(payload: Parse.User) {
      this.user = payload
    },
  },
})
