<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  loading: false
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button 
    :class="[
      'base-button',
      `variant-${variant}`,
      `size-${size}`,
      { 'loading': loading }
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="spinner"></span>
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.base-button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Variants */
.variant-primary {
  background: rgba(52, 152, 219, 0.8);
  color: white;
}

.variant-primary:not(:disabled):hover {
  background: rgba(41, 128, 185, 0.9);
}

.variant-secondary {
  background: rgba(149, 165, 166, 0.8);
  color: white;
}

.variant-secondary:not(:disabled):hover {
  background: rgba(127, 140, 141, 0.9);
}

.variant-success {
  background: rgba(39, 174, 96, 0.8);
  color: white;
}

.variant-success:not(:disabled):hover {
  background: rgba(34, 153, 84, 0.9);
}

.variant-danger {
  background: rgba(231, 76, 60, 0.8);
  color: white;
}

.variant-danger:not(:disabled):hover {
  background: rgba(192, 57, 43, 0.9);
}

/* Sizes */
.size-small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.size-medium {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.size-large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* Loading */
.loading {
  pointer-events: none;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
