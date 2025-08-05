<script setup lang="ts">
interface Props {
  size?: 'small' | 'medium' | 'large'
  color?: string
}

withDefaults(defineProps<Props>(), {
  size: 'medium',
  color: '#3498db'
})
</script>

<template>
  <div :class="['spinner', `spinner-${size}`]" :style="{ borderTopColor: color }"></div>
</template>

<style scoped>
.spinner {
  border: 3px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid;
  animation: spin 1s linear infinite;
}

.spinner-small {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

.spinner-medium {
  width: 40px;
  height: 40px;
}

.spinner-large {
  width: 60px;
  height: 60px;
  border-width: 4px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>