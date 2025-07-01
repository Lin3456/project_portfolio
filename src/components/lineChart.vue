<template>
  <div class="chart-container" style="position: relative; height:300px; width:100%;">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  name: 'LineChart',
  props: {
    labels: { // X 軸
      type: Array,
      required: true
    }, 
    data: { // 對應的 Y 值
      type: Array,
      required: true
    },
    label: { // 線條說明文字
      type: String,
      default: ''
    },
    color: { // 線條顏色
      type: String,
      default: '#2196f3'
    },
    bgColor: { // 線條區域底色
      type: String,
      default: 'rgba(33, 150, 243, 0.2)'
    },
    stepSize: { // X 軸顯示間隔
      type: Number,
      default: 1
    },
    XTitle: { // X軸說明
      type: String,
      default: '',
    },
    YTitle: { // Y軸說明
      type: String,
      default: '',
    }
  },
  data() {
    return {
      chartInstance: null,
    }
  },
  watch: {
    labels: 'renderChart',
    data: 'renderChart',
    label: 'renderChart',
    color: 'renderChart',
    bgColor: 'renderChart',
    stepSize: 'renderChart',
  },
  methods: {
    renderChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy()
      }

      const chartData = {
        labels: this.labels,
        datasets: [
          {
            label: this.label,
            data: this.data,
            borderColor: this.color,
            backgroundColor: this.bgColor,
            fill: true,
            tension: 0.4,
            pointRadius: 2,
          },
        ],
      }

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false,
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { font: { size: 14 } },
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: !this.XTitle,
              text: this.XTitle,
            },
            grid: { display: false },
            ticks: {
              autoSkip: false,
              callback: (val, index) => {
                return index % this.stepSize === 0 ? this.labels[index] : '';
              },
              maxRotation: 0,
              minRotation: 0,
            },
          },
          y: {
            display: true,
            title: {
              display: !this.XTitle,
              text: this.XTitle,
            },
            grid: {
              display: true,
              color: '#eee',
            },
            beginAtZero: true,
          },
        },
      }

      this.chartInstance = new Chart(this.$refs.canvas, {
        type: 'line',
        data: chartData,
        options: chartOptions,
      })
    },
  },
  beforeUnmount() {
    if (this.chartInstance) {
      this.chartInstance.destroy()
    }
  },
  mounted() {
    this.renderChart()
  },
}
</script>

<style scoped>
.chart-container {
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}
</style>
