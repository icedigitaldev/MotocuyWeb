<script setup>
import { ref, computed, onMounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

// 1) Verificamos si el modo oscuro está activo inicialmente
const isDarkMode = ref(document.documentElement.classList.contains('dark'))

// 2) Observamos cambios en la clase de <html> para detectar cuando el tema cambia
onMounted(() => {
  const observer = new MutationObserver(() => {
    isDarkMode.value = document.documentElement.classList.contains('dark')
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

// 3) Datos de la gráfica
const series = ref([
  {
    name: 'Atendidas',
    data: [44, 55]
  },
  {
    name: 'Falsas Alarmas',
    data: [30, 40]
  }
])

// 4) Configuramos la gráfica basándonos en si está en modo oscuro o claro
const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    height: 350,
    // Ajustamos el color del texto de la gráfica según el tema
    foreColor: isDarkMode.value ? '#ffffff' : '#333333'
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 5,
      borderRadiusApplication: 'end'
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Pasajeros', 'Conductores']
  },
  yaxis: {
    title: {
      text: 'Cantidad'
    }
  },
  fill: {
    opacity: 1
  },
  // Ajustamos el tooltip según el tema
  tooltip: {
    theme: isDarkMode.value ? 'dark' : 'light',
    y: {
      formatter: function (val) {
        return val + ' casos'
      }
    }
  },
  // Ajustamos el color de la cuadrícula según el tema
  grid: {
    borderColor: isDarkMode.value ? '#4B5563' : '#E5E7EB',
    xaxis: {
      lines: {
        show: false
      }
    }
  }
}))
</script>

<template>
  <div id="chart">
    <VueApexCharts type="bar" height="350" :options="chartOptions" :series="series" />
  </div>
</template>

<style scoped>
/* Ajuste de estilos para el menú de descarga de ApexCharts */
:deep(.apexcharts-menu) {
  background: #fff !important;
  color: #333 !important;
}

:deep(.apexcharts-menu-item) {
  color: #333 !important;
}

:deep(.apexcharts-menu-item:hover) {
  background: #f8f9fa !important;
}

.dark :deep(.apexcharts-menu) {
  background: #374151 !important;
  color: #fff !important;
  border-color: #4B5563 !important;
}

.dark :deep(.apexcharts-menu-item) {
  color: #fff !important;
}

.dark :deep(.apexcharts-menu-item:hover) {
  background: #4B5563 !important;
}
</style>
