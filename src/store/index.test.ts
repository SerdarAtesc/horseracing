import { describe, it, expect, beforeEach } from 'vitest'
import store from './index'
import type { Horse } from '@/types'

describe('Vuex Store', () => {
  beforeEach(() => {
    store.commit('SET_HORSES', [])
    store.commit('SET_RACE_SCHEDULE', [])
    store.commit('RESET_GAME')
  })

  describe('Horse Generation', () => {
    it('should generate 20 horses', async () => {
      await store.dispatch('generateHorses')
      expect(store.state.horses).toHaveLength(20)
    })

    it('should generate horses with correct properties', async () => {
      await store.dispatch('generateHorses')
      const horse: Horse = store.state.horses[0]
      
      expect(horse).toHaveProperty('id')
      expect(horse).toHaveProperty('name')
      expect(horse).toHaveProperty('color')
      expect(horse).toHaveProperty('condition')
      expect(horse.condition).toBeGreaterThanOrEqual(1)
      expect(horse.condition).toBeLessThanOrEqual(100)
    })
  })

  describe('Race Schedule Generation', () => {
    it('should generate 6 rounds', async () => {
      await store.dispatch('generateHorses')
      await store.dispatch('generateRaceSchedule')
      
      expect(store.state.raceSchedule).toHaveLength(6)
    })

    it('should have correct distances for each round', async () => {
      await store.dispatch('generateHorses')
      await store.dispatch('generateRaceSchedule')
      
      const expectedDistances: number[] = [1200, 1400, 1600, 1800, 2000, 2200]
      store.state.raceSchedule.forEach((round, index) => {
        expect(round.distance).toBe(expectedDistances[index])
      })
    })

    it('should select 10 horses per round', async () => {
      await store.dispatch('generateHorses')
      await store.dispatch('generateRaceSchedule')
      
      store.state.raceSchedule.forEach(round => {
        expect(round.horses).toHaveLength(10)
      })
    })
  })

  describe('Getters', () => {
    it('should return correct game ready status', async () => {
      expect(store.getters.isGameReady).toBe(false)
      
      await store.dispatch('generateHorses')
      expect(store.getters.isGameReady).toBe(false)
      
      await store.dispatch('generateRaceSchedule')
      expect(store.getters.isGameReady).toBe(true)
    })
  })
})
