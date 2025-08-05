import type { MutationTree } from 'vuex'
import type { RaceState } from './state'
import type { Horse, RaceRound, RoundResult } from '@/types'

export const mutations: MutationTree<RaceState> = {
  SET_HORSES(state, horses: Horse[]): void {
    state.horses = horses
  },

  SET_RACE_SCHEDULE(state, schedule: RaceRound[]): void {
    state.raceSchedule = schedule
    state.currentRound = 0
    state.raceCompleted = false
    state.racePositions = {}
  },

  SET_RACING_STATE(state, isRacing: boolean): void {
    state.isRacing = isRacing
  },

  UPDATE_RACE_POSITIONS(state, positions: Record<number, number>): void {
    state.racePositions = positions
  },

  ADD_RACE_RESULT(state, result: RoundResult): void {
    state.raceResults.push(result)
  },

  NEXT_ROUND(state): void {
    state.currentRound++
    if (state.currentRound >= state.raceSchedule.length) {
      state.raceCompleted = true
    }
  },

  RESET_GAME(state): void {
    state.currentRound = 0
    state.raceResults = []
    state.raceCompleted = false
    state.isRacing = false
    state.racePositions = {}
  }
}
