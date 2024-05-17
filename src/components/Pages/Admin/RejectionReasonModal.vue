<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white p-6 rounded-md shadow-md w-96">
        <h2 class="text-lg font-bold mb-4">Rejection Reason</h2>
        <textarea v-model="reason" rows="4" class="w-full p-2 border rounded-md" placeholder="Enter rejection reason"></textarea>
        <div class="flex justify-end mt-4">
          <button @click="close" class="px-4 py-2 bg-gray-300 rounded-md mr-2">Cancel</button>
          <button @click="submit" class="px-4 py-2 bg-red-500 text-white rounded-md">Submit</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: Boolean,
    },
    data() {
      return {
        reason: '',
      };
    },
    methods: {
      close() {
        this.$emit('close');
      },
      submit() {
        this.$emit('submit', this.reason);
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  