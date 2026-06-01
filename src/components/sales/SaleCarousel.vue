<template>
  <div style="position:relative; overflow:hidden; border-radius:var(--radius-lg); height:100%;">
    <!-- Track -->
    <div
      :style="`display:flex; height:100%; transition:transform 280ms ease; transform:translateX(-${current * 100}%)`"
    >
      <div
        v-for="src in photos"
        :key="src"
        style="flex:0 0 100%; height:100%; background-size:cover; background-position:center;"
        :style="`background-image:linear-gradient(rgba(6,41,66,0.05),rgba(6,41,66,0.4)),url('${src}')`"
      ></div>
    </div>

    <!-- Arrows -->
    <button v-if="photos.length > 1" @click.stop="prev" class="car-btn" style="left:8px;">‹</button>
    <button v-if="photos.length > 1" @click.stop="next" class="car-btn" style="right:8px;">›</button>

    <!-- Dots -->
    <div v-if="photos.length > 1" style="position:absolute; bottom:38px; left:50%; transform:translateX(-50%); display:flex; gap:5px;">
      <span
        v-for="(_, i) in photos" :key="i"
        style="width:6px; height:6px; border-radius:50%; display:inline-block; transition:background 200ms;"
        :style="{ background: i === current ? 'white' : 'rgba(255,255,255,0.45)' }"
      ></span>
    </div>

    <!-- Photo count badge -->
    <div v-if="photos.length > 1" style="position:absolute; bottom:14px; right:14px; font-family:var(--font-mono); font-size:9px; color:rgba(255,255,255,0.7); letter-spacing:0.1em;">
      {{ photos.length }} PHOTOS
    </div>

    <!-- Slots for corner/cap labels -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{ photos: string[] }>()
const current = ref(0)
function next() { current.value = (current.value + 1) % props.photos.length }
function prev() { current.value = (current.value - 1 + props.photos.length) % props.photos.length }
</script>

<style scoped>
.car-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.85);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  padding: 0;
}
</style>
