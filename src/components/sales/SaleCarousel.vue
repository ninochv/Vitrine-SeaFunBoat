<template>
  <div style="position:relative; overflow:hidden; border-radius:var(--radius-lg); height:100%;">
    <!-- Track -->
    <div
      :style="`display:flex; height:100%; transition:transform 280ms ease; transform:translateX(-${current * 100}%)`"
    >
      <div
        v-for="src in photos"
        :key="src"
        style="flex:0 0 100%; height:100%; background-size:cover; background-position:center; cursor:zoom-in;"
        :style="`background-image:linear-gradient(rgba(6,41,66,0.05),rgba(6,41,66,0.4)),url('${src}')`"
        @click="openLightbox"
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

    <!-- Photo count + zoom hint -->
    <div style="position:absolute; bottom:14px; right:14px; display:flex; align-items:center; gap:8px;">
      <span style="font-family:var(--font-mono); font-size:9px; color:rgba(255,255,255,0.7); letter-spacing:0.1em;">
        {{ photos.length > 1 ? photos.length + ' PHOTOS' : '' }}
      </span>
      <span style="font-size:15px; color:rgba(255,255,255,0.7);" title="Agrandir">⤢</span>
    </div>

    <!-- Slots pour corner/cap -->
    <slot />
  </div>

  <!-- Lightbox -->
  <Teleport to="body">
    <div v-if="lbOpen" class="lb-backdrop" @click.self="closeLightbox">
      <button class="lb-close" @click="closeLightbox" aria-label="Fermer">✕</button>

      <button v-if="photos.length > 1" class="lb-arrow lb-arrow--left" @click.stop="lbPrev">‹</button>
      <button v-if="photos.length > 1" class="lb-arrow lb-arrow--right" @click.stop="lbNext">›</button>

      <div class="lb-inner">
        <img :src="photos[lbIndex]" class="lb-img" />
        <div v-if="photos.length > 1" class="lb-counter">{{ lbIndex + 1 }} / {{ photos.length }}</div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{ photos: string[] }>()

const current  = ref(0)
function next() { current.value = (current.value + 1) % props.photos.length }
function prev() { current.value = (current.value - 1 + props.photos.length) % props.photos.length }

const lbOpen  = ref(false)
const lbIndex = ref(0)

function openLightbox() {
  lbIndex.value = current.value
  lbOpen.value = true
  document.body.style.overflow = 'hidden'
}
function closeLightbox() {
  lbOpen.value = false
  document.body.style.overflow = ''
}
function lbNext() { lbIndex.value = (lbIndex.value + 1) % props.photos.length }
function lbPrev() { lbIndex.value = (lbIndex.value - 1 + props.photos.length) % props.photos.length }

function onKey(e: KeyboardEvent) {
  if (!lbOpen.value) return
  if (e.key === 'Escape')     closeLightbox()
  if (e.key === 'ArrowRight') lbNext()
  if (e.key === 'ArrowLeft')  lbPrev()
}
onMounted(()   => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.car-btn {
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(255,255,255,0.85); border: none; border-radius: 50%;
  width: 30px; height: 30px; cursor: pointer; font-size: 16px;
  line-height: 30px; text-align: center; padding: 0;
}

/* Lightbox */
.lb-backdrop {
  position: fixed; inset: 0; z-index: 300;
  background: rgba(4,20,36,0.96); backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
}
.lb-close {
  position: absolute; top: 20px; right: 24px;
  background: none; border: none; color: #fff;
  font-size: 26px; cursor: pointer; opacity: 0.7; transition: opacity 0.2s; z-index: 1;
}
.lb-close:hover { opacity: 1; }
.lb-arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(255,255,255,0.12); border: none; color: #fff;
  font-size: 36px; width: 52px; height: 52px; border-radius: 50%;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: background 0.2s; z-index: 1;
}
.lb-arrow:hover { background: rgba(255,255,255,0.22); }
.lb-arrow--left  { left: 20px; }
.lb-arrow--right { right: 20px; }
.lb-inner {
  display: flex; flex-direction: column; align-items: center;
  max-width: min(92vw, 1200px); max-height: 90vh;
}
.lb-img {
  max-width: 100%; max-height: 82vh;
  object-fit: contain; border-radius: 8px;
}
.lb-counter {
  margin-top: 14px;
  font-family: var(--font-mono); font-size: 11px;
  letter-spacing: 0.12em; color: rgba(255,255,255,0.5);
  text-transform: uppercase;
}
</style>
