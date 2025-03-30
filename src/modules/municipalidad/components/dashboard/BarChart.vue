<script setup>
import { ref, computed, onMounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const isDarkMode = ref(document.documentElement.classList.contains('dark'))

onMounted(() => {
  const observer = new MutationObserver(() => {
    isDarkMode.value = document.documentElement.classList.contains('dark')
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

const series = ref([
  {
    name: 'Tiempo de respuesta',
    data: [4.5, 3.2, 5.1, 2.8, 6.3, 3.9, 4.7, 5.5, 2.3, 3.8] // horas
  }
])

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    height: 380,
    foreColor: isDarkMode.value ? '#ffffff' : '#333333'
  },
  plotOptions: {
    bar: {
      barHeight: '100%',
      distributed: true,
      horizontal: true,
      dataLabels: {
        position: 'bottom'
      }
    }
  },
  legend: {
    show: false
  },
  colors: ['#33b2df'], 
  dataLabels: {
    enabled: false,
    textAnchor: 'start',
    style: {
      colors: ['#fff']
    },
    formatter: function (val, opt) {
      return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val.toFixed(1) + ' hrs'
    },
    offsetX: 0,
    dropShadow: {
      enabled: true
    }
  },
  stroke: {
    width: 1,
    colors: ['#fff']
  },
  xaxis: {
    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    title: {
      text: 'Cantidad'
    }
  },
  yaxis: {
    labels: {
      show: true,
      formatter: function(val) {
        return val + ' hrs'
      }
    },
    title: {
      text: 'Tiempo (Horas)',
      style: {
        fontSize: '14px'
      }
    }
  },
  tooltip: {
    theme: isDarkMode.value ? 'dark' : 'light',
    x: {
      show: false
    },
    y: {
      title: {
        formatter: function () {
          return 'Tiempo: '
        }
      },
      formatter: function(val) {
        return val + ' horas'
      }
    }
  },
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
    <VueApexCharts type="bar" height="380" :options="chartOptions" :series="series" />
  </div>
</template>

<style scoped>
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
