<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import RaceLane from './molecules/RaceLane.vue'
import BaseButton from './atoms/BaseButton.vue'

const store = useStore(key)

const isRacing = computed(() => store.state.isRacing)
const racePositions = computed(() => store.state.racePositions)
const currentRaceData = computed(() => store.getters.currentRaceData)
const hasSchedule = computed(() => store.state.raceSchedule.length > 0)
const raceCompleted = computed(() => store.state.raceCompleted)
const currentRound = computed(() => store.state.currentRound + 1)

const generateSchedule = () => {
  store.dispatch('generateRaceSchedule')
}

const startRace = () => {
  store.dispatch('startRace')
}
</script>

<template>
  <div class="race-track">
    <div class="track-header">
      <h3>Race Track</h3>
      <div class="track-info" v-if="currentRaceData">
        <span class="round-info">Round {{ currentRound }} - {{ currentRaceData.distance }}m</span>
      </div>
      <div class="track-controls">
        <BaseButton 
          @click="generateSchedule"
          :disabled="isRacing"
          variant="primary"
          size="small"
        >
          Generate Schedule
        </BaseButton>
        
        <BaseButton 
          @click="startRace"
          :disabled="!hasSchedule || isRacing || raceCompleted"
          :loading="isRacing"
          variant="success"
        >
          {{ raceCompleted ? 'Tournament Completed' : isRacing ? 'Racing All Rounds...' : 'Start Tournament' }}
        </BaseButton>
      </div>
    </div>
    
    <div v-if="!currentRaceData" class="no-race">
      <div class="empty-track">
        <h4>Ready to Race?</h4>
        <p>Generate a race schedule to see the horses compete!</p>
      </div>
    </div>
    
    <div v-else class="race-stadium">
      <div class="stadium-header">
        <div class="lap-info">{{ currentRound }} Lap {{ currentRaceData.distance }}m</div>
        <div class="finish-label">FINISH</div>
      </div>
      
      <div class="race-lanes">
        <RaceLane
          v-for="(horse, index) in currentRaceData.horses"
          :key="horse.id"
          :horse="horse"
          :position="racePositions[horse.id] || 0"
          :is-racing="isRacing"
          :lane-number="index + 1"
        />
      </div>
    </div>
    
    <div v-if="isRacing" class="race-status">
      <div class="status-indicator">
        <div class="pulse"></div>
        <span>Race in Progress...</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.race-track {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 1.5rem;
  min-height: 80vh;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.track-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #ddd;
}

.track-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 2rem;
  text-shadow: none;
}

.track-info {
  color: #2c3e50;
  font-size: 1.1rem;
  background: #f8f9fa;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  border: 2px solid #e9ecef;
}

.track-controls {
  display: flex;
  gap: 1rem;
}

.no-race {
  text-align: center;
  padding: 6rem 2rem;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-track {
  background: #f8f9fa;
  border-radius: 20px;
  padding: 4rem;
  border: 3px dashed #dee2e6;
  max-width: 600px;
}

.empty-track h4 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 2.5rem;
}

.empty-track p {
  margin: 0;
  color: #6c757d;
  font-size: 1.2rem;
}

.race-stadium {
  background: #f8f9fa;
  border: 3px solid #333;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.stadium-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #333;
  color: white;
  padding: 1rem 2rem;
  font-weight: bold;
}

.lap-info {
  font-size: 1.2rem;
  color: #ff6b6b;
}

.finish-label {
  font-size: 1.5rem;
  color: #ff4444;
  background: white;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.race-lanes {
  background: #e8e8e8;
}

.race-status {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  position: sticky;
  bottom: 2rem;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.pulse {
  width: 16px;
  height: 16px;
  background: #27ae60;
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(39, 174, 96, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 15px rgba(39, 174, 96, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(39, 174, 96, 0);
  }
}

@media (max-width: 768px) {
  .race-track {
    padding: 1rem;
    min-height: 70vh;
  }
  
  .track-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .track-header h3 {
    font-size: 1.5rem;
    text-align: center;
  }
  
  .track-controls {
    justify-content: center;
  }
  
  .stadium-header {
    padding: 0.75rem 1rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .lap-info, .finish-label {
    font-size: 1rem;
  }
}
</style>

