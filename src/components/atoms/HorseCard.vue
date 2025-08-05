<script setup lang="ts">
import type { Horse } from '@/types'
import HorseIcon from './HorseIcon.vue'

interface Props {
  horse: Horse
  showStats?: boolean
  compact?: boolean
}

withDefaults(defineProps<Props>(), {
  showStats: false,
  compact: false
})
</script>

<template>
  <div :class="['horse-card', { compact }]">
    <div class="horse-header">
      <div class="horse-avatar" :style="{ backgroundColor: horse.color }">
        <HorseIcon :size="compact ? 18 : 24" color="white" />
      </div>
      <div class="horse-info">
        <h4 class="horse-name">{{ horse.name }}</h4>
        <div class="horse-id">#{{ horse.id }}</div>
      </div>
      <div class="horse-condition">
        {{ horse.condition }}%
      </div>
    </div>
    
    <div v-if="showStats && !compact" class="horse-stats">
      <div class="stat">
        <span class="stat-label">Condition</span>
        <div class="stat-bar">
          <div 
            class="stat-fill" 
            :style="{ 
              width: `${horse.condition}%`,
              backgroundColor: horse.condition > 80 ? '#27ae60' : horse.condition > 60 ? '#f39c12' : '#e74c3c'
            }"
          ></div>
        </div>
        <span class="stat-value">{{ horse.condition }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.horse-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.horse-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.horse-card.compact {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

.horse-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.horse-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.compact .horse-avatar {
  width: 30px;
  height: 30px;
  font-size: 1rem;
}

.horse-info {
  flex: 1;
}

.horse-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
}

.compact .horse-name {
  font-size: 0.875rem;
}

.horse-id {
  font-size: 0.75rem;
  color: #7f8c8d;
  margin-top: 0.25rem;
}

.horse-condition {
  margin-left: auto;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  color: #2c3e50;
  min-width: 45px;
  text-align: center;
}

.compact .horse-condition {
  font-size: 0.75rem;
  padding: 0.2rem 0.4rem;
  min-width: 40px;
}

.horse-stats {
  margin-top: 0.75rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.75rem;
  color: #7f8c8d;
  min-width: 60px;
}

.stat-bar {
  flex: 1;
  height: 6px;
  background: #ecf0f1;
  border-radius: 3px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.stat-value {
  font-size: 0.75rem;
  font-weight: 600;
  color: #2c3e50;
  min-width: 35px;
  text-align: right;
}

.horse-image {
  width: 24px;
  height: 24px;
}

.compact .horse-image {
  width: 18px;
  height: 18px;
}
</style>
