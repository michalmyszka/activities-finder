import { Connection } from '@/models/connection'
import { defineStore } from 'pinia'

export interface ConnectionsState {
  pendingConnections: Connection[]
  connections: Connection[]
}

export const useConnectionsStore = defineStore('connections', {
  state: (): ConnectionsState => ({
    pendingConnections: [] as Connection[],
    connections: [] as Connection[],
  }),

  getters: {},

  actions: {},
})
