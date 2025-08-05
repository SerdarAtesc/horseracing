
<script setup lang="ts">
interface Props {
  color?: string
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  color: 'white',
  size: 24
})

const getFilterForColor = (color: string) => {
  if (color === 'white') return 'brightness(0) invert(1)'
  if (color === 'black') return 'brightness(0)'
  return `brightness(0) saturate(100%) ${getColorFilter(color)}`
}

const getColorFilter = (color: string) => {
  if (color.includes('hsl')) {
    return `hue-rotate(${extractHue(color)}deg) saturate(150%)`
  }
  return 'invert(1)'
}

const extractHue = (hslColor: string) => {
  const match = hslColor.match(/hsl\((\d+)/)
  return match ? match[1] : '0'
}
</script>

<template>
  <img 
    src="../../assets/horse.svg" 
    alt="Horse" 
    class="horse-icon"
    :style="{ 
      width: `${size}px`, 
      height: `${size}px`,
      filter: getFilterForColor(color)
    }" 
  />
</template>

<style scoped>
.horse-icon {
  display: block;
}
</style>

