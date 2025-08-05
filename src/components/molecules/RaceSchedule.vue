<script setup lang="ts">
import { ref } from 'vue'
import type { RaceRound } from '@/types'

interface Props {
  schedule: RaceRound[]
  currentRound: number
}

defineProps<Props>()

const expandedRounds = ref<Set<number>>(new Set())

const toggleRound = (round: number) => {
  if (expandedRounds.value.has(round)) {
    expandedRounds.value.delete(round)
  } else {
    expandedRounds.value.add(round)
  }
}
</script>

<template>
  <div class="race-schedule">
    <div class="schedule-header">
      <h3>📅 Race Schedule</h3>
    </div>
    
    <div class="schedule-list">
      <div 
        v-for="round in schedule"
        :key="round.round"
        :class="[
          'schedule-item',
          {
            'current': round.round === currentRound + 1,
            'completed': round.round < currentRound + 1,
            'upcoming': round.round > currentRound + 1
          }
        ]"
      >
        <div 
          class="round-info"
          @click="toggleRound(round.round)"
        >
          <div class="round-number">
            <span v-if="round.round < currentRound + 1">✅</span>
            <span v-else>{{ round.round }}</span>
          </div>
          <div class="round-details">
            <h4>Round {{ round.round }}</h4>
            <p>{{ round.distance }}m - {{ round.horses.length }} horses</p>
          </div>
          <div class="expand-icon" :class="{ expanded: expandedRounds.has(round.round) }">
            ▼
          </div>
        </div>
        
        <div 
          v-if="expandedRounds.has(round.round)"
          class="horses-list"
        >
          <div class="horses-grid">
            <div 
              v-for="horse in round.horses"
              :key="horse.id"
              class="horse-item"
            >
              <div 
                class="horse-color" 
                :style="{ backgroundColor: horse.color }"
              ></div>
              <span class="horse-name">{{ horse.name }}</span>
              <span class="horse-condition">{{ horse.condition }}/100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.race-schedule {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.schedule-header h3 {
  margin: 0 0 1rem 0;
  color: white;
  font-size: 1.25rem;
}

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.schedule-item {
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.schedule-item.completed {
  background: rgba(39, 174, 96, 0.2);
  border: 1px solid rgba(39, 174, 96, 0.3);
}

.schedule-item.current {
  background: rgba(241, 196, 15, 0.2);
  border: 1px solid rgba(241, 196, 15, 0.3);
  transform: scale(1.02);
  box-shadow: 0 4px 15px rgba(241, 196, 15, 0.3);
}

.schedule-item.upcoming {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.round-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.round-info:hover {
  background: rgba(255, 255, 255, 0.05);
}

.round-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.current .round-number {
  background: rgba(241, 196, 15, 0.3);
  animation: pulse-yellow 2s ease-in-out infinite;
}

.current .round-number::after {
  content: '🐎';
  position: absolute;
  font-size: 1.2rem;
}

.current .round-number span {
  opacity: 0;
}

.completed .round-number {
  background: rgba(39, 174, 96, 0.3);
}

.round-details {
  flex: 1;
  margin-left: 1rem;
}

.round-details h4 {
  margin: 0;
  color: white;
  font-size: 1rem;
}

.round-details p {
  margin: 0.25rem 0 0 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
}

.expand-icon {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  transition: transform 0.3s ease;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.horses-list {
  padding: 0 1rem 1rem 1rem;
  animation: slideDown 0.3s ease-out;
}

.horses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
}

.horse-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 0.875rem;
}

.horse-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.horse-name {
  color: white;
  font-weight: 500;
  flex: 1;
}

.horse-condition {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 300px;
  }
}

@keyframes pulse-yellow {
  0% {
    box-shadow: 0 0 0 0 rgba(241, 196, 15, 0.7);
  }
  
  70% {
    box-shadow: 0 0 0 10px rgba(241, 196, 15, 0);
  }
  
  100% {
    box-shadow: 0 0 0 0 rgba(241, 196, 15, 0);
  }
}
</style>
