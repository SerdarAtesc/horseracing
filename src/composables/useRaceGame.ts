import { computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'

export function useRaceGame() {
  const store = useStore(key)

  const horses = computed(() => store.state.horses)
  const raceSchedule = computed(() => store.state.raceSchedule)
  const currentRound = computed(() => store.state.currentRound)
  const isRacing = computed(() => store.state.isRacing)
  const raceResults = computed(() => store.state.raceResults)
  const raceCompleted = computed(() => store.state.raceCompleted)

  const generateHorses = async () => {
    await store.dispatch('generateHorses')
  }

  const generateRaceSchedule = () => {
    console.log('Generating race schedule...')
    store.dispatch('generateRaceSchedule')
    console.log('Schedule generated:', store.state.raceSchedule.length)
  }

  const startRace = () => {
    store.dispatch('startRace')
  }

  const startNewRace = () => {
    store.dispatch('startNewRace')
  }

  return {
    horses,
    raceSchedule,
    currentRound,
    isRacing,
    raceResults,
    raceCompleted,
    generateHorses,
    generateRaceSchedule,
    startRace,
    startNewRace
  }
}
