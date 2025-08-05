import type { Horse, RaceRound, RoundResult } from '@/types'

export interface RaceState {
  horses: Horse[]
  raceSchedule: RaceRound[]
  currentRound: number
  isRacing: boolean
  racePositions: Record<number, number>
  raceResults: RoundResult[]
  raceCompleted: boolean
}

export const state: RaceState = {
  horses: [],
  raceSchedule: [],
  currentRound: 0,
  isRacing: false,
  racePositions: {},
  raceResults: [],
  raceCompleted: false
}