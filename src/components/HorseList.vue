<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import HorseCard from './atoms/HorseCard.vue'
import BaseButton from './atoms/BaseButton.vue'

const store = useStore(key)

const horses = computed(() => {
  return [...store.state.horses].sort(() => Math.random() - 0.5)
})
const isRacing = computed(() => store.state.isRacing)

const generateHorses = () => {
  store.dispatch('generateHorses')
}
</script>

<template>
  <div class="horse-list">
    <div class="list-header">
      <h3>Available Horses ({{ horses.length }})</h3>
      <BaseButton 
        @click="generateHorses"
        :disabled="isRacing"
        variant="primary"
        size="small"
      >
        Regenerate Horses
      </BaseButton>
    </div>
    
    <div class="horses-container">
      <HorseCard 
        v-for="horse in horses"
        :key="horse.id"
        :horse="horse"
        :show-stats="true"
        :compact="true"
      />
    </div>
  </div>
</template>

<style scoped>
.horse-list {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 1.5rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.list-header h3 {
  margin: 0;
  color: white;
  font-size: 1.25rem;
}

.horses-container {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.horses-container::-webkit-scrollbar {
  width: 6px;
}

.horses-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.horses-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.horses-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
