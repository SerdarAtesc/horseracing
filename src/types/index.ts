export interface Horse {
  id: number
  name: string
  condition: number
  color: string
}

export interface RaceRound {
  round: number
  distance: number
  horses: Horse[]
}

export interface RaceResult {
  position: number
  horse: string
  horseId: number
  color: string
  time: string
}

export interface RoundResult {
  round: number
  distance: number
  results: RaceResult[]
}
