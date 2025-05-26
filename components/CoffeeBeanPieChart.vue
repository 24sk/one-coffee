<script setup lang="ts">
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, type ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import type { Bean } from '~/types/recommend';

ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const props = defineProps<{
  beans: Bean[];
}>();

const chartData = computed(() => ({
  labels: props.beans.map((bean) => bean.origin),
  datasets: [
    {
      data: props.beans.map((bean) => bean.ratio),
      backgroundColor: ['#C0D6DF', '#AEC3B0', '#FFD6A5', '#FFADAD', '#CAFFBF', '#B5EAEA'],
    },
  ],
}));

const chartOptions: ChartOptions<'pie'> = {
  plugins: {
    datalabels: {
      color: '#333',
      font: { weight: 'bold' },
      formatter: (value: number) => `${value}%`,
    },
    legend: {
      position: 'top',
    },
  },
};
</script>

<template>
  <Pie :data="chartData" :options="chartOptions" :plugins="[ChartDataLabels]" />
</template>
