<template>
    <div class="flex justify-center items-center h-screen">
      <div class="max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Bar Graph Visualization</h2>
        <div class="relative bg-gray-100 rounded-lg overflow-hidden">
          <div class="absolute top-0 left-0 h-full bg-blue-500" :style="{ width: `${barWidth(index)}%` }" v-for="(value, index) in data" :key="index"></div>
          <div class="flex justify-between px-4 py-2 text-gray-700">
            <span v-for="(label, index) in labels" :key="index">{{ label }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name:'bar_chart',
    data() {
      return {
        data: [40, 60, 80, 20, 90], // Sample data for the bars
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'] // Labels for the bars
      };
    },
    methods: {
      barWidth(index) {
        const total = this.data.reduce((acc, curr) => acc + curr, 0);
        return (this.data[index] / total) * 100;
      }
    }
  };
  </script>
  
  <style>
  /* No custom styles needed */
  </style>
  