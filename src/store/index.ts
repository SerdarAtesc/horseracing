import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import { state, RaceState } from './state'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'

export const key: InjectionKey<Store<RaceState>> = Symbol()

export default createStore<RaceState>({
  state,
  mutations,
  actions,
  getters
})

export type { RaceState }
