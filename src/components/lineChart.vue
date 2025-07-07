<template>
  <div class="chart-container" style="position: relative; height:300px; width:100%;">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import { nextTick } from 'vue'

Chart.register(...registerables)

export default {
  name: 'LineChart',
  props: {
    labels: {
      type: Array,
      required: true
    },
    datasets: {
      type: Array,
      required: true
    },
    stepSize: {
      type: Number,
      default: 1
    },
    XTitle: {
      type: String,
      default: ''
    },
    YTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chartInstance: null,
      latestLabels: [],
      latestDatasets: [],
      ticking: false,
    }
  },
  watch: {
    labels(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        this.safeRender()
      }
    },
    datasets(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        this.safeRender()
      }
    },
    stepSize(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.safeRender()
      }
    }
  },
  methods: {
    safeRender() {
      this.latestLabels = Array.isArray(this.labels) ? [...this.labels] : []
      this.latestDatasets = (this.datasets || []).map(ds => ({
        ...ds,
        fill: true,
        tension: 0.4,
        pointRadius: 2
      }))

      if (!this.ticking) {
        this.ticking = true
        setTimeout(() => {
          this.renderChart(this.latestLabels, this.latestDatasets)
          this.ticking = false
        }, 200)  // 200ms 節流間隔，可調整
      }
    },

    renderChart(labels, datasets) {
      nextTick(() => {
        try {
          if (!this.$refs.canvas || !Array.isArray(labels) || !Array.isArray(datasets)) return

          if (!this.chartInstance) {
            this.chartInstance = new Chart(this.$refs.canvas, {
              type: 'line',
              data: { labels, datasets },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                  mode: 'nearest',
                  axis: 'x',
                  intersect: false
                },
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                    labels: { font: { size: 14 } }
                  },
                  tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false
                  }
                },
                scales: {
                  x: {
                    display: true,
                    title: {
                      display: !!this.XTitle,
                      text: this.XTitle
                    },
                    grid: { display: false },
                    ticks: {
                      autoSkip: false,
                      callback: (val, index) => {
                        if (this.stepSize <= 0 || !labels[index]) return labels[index] || ''
                        return index % this.stepSize === 0 ? labels[index] : ''
                      },
                      maxRotation: 0,
                      minRotation: 0
                    }
                  },
                  y: {
                    display: true,
                    title: {
                      display: !!this.YTitle,
                      text: this.YTitle
                    },
                    grid: {
                      display: true,
                      color: '#eee'
                    },
                    beginAtZero: true
                  }
                }
              }
            })
          } else {
            this.chartInstance.data.labels = labels
            this.chartInstance.data.datasets = datasets
            this.chartInstance.update()
          }
        } catch (error) {
          console.error('renderChart 發生錯誤:', error)
        }
      })
    }
  },
  mounted() {
    this.safeRender()
  },
  beforeUnmount() {
    if (this.chartInstance) {
      this.chartInstance.destroy()
    }
  }
}
</script>

<style scoped>
.chart-container {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}
</style>
