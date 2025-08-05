<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'

const store = useStore(key)
const raceSchedule = computed(() => store.state.raceSchedule)
const currentRound = computed(() => store.state.currentRound)
const isRacing = computed(() => store.state.isRacing)
</script>

<template>
  <div class="race-schedule">
    <h3>Race Schedule</h3>
    
    <div v-if="raceSchedule.length === 0" class="no-schedule">
      <p>Generate a schedule to see races</p>
    </div>
    
    <div v-else class="schedule-container">
      <div 
        v-for="(round, index) in raceSchedule" 
        :key="index"
        class="round-info"
        :class="{ 
          active: currentRound === index && isRacing,
          completed: !isRacing || currentRound > index
        }"
      >
        <div class="round-header">
          <strong>Round {{ round.round }}</strong>
          <span class="distance">{{ round.distance }}m</span>
        </div>
        <div class="horses-count">{{ round.horses.length }} horses</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.race-schedule h3 {
  margin-top: 0;
  color: #2c3e50;
}

.no-schedule {
  text-align: center;
  padding: 1rem;
  color: #666;
}

.schedule-container {
  overflow-y: auto;
}

.round-info {
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: white;
  border-radius: 6px;
  border: 2px solid #ddd;
  transition: all 0.3s ease;
}

.round-info.active {
  border-color: #3498db;
  background: #e3f2fd;
}

.round-info.completed {
  border-color: #27ae60;
  background: #e8f5e8;
}

.round-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.distance {
  color: #666;
  font-size: 0.9rem;
}

.horses-count {
  font-size: 0.8rem;
  color: #666;
}
</style>
