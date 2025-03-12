<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { loadGoogleMapsAPI, initializeMap } from '@/services/maps_service.js';
import { logError } from '@/utils/logger.js';

const mapContainer = ref(null);
const isLoading = ref(true);
const map = ref(null);
let metaTag = null;

onMounted(async () => {
  // Crear meta tag para evitar traducción
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

onUnmounted(() => {
  // Eliminar el meta tag al salir de la vista
  if (metaTag) {
    document.head.removeChild(metaTag);
  }
});
</script>

<template>
  <div class="absolute inset-0 w-full h-full">
    <div class="relative w-full h-full">
      <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-10">
        <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div ref="mapContainer" class="w-full h-full"></div>
    </div>
  </div>
</template>

<style scoped>
</style>