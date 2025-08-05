<script setup lang="ts">
import type { RaceResult } from '@/types'

interface Props {
  results: RaceResult[]
  round: number
  distance: number
}

defineProps<Props>()

const getPositionEmoji = (position: number): string => {
  switch (position) {
    case 1: return '🥇'
    case 2: return '🥈'
    case 3: return '🥉'
    default: return `${position}.`
  }
}
</script>

<template>
  <div class="race-results-table">
    <div class="table-header">
      <h4>🏆 Round {{ round }} Results ({{ distance }})</h4>
    </div>

    <div class="results-grid">
      <div 
        v-for="result in results" 
        :key="result.horseId"
        :class="['result-row', `position-${result.position}`]"
      >
        <div class="position">
          {{ getPositionEmoji(result.position) }}
        </div>
        
        <div class="horse-info">
          <div 
            class="horse-color" 
            :style="{ backgroundColor: result.color }"
          ></div>
          <span class="horse-name">{{ result.horse }}</span>
        </div>
        
        <div class="time">
          {{ result.time }}s
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.race-results-table {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.table-header h4 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
  text-align: center;
}

.results-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.result-row {
  display: grid;
  grid-template-columns: 60px 1fr 80px;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.result-row:hover {
  transform: translateX(4px);
}

.position-1 {
  background: linear-gradient(135deg, #f7dc6f 0%, #f4d03f 100%);
  box-shadow: 0 2px 10px rgba(247, 220, 111, 0.4);
}

.position-2 {
  background: linear-gradient(135deg, #d5dbdb 0%, #aeb6bf 100%);
  box-shadow: 0 2px 10px rgba(213, 219, 219, 0.4);
}

.position-3 {
  background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
  box-shadow: 0 2px 10px rgba(230, 126, 34, 0.4);
}

.result-row:not(.position-1):not(.position-2):not(.position-3) {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.position {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.horse-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.horse-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.horse-name {
  font-weight: 600;
  color: #2c3e50;
}

.time {
  font-weight: bold;
  color: #2c3e50;
  text-align: right;
  font-family: 'Courier New', monospace;
}
</style>
