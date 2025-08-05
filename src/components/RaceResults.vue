<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import RaceResultsTable from './molecules/RaceResultsTable.vue'
import BaseButton from './atoms/BaseButton.vue'

const store = useStore(key)

const raceResults = computed(() => store.state.raceResults || [])
const raceCompleted = computed(() => store.state.raceCompleted)

const expandedRounds = ref<Set<number>>(new Set())

const toggleRound = (round: number) => {
  if (expandedRounds.value.has(round)) {
    expandedRounds.value.delete(round)
  } else {
    expandedRounds.value.add(round)
  }
}

const startNewRace = () => {
  store.dispatch('startNewRace')
  expandedRounds.value.clear()
}
</script>

<template>
  <div class="race-results">
    <div v-if="raceResults.length === 0" class="no-results">
      <p>No race results yet. Start a race to see results!</p>
    </div>
    
    <div v-else>
      <div class="results-header">
        <h3>🏆 Tournament Results</h3>
      </div>

      <div class="results-accordion">
        <div 
          v-for="roundResult in raceResults" 
          :key="roundResult.round" 
          class="round-accordion"
        >
          <div 
            class="round-header"
            @click="toggleRound(roundResult.round)"
          >
            <div class="round-info">
              <span class="round-title">Round {{ roundResult.round }}</span>
              <span class="round-distance">{{ roundResult.distance }}m</span>
            </div>
            <div class="expand-icon" :class="{ expanded: expandedRounds.has(roundResult.round) }">
              ▼
            </div>
          </div>
          
          <div 
            v-if="expandedRounds.has(roundResult.round)"
            class="round-content"
          >
            <RaceResultsTable 
              :results="roundResult.results"
              :round="roundResult.round"
              :distance="roundResult.distance"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.race-results {
  margin-top: 1rem;
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: #666;
  background: #f8f9fa;
  border-radius: 8px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.results-header h3 {
  margin: 0;
  color: #2c3e50;
}

.results-accordion {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.round-accordion {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.round-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transition: all 0.3s ease;
}

.round-header:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
}

.round-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.round-title {
  font-weight: bold;
  font-size: 1.1rem;
}

.round-distance {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.9rem;
}

.expand-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.round-content {
  padding: 0;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
  }
}

@media (max-width: 768px) {
  .results-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .round-header {
    padding: 0.75rem 1rem;
  }
  
  .round-info {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
