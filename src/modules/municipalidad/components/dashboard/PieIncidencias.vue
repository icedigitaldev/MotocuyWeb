<script setup>
import { ref } from 'vue'
import ApexCharts from 'vue3-apexcharts'

const chartData = {
  series: [120, 45],
  labels: ['Unidades activas', 'Unidades inactivas']
}

const chart = ref(null)

const apexOptions = {
  chart: {
    type: 'donut',
    width: 380
  },
  colors: ['#3C50E0', '#8FD0EF'],
  labels: chartData.labels,
  legend: {
    show: false,
    position: 'bottom'
  },
  legend: {
    show: false,
    position: 'top'
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
        labels: {
          show: true,
          value: {
            show: true,
            fontSize: '20px',
            color: '#111',
            offsetY: 10,
            formatter: function (val) {
              return `${val} `
            }
          },
          total: {
            show: true,
            formatter: function () {
              return chartData.series.reduce((a, b) => a + b, 0) + ' '
            }
          }
        }
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false,
    y: {
      formatter: function (val) {
        return `${val} unidades`
      }
    }
  },
  responsive: [
    {
      breakpoint: 750,
      options: {
        chart: {
          width: 300
        }
      }
    }
  ]
}
</script>

<template>
  <div id="chartThree" class="mx-auto flex justify-center">
    <ApexCharts
      type="donut"
      width="350"
      :options="apexOptions"
      :series="chartData.series"
      ref="chart"
    />
  </div>
</template>
