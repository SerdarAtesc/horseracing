<script setup lang="ts">
import { watch, ref } from 'vue'
import type { Horse } from '@/types'
import HorseIcon from '../atoms/HorseIcon.vue'

interface Props {
  horse: Horse
  position: number
  isRacing: boolean
  laneNumber: number
}

const props = defineProps<Props>()
const isTransitioning = ref(true)

watch(() => props.position, (newPos, oldPos) => {
  if (newPos === 0 && oldPos > 0) {
    isTransitioning.value = false
    setTimeout(() => {
      isTransitioning.value = true
    }, 50)
  }
})
</script>

<template>
  <div class="race-lane">
    <div class="lane-number">{{ laneNumber }}</div>
    <div class="track-section">
      <div class="track-surface">
        <div class="track-lines"></div>
        <div 
          class="horse-silhouette"
          :class="{ 'no-transition': !isTransitioning }"
          :style="{ 
            left: `${position}%`,
            backgroundColor: horse.color
          }"
        >
          <HorseIcon :size="40" :color="horse.color" />
        </div>
      </div>
      <div class="finish-line"></div>
    </div>
    <div class="horse-info">
      <div class="horse-name">{{ horse.name }}</div>
      <div class="horse-position">{{ Math.round(position) }}%</div>
    </div>
  </div>
</template>

<style scoped>
.race-lane {
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  height: 80px;
  background: #f5f5f5;
  border-bottom: 2px dashed #999;
  position: relative;
}

.lane-number {
  width: 60px;
  height: 100%;
  background: #4a7c59;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  border-right: 2px solid #333;
}

.track-section {
  flex: 1;
  height: 100%;
  position: relative;
  background: #e8e8e8;
  overflow: hidden;
}

.track-surface {
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(to right, #e8e8e8 0%, #f0f0f0 50%, #e8e8e8 100%);
}

.track-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 48px,
    #ccc 48px,
    #ccc 52px
  );
  opacity: 0.5;
}

.horse-silhouette {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 40px;
  background: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border-radius: 8px;
  transition: left 0.5s ease-out;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 2;
}

.horse-silhouette.no-transition {
  transition: none !important;
}

.horse-silhouette.no-transition {
  transition: none !important;
}

.finish-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 8px;
  background: repeating-linear-gradient(
    0deg,
    #ff4444,
    #ff4444 8px,
    #ffffff 8px,
    #ffffff 16px
  );
  z-index: 3;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.2);
}

.horse-info {
  width: 120px;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-left: 2px solid #ddd;
}

.horse-name {
  font-weight: bold;
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 4px;
}

.horse-position {
  font-size: 0.8rem;
  color: #666;
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 12px;
}

/* Racing animation */
.race-lane:nth-child(odd) .track-surface {
  background: linear-gradient(to right, #e0e0e0 0%, #e8e8e8 50%, #e0e0e0 100%);
}

@media (max-width: 768px) {
  .race-lane {
    height: 60px;
  }
  
  .lane-number {
    width: 40px;
    font-size: 1.2rem;
  }
  
  .horse-silhouette {
    width: 40px;
    height: 30px;
    font-size: 1.5rem;
  }
  
  .horse-info {
    width: 80px;
    padding: 0 0.5rem;
  }
  
  .horse-name {
    font-size: 0.8rem;
  }
  
  .horse-position {
    font-size: 0.7rem;
  }
}
</style>
