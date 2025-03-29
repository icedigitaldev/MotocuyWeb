<script setup>

</script>

<template>
  <GmapMap
      :center="{ lat: 40.7128, lng: -74.0060 }"
      :zoom="12"
      style="width: 100%; height: 400px"
  >
    <GmapMarker :position="{ lat: 40.7128, lng: -74.0060 }"/>
  </GmapMap>
</template>

<style scoped>

</style>