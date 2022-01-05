import { createStore } from 'vuex'
import activities from '@/store/modules/activities'

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    activities,
  },
})
