<script setup>
import { ref, computed, onMounted } from 'vue';
import VueApexCharts from "vue3-apexcharts";

// Check for dark mode
const isDarkMode = ref(document.documentElement.classList.contains('dark'));

// Update dark mode status when theme changes
onMounted(() => {
  const observer = new MutationObserver(() => {
    isDarkMode.value = document.documentElement.classList.contains('dark');
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
});

const series = ref([
  {
    name: 'Datos Mensuales',
    data: [31, 40, 28, 51, 42, 109, 100, 80, 65, 75, 90, 110]
  }, 
]);

const chartOptions = computed(() => ({
  chart: {
    height: 350,
    type: 'area',
    foreColor: isDarkMode.value ? '#ffffff' : '#333333',
    toolbar: {
      show: true,
      offsetX: 0,
      offsetY: 0,
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false
      },
      export: {
        csv: {
          filename: undefined,
          columnDelimiter: ',',
          headerCategory: 'Mes',
          headerValue: 'Valor',
        },
        svg: {
          filename: undefined,
        },
        png: {
          filename: 'grafico-datos-mensuales',
          quality: 1
        }
      },
      autoSelected: 'download'
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 2,
      opacity: 0.2
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  colors: ['#465FFF', '#9CB9FF'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.3,
      stops: [0, 90, 100]
    }
  },
  markers: {
    size: 0,
    hover: {
      size: 5,
      sizeOffset: 3
    }
  },
  grid: {
    borderColor: isDarkMode.value ? '#4B5563' : '#E5E7EB',
    xaxis: {
      lines: {
        show: false
      }
    }
  },
  xaxis: {
    type: 'category',
    categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  },
  tooltip: {
    enabled: true,
    shared: true,
    followCursor: true,
    intersect: false,
    theme: isDarkMode.value ? 'dark' : 'light',
    y: {
      formatter: function(value) {
        return value.toFixed(0);
      }
    },
    marker: {
      show: true
    }
  }
}));
</script>

<template>
  <div id="chart">
    <VueApexCharts type="area" height="350" :options="chartOptions" :series="series"></VueApexCharts>
  </div>
</template>

<style scoped>
/* Add custom styles to fix the dropdown menu visibility */
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