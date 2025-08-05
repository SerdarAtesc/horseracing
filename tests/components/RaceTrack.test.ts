import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { createStore, Store } from 'vuex'
import RaceTrack from '@/components/RaceTrack.vue'
import { key, type RaceState } from '@/store'
import type { Horse, RaceRound } from '@/types'

const createMockStore = (state: Partial<RaceState> = {}): Store<RaceState> => {
  const mockDispatch = vi.fn()
  
  const store = createStore<RaceState>({
    state: {
      horses: [],
      raceSchedule: [],
      currentRound: 0,
      isRacing: false,
      raceResults: [],
      racePositions: {},
      raceCompleted: false,
      ...state
    },
    getters: {
      isGameReady: (state: RaceState): boolean => state.horses.length > 0 && state.raceSchedule.length > 0,
      currentRaceData: (state: RaceState) => state.raceSchedule[state.currentRound] || null
    },
    mutations: {},
    actions: {
      generateRaceSchedule: vi.fn(),
      startRace: vi.fn()
    }
  })
  
  store.dispatch = mockDispatch
  
  return store
}

const mockHorses: Horse[] = Array(20).fill(null).map((_, i) => ({
  id: i + 1,
  name: `Horse ${i + 1}`,
  color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
  condition: 50 + Math.floor(Math.random() * 50)
}))

const mockSchedule: RaceRound[] = Array(6).fill(null).map((_, i) => ({
  round: i + 1,
  distance: 1200 + i * 200,
  horses: mockHorses.slice(0, 10)
}))

describe('RaceTrack', () => {
  let store: Store<RaceState>

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Initial State', () => {
    it('should show empty track when no race data', () => {
      store = createMockStore()
      
      const { getByText } = render(RaceTrack, {
        global: {
          plugins: [store],
          provide: { [key as symbol]: store }
        }
      })
      
      expect(getByText('Ready to Race?')).toBeTruthy()
      expect(getByText('Generate a race schedule to see the horses compete!')).toBeTruthy()
    })

    it('should render generate schedule button', () => {
      store = createMockStore()
      
      const { getByText } = render(RaceTrack, {
        global: {
          plugins: [store],
          provide: { [key as symbol]: store }
        }
      })
      
      expect(getByText('Generate Schedule')).toBeTruthy()
    })
  })

  describe('With Schedule', () => {
    it('should render start tournament button when ready', () => {
      store = createMockStore({
        horses: mockHorses,
        raceSchedule: mockSchedule
      })
      
      const { getByText } = render(RaceTrack, {
        global: {
          plugins: [store],
          provide: { [key as symbol]: store }
        }
      })
      
      expect(getByText('Start Tournament')).toBeTruthy()
    })

    it('should show race lanes when race data exists', () => {
      store = createMockStore({
        horses: mockHorses,
        raceSchedule: mockSchedule
      })
      
      const { container } = render(RaceTrack, {
        global: {
          plugins: [store],
          provide: { [key as symbol]: store }
        }
      })
      
      expect(container.querySelector('.race-stadium')).toBeTruthy()
      expect(container.querySelector('.race-lanes')).toBeTruthy()
    })

    it('should display current round info', () => {
      store = createMockStore({
        horses: mockHorses,
        raceSchedule: mockSchedule
      })
      
      const { getByText } = render(RaceTrack, {
        global: {
          plugins: [store],
          provide: { [key as symbol]: store }
        }
      })
      
      expect(getByText('Round 1 - 1200m')).toBeTruthy()
    })
  })

  describe('Racing State', () => {
    it('should show racing status when race is active', () => {
      store = createMockStore({
        horses: mockHorses,
        raceSchedule: mockSchedule,
        isRacing: true
      })
      
      const { getByText } = render(RaceTrack, {
        global: {
          plugins: [store],
          provide: { [key as symbol]: store }
        }
      })
      
      expect(getByText('Racing All Rounds...')).toBeTruthy()
      expect(getByText('Race in Progress...')).toBeTruthy()
    })

    it('should disable buttons during race', () => {
      store = createMockStore({
        horses: mockHorses,
        raceSchedule: mockSchedule,
        isRacing: true
      })
      
      const { getByText } = render(RaceTrack, {
        global: {
          plugins: [store],
          provide: { [key as symbol]: store }
        }
      })
      
      const generateBtn = getByText('Generate Schedule').closest('button')
      const startBtn = getByText('Racing All Rounds...').closest('button')
      
      expect(generateBtn).toHaveProperty('disabled', true)
      expect(startBtn).toHaveProperty('disabled', true)
    })
  })

  describe('User Interactions', () => {
    it('should call generateRaceSchedule when generate button clicked', async () => {
      store = createMockStore({ horses: mockHorses })
      
      const { getByText } = render(RaceTrack, {
        global: {
          plugins: [store],
          provide: { [key as symbol]: store }
        }
      })
      
      await fireEvent.click(getByText('Generate Schedule'))
      
      expect(store.dispatch).toHaveBeenCalledWith('generateRaceSchedule')
    })

    it('should call startRace when start button clicked', async () => {
      store = createMockStore({
        horses: mockHorses,
        raceSchedule: mockSchedule
      })
      
      const { getByText } = render(RaceTrack, {
        global: {
          plugins: [store],
          provide: { [key as symbol]: store }
        }
      })
      
      await fireEvent.click(getByText('Start Tournament'))
      
      expect(store.dispatch).toHaveBeenCalledWith('startRace')
    })
  })

  describe('Completed State', () => {
    it('should show tournament completed when race finished', () => {
      store = createMockStore({
        horses: mockHorses,
        raceSchedule: mockSchedule,
        raceCompleted: true
      })
      
      const { getByText } = render(RaceTrack, {
        global: {
          plugins: [store],
          provide: { [key as symbol]: store }
        }
      })
      
      expect(getByText('Tournament Completed')).toBeTruthy()
    })
  })
})
