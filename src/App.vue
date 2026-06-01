<template>
  <SiteHeader v-if="route.name !== 'admin'" />
  <main>
    <RouterView />
  </main>
  <SiteFooter v-if="route.name !== 'admin'" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'

const route = useRoute()
</script>
