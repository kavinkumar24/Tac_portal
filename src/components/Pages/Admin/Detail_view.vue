<template>
  <div v-if="props.isVisible" class="modal-overlay">
    <div class="modal">
      <button @click="props.close" class="modal-close">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <h2 class="modal-title"><span class="semibold">Title</span>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class="font-normal">{{ props.details.title }}</span></h2>
      <p class="modal-text"><strong>Category:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong> <mark class="bg-green-200">{{ props.details.category }}</mark></p>
      <p class="modal-text"><strong>No of Students:</strong> {{ props.details.numberOfStudents }}</p>
      <p class="modal-text"><strong>Status:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong> {{ props.details.status }}</p>
      <p class="modal-text"><strong>Created At:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><mark class="bg-green-200"> {{ new Date(props.details.createdAt).toLocaleString() }}</mark></p>
      <div>
        <h3 class="font-bold mt-4 modal-text">Additional Students</h3>
        <ul class="additional-students-list">
          <li v-for="(student, index) in props.details.additionalStudents" :key="index" class="modal-text">
            {{ student.name || '--' }} ({{ student.rollNo || '--' }})
          </li>
          
        </ul>
        <h2 class="text-sm">Acknowledge pdf</h2>
        <br>
        <div v-if="pdfUrl" class="pdf-viewer">
          <iframe :src="pdfUrl" width="100%" height="500px"></iframe>
        </div>
        <br>
        <div class="flex flex-row gap-6">
          <button class="btn bg-green-500 text-white p-2 shadow-md rounded-md" @click="props.close">Approve</button>
          <button class="btn bg-red-500 text-white p-2 shadow-md rounded-md" @click="props.close">Reject</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps,computed } from 'vue';

const props = defineProps({
  isVisible: Boolean,
  details: Object,
  close: Function
});
const baseUrl = '/pdf/';

// Compute the full URL to the PDF file and encode URI component
const pdfUrl = computed(() => {
  const url = baseUrl + encodeURIComponent(props.details.pdfPath);
  console.log('PDF URL:', url); // Debug log
  return url;
});

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  overflow-y: auto; /* Ensure the content stays within the modal */
  max-height: 70vh; /* Limit the height of the modal */
  position: relative;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.modal-text {
  margin-bottom: 1rem; /* Adds space between lines */
}

.additional-students-list {
  padding-left: 1.2rem; /* Adds space to the left of the list */
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-close i {
  font-size: 1.5rem;
  color: #333;
}
</style>
