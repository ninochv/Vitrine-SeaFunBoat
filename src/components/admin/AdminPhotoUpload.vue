<template>
  <div>
    <label class="lbl">Photos (max {{ maxPhotos }})</label>
    <div
      v-if="modelValue.length < maxPhotos"
      class="photo-drop"
      @click="(fileInput as HTMLInputElement).click()"
    >
      <div style="font-size:28px; margin-bottom:8px;">📷</div>
      <div style="font-size:14px; font-weight:500;">Cliquez pour ajouter des photos</div>
      <div style="font-size:12px; margin-top:4px; font-family:var(--font-mono); color:var(--ink-soft);">
        JPG, PNG — max {{ maxPhotos }} photos · La première sera la photo principale
      </div>
    </div>
    <input ref="fileInput" type="file" accept="image/*" multiple style="display:none;" @change="handleFiles" />


    <div v-if="modelValue.length" class="photo-grid">
      <div v-for="(p, i) in modelValue" :key="i" class="photo-item">
        <img :src="p.src" :alt="`Photo ${i + 1}`" />
        <button type="button" class="rm" @click="remove(i)">×</button>
        <span v-if="i === 0" class="main-badge">PRINCIPALE</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
export interface PhotoEntry { src: string; name: string }

const fileInput = ref<HTMLInputElement | null>(null)

const props = defineProps<{
  modelValue: PhotoEntry[]
  maxPhotos?: number
}>()
const emit = defineEmits<{ 'update:modelValue': [photos: PhotoEntry[]] }>()

const maxPhotos = props.maxPhotos ?? 10

function remove(i: number) {
  const next = [...props.modelValue]
  next.splice(i, 1)
  emit('update:modelValue', next)
}

function handleFiles(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files ?? [])
  const remaining = maxPhotos - props.modelValue.length
  files.slice(0, remaining).forEach((file) => {
    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const maxW = 1200
        const scale = Math.min(1, maxW / img.width)
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
        emit('update:modelValue', [...props.modelValue, { src: canvas.toDataURL('image/jpeg', 0.82), name: file.name }])
      }
      img.src = ev.target!.result as string
    }
    reader.readAsDataURL(file)
  });
  (e.target as HTMLInputElement).value = ''
}
</script>

<style scoped>
.photo-drop { border:2px dashed var(--rule); border-radius:var(--radius); padding:28px; text-align:center; cursor:pointer; color:var(--ink-soft); transition:border-color 150ms; }
.photo-drop:hover { border-color:var(--ocean); }
.photo-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:8px; margin-top:12px; }
.photo-item { position:relative; aspect-ratio:4/3; border-radius:8px; overflow:hidden; background:var(--sky); }
.photo-item img { width:100%; height:100%; object-fit:cover; }
.rm { position:absolute; top:4px; right:4px; background:rgba(0,0,0,0.6); color:white; border:none; border-radius:50%; width:22px; height:22px; cursor:pointer; font-size:13px; line-height:22px; text-align:center; padding:0; }
.main-badge { position:absolute; bottom:4px; left:4px; background:var(--rust); color:white; font-size:9px; padding:2px 6px; border-radius:4px; font-family:var(--font-mono); letter-spacing:0.08em; }
.lbl { display:block; font-family:var(--font-mono); font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:var(--ink-soft); margin-bottom:6px; }
</style>
