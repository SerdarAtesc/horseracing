<script setup lang="ts">
import { onMounted } from 'vue'
import { useRaceGame } from '@/composables/useRaceGame'
import HorseList from '@/components/HorseList.vue'
import RaceTrack from '@/components/RaceTrack.vue'
import RaceResults from '@/components/RaceResults.vue'
import RaceSchedule from '@/components/molecules/RaceSchedule.vue'

const { 
  horses, 
  raceSchedule, 
  currentRound, 
  generateHorses 
} = useRaceGame()

onMounted(async () => {
  await generateHorses()
})
</script>

<template>
  <div id="app">
    <header>
      <h1>Horse Racing</h1>
    </header>
    
    <main class="game-container">
      <div class="left-panel">
        <HorseList />
        
        <RaceSchedule 
          v-if="raceSchedule.length > 0"
          :schedule="raceSchedule"
          :current-round="currentRound"
        />
      </div>
      
      <div class="right-panel">
        <RaceTrack />
        <RaceResults />
      </div>
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

header h1 {
  margin: 0;
  color: white;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.game-container {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 1.5rem;
  padding: 1.5rem;
  max-width: 1600px;
  margin: 0 auto;
  min-height: calc(100vh - 120px);
}

.left-panel, .right-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.right-panel {
  min-height: 80vh;
}

@media (max-width: 1200px) {
  .game-container {
    grid-template-columns: 300px 1fr;
    gap: 1rem;
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .game-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  header h1 {
    font-size: 2rem;
  }
}
</style>
