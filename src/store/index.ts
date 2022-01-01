import { createStore } from 'vuex'
import activities from '@/store/modules/activities'

export default createStore({
  modules: {
    activities,
  },
})
