import type { GetterTree } from 'vuex'
import type { RaceState } from './state'

export const getters: GetterTree<RaceState, RaceState> = {
  currentRaceData: (state) => {
    return state.raceSchedule[state.currentRound] || null
  },

  isGameReady: (state) => {
    return state.horses.length > 0 && state.raceSchedule.length > 0
  }
}