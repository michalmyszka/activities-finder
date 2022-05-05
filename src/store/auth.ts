import { User } from '@/models/auth'
import { defineStore } from 'pinia'

export interface AuthsState {
  user: User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthsState => ({
    user: null,
  }),

  getters: {},

  actions: {
    setUser(payload: User | null) {
      this.user = payload
    },
  },
})
