<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { loadGoogleMapsAPI, initializeMap, emergencyMarker, traceRouteToEmergency } from '@/services/maps_service.js';
import { logError } from '@/utils/logger.js';

const mapContainer = ref(null);
const isLoading = ref(true);
const isRouteLoading = ref(false);
const map = ref(null);
let metaTag = null;

onMounted(async () => {
  metaTag = document.createElement('meta');
  metaTag.name = 'google';
  metaTag.content = 'notranslate';
  document.head.appendChild(metaTag);

  try {
    await loadGoogleMapsAPI();
    map.value = await initializeMap(mapContainer.value);
  } catch (error) {
    logError("Error al configurar el mapa: " + error.message);
  } finally {
    isLoading.value = false;
  }
});

watch(() => emergencyMarker, () => {
  if (emergencyMarker && map.value) {
    isRouteLoading.value = true;
    traceRouteToEmergency()
        .finally(() => { isRouteLoading.value = false; });
  }
}, { deep: true });

onUnmounted(() => {
  if (metaTag) {
    document.head.removeChild(metaTag);
  }
});
</script>

<template>
  <div class="absolute inset-0 w-full h-full">
    <div class="relative w-full h-full">
      <div v-if="isLoading || isRouteLoading" class="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-10">
        <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div ref="mapContainer" class="w-full h-full"></div>
    </div>
  </div>
</template>

<style scoped>
</style>