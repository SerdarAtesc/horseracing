import type { ActionTree } from 'vuex'
import type { RaceState } from './state'
import type { Horse, RaceRound, RoundResult } from '@/types'

export const actions: ActionTree<RaceState, RaceState> = {
  generateHorses({ commit }): void {
    const horses: Horse[] = []
    
    const generateDistinctColor = (index: number): string => {
      const hue = (index * 137.508) % 360
      const saturation = 70 + (index % 3) * 15
      const lightness = 45 + (index % 4) * 10
      return `hsl(${Math.round(hue)}, ${saturation}%, ${lightness}%)`
    }
    
    for (let i = 1; i <= 20; i++) {
      horses.push({
        id: i,
        name: `Horse ${i}`,
        condition: Math.floor(Math.random() * 100) + 1,
        color: generateDistinctColor(i - 1),
      })
    }
    
    commit('SET_HORSES', horses)
  },

  generateRaceSchedule({ commit, state }): void {
    const schedule: RaceRound[] = []
    const distances = [1200, 1400, 1600, 1800, 2000, 2200]
    
    if (state.horses.length === 0) {
      console.warn('No horses available for race schedule')
      return
    }
    
    const selectedHorses = [...state.horses]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(10, state.horses.length))
    
    for (let round = 1; round <= 6; round++) {
      schedule.push({
        round,
        distance: distances[round - 1],
        horses: selectedHorses.map(horse => ({ ...horse }))
      })
    }
    
    commit('SET_RACE_SCHEDULE', schedule)
  },

  async startRace({ commit, state, dispatch }): Promise<void> {
    if (state.raceSchedule.length === 0) return
    
    commit('SET_RACING_STATE', true)
    
    state.currentRound = 0
    state.raceResults = []
    state.raceCompleted = false
    state.racePositions = {}
    
    for (let i = 0; i < state.raceSchedule.length; i++) {
      const currentRaceData = state.raceSchedule[i]
      
      await dispatch('runRound', currentRaceData)
      
      if (i < state.raceSchedule.length - 1) {
        commit('NEXT_ROUND')
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    commit('SET_RACING_STATE', false)
    commit('NEXT_ROUND')
  },

  startNewRace({ commit, dispatch }): void {
    commit('RESET_GAME')
    dispatch('generateRaceSchedule')
  },

  async runRound({ commit }, roundData: RaceRound): Promise<void> {
    const { round, distance, horses } = roundData

    const initialPositions: Record<number, number> = {}
    horses.forEach(horse => {
      initialPositions[horse.id] = 0
    })
    commit('UPDATE_RACE_POSITIONS', initialPositions)

    interface HorseWithTime extends Horse {
      time: number
      distance: number
    }

    const raceResults: HorseWithTime[] = horses.map(horse => {
      const baseTime = distance / 10
      const conditionFactor = (100 - horse.condition) / 100 * 0.3
      const randomFactor = Math.random() * 0.2
      const totalTime = baseTime * (1 + conditionFactor + randomFactor)

      return {
        ...horse,
        time: totalTime,
        distance
      }
    }).sort((a, b) => a.time - b.time)

    await new Promise<void>(resolve => {
      const duration = 3000
      const startTime = Date.now()

      const animate = (): void => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        const positions: Record<number, number> = {}
        raceResults.forEach((horse, index) => {
          const horseProgress = Math.min(progress * (1 + (raceResults.length - index - 1) * 0.1), 1)
          positions[horse.id] = horseProgress * 100
        })

        commit('UPDATE_RACE_POSITIONS', positions)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          resolve()
        }
      }

      animate()
    })

    const result: RoundResult = {
      round,
      distance,
      results: raceResults.map((horse, index) => ({
        position: index + 1,
        horse: horse.name,
        horseId: horse.id,
        color: horse.color,
        time: horse.time.toFixed(2)
      }))
    }

    commit('ADD_RACE_RESULT', result)
  }
}
