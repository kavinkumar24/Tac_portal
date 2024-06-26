<script setup>
import { onMounted, ref } from 'vue';
import Navbar from './Navbar';
import axios from 'axios';
import Detail_view from './Detail_view.vue';
import RejectionReasonModal from './RejectionReasonModal.vue';

const activityData = ref([]);
const modalVisible = ref(false);
const selectedDetail = ref({});
const isLoading = ref(false);
const isRejectionModalVisible = ref(false);
const rejectDetailData = ref(null);
// onMounted(async () => {
//     try {
//         const formResponse = await axios.get('http://localhost:8001/add_form');
//         console.log('Form Response:', formResponse.data);
//         activityData.value = formResponse.data.data;
//     } catch (error) {
//         console.error('Error:', error);
//     }
// });

onMounted(async () => {
    try {
        const formResponse = await axios.get('http://localhost:8001/add_form');
        console.log('Form Response:', formResponse.data);
        const filteredData = formResponse.data.data.map(user => {
            return {
                ...user,
                Details: user.Details.filter(detail => detail.status === "Initiated")
            };
        }).filter(user => user.Details.length > 0);

        activityData.value = filteredData;
        console.log('Filtered Activity Data:', activityData.value);
    } catch (error) {
        console.error('Error:', error);
    }
});

const viewDetail = (detail) => {
    selectedDetail.value = detail;
    console.log(selectedDetail.value);
    modalVisible.value = true;
};

const closeModal = () => {
    modalVisible.value = false;
};
const approveDetail = async (detail) => {
    isLoading.value = true;
    
    try {
        const response = await axios.post('http://localhost:8001/update_status', {
            detailId: detail._id,
            newStatus: 'Approved'
        });
        if (response.data.success) {
            const user = activityData.value.find(user => user.Details.some(d => d._id === detail._id));
            if (user) {
                const detailToUpdate = user.Details.find(d => d._id === detail._id);
                if (detailToUpdate) {
                    detailToUpdate.status = 'Approved';
                }
            }
            setTimeout(() => {
                isLoading.value = false;
                window.location.reload();
            }, 2000);
        } else {
            console.error('Failed to update status:', response.data.message);
        }
    } catch (error) {
        console.error('Error updating status:', error);
    }
};



const openRejectModal = (detail) => {
    rejectDetailData.value = detail;
    isRejectionModalVisible.value = true;
};

const closeRejectModal = () => {
    isRejectionModalVisible.value = false;
    rejectDetailData.value = null;
};

const submitRejectionReason = async (reason) => {
  isLoading.value = true;
  const detail = rejectDetailData.value;

  try {
    const response = await axios.post('http://localhost:8001/update_status', {
      detailId: detail._id,
      newStatus: 'Rejected',
      reason: reason,
    });

    if (response.data.success) {
      const user = activityData.value.find(user => user.Details.some(d => d._id === detail._id));
      if (user) {
        const detailToUpdate = user.Details.find(d => d._id === detail._id);
        if (detailToUpdate) {
          detailToUpdate.status = 'Rejected';
          detailToUpdate.rejectionReason = reason;
        }
      }
      setTimeout(() => {
        isLoading.value = false;
        window.location.reload();
      }, 2000);
    } else {
      console.error('Failed to update status:', response.data.message);
    }
  } catch (error) {
    console.error('Error updating status:', error);
  } finally {
    closeRejectModal();
  }
};
</script>

<template>
    <div>
        <div v-if="isLoading==true">
        <div class="bg-white max-w-full max-h-full fixed px-96 left-custom top-14 inset-0 z-50">
    <div class="max-h-6 w-6 bg-[#00bcf1] items-center justify-center pt-6 relative top-60 left-24 rounded-sm animate-ping"></div>
  </div>
</div>
        <Navbar />
        
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-[75%] top-32 left-10 md:left-72 overflow-hidden scrollbar-thumb-gray-700 rounded-md">
            <div v-if="isLoading" class="loading-overlay">
                <div class="spinner"></div>
            </div>
            <table v-else class="w-full text-sm text-left text-gray-900 dark:text-gray-900">
                <!-- Table header -->
                <thead class="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400 h-10">

                    <tr class="bg-gray-600">
                        <th scope="col" class="px-6 py-3">ID</th>
                        <th scope="col" class="px-6 py-3">Name</th>
                        <th scope="col" class="px-6 py-3">Roll No</th>
                        <th scope="col" class="px-6 py-3">Category</th>
                        <th scope="col" class="px-6 py-3">Title</th>
                        <th scope="col" class="px-8 py-3">Student 1</th>
                        <th scope="col" class="px-8 py-3">Student 2</th>
                        <th scope="col" class="px-8 py-3 text-nowrap">Student 3</th>
                        <th scope="col" class="px-8 py-3 text-nowrap">Student 4</th>
                        <th scope="col" class="px-8 py-3 text-nowrap">Student 5</th>
                        <th scope="col" class="px-6 py-3 text-nowrap">No of Students</th>
                        <th scope="col" class="px-6 py-3 text-nowrap">pdf</th>
                        <th scope="col" class="px-6 py-3 text-nowrap">Created at</th>
                        <th scope="col" class="px-6 py-3">Status</th>
                        <th scope="col" class="px-6 py-3">View</th>
                        <th scope="col" class="px-6 py-3">Approve</th>
                        <th scope="col" class="px-6 py-3">Reject</th>
                    </tr>
                </thead>
                <!-- Table body -->
                <tbody>
                    <!-- Iterate over each object in activityData -->
                    <template v-for="(user, index) in activityData" :key="index">
                        <!-- Iterate over each detail object -->
                        <template v-for="(detail, detailIndex) in user.Details" :key="detailIndex">
                            <tr :class="detailIndex % 2!== 0 ? 'even:bg-gray-200 even:text-gray-900' : 'odd:bg-white    odd:text-gray-900'">
                                
                                <td class="px-6 py-4">1</td>
                                <td class="px-6 py-4 text-nowrap">{{ user.userName }}</td>
                                <td class="px-6 py-4">{{ user.roll_no }}</td>
                                <td class="px-6 py-4">{{ detail.category }}</td>
                                <td class="px-6 py-4">{{ detail.title }}</td>
                                <td class="px-6 py-4 text-nowrap text-justify">{{ detail.additionalStudents[0].name || '--' }} {{ detail.additionalStudents[0].rollNo ? '(' + detail.additionalStudents[0].rollNo + ')' : '' }}</td>
                                <td class="px-6 py-4 text-nowrap text-center">{{ detail.additionalStudents[1].name || '--' }} {{ detail.additionalStudents[1].rollNo ? '(' + detail.additionalStudents[1].rollNo + ')' : '' }}</td>
                                <td class="px-6 py-4 text-nowrap text-center">{{ detail.additionalStudents[2].name || '--' }} {{ detail.additionalStudents[2].rollNo ? '(' + detail.additionalStudents[2].rollNo + ')' : '' }}</td>
                                <td class="px-6 py-4 text-nowrap text-center">{{ detail.additionalStudents[3].name || '--' }} {{ detail.additionalStudents[3].rollNo ? '(' + detail.additionalStudents[3].rollNo + ')' : '' }}</td>
                                <td class="px-6 py-4 text-nowrap text-center">{{ detail.additionalStudents[4].name || '--' }} {{ detail.additionalStudents[4].rollNo ? '(' + detail.additionalStudents[4].rollNo + ')' : '' }}</td>
                                <td class="px-6 py-4 text-nowrap text-center">{{ detail.numberOfStudents }}</td>
                                <td class="px-6 py-4 text-nowrap text-center">{{ detail.pdfPath || '--' }}</td>
                                <td class="px-6 py-4 text-nowrap text-center">{{ detail.createdAt || '--' }}</td>
                                <td class="px-6 py-4">
                                    <div v-if="detail.status === 'Initiated'" class="bg-yellow-400 bg-opacity-45 p-1 rounded-xl text-yellow-900 px-2 text-center border border-amber-600">
                                        {{ detail.status }}
                                    </div>
                                    <div v-else-if="detail.status === 'Approved'" class="bg-green-600 border border-green-800 bg-opacity-45 p-1 rounded-xl px-4 text-green-900">
                                        {{ detail.status }}
                                    </div>
                                    <div v-else-if="detail.status === 'Rejected'" class="bg-red-500 bg-opacity-45 p-1 rounded-xl text-red-700 px-5 border border-red-900">
                                        {{ detail.status }}
                                    </div>
                                </td>
                                <td>
                                    <div class="text-center cursor-pointer"><i @click="viewDetail(detail)" title="Detailed view" class="fa-regular fa-eye text-lg"></i>
                                    </div>
                                </td>
                                <td>
                                    <div class="text-center"><i @click="approveDetail(detail)" title="Approve" class="fa-regular fa-circle-check text-lg text-green-500 cursor-pointer"></i>
                                    </div>
                                </td>
                                <td>
                                    <div class="text-center"><i @click="openRejectModal(detail)" title="Reject" class="fa-regular fa-circle-xmark text-lg text-red-500 cursor-pointer"></i>
                  </div>
                                </td>
                            </tr>
                        </template>
                    </template>
                </tbody>
            </table>
        </div>
        <Detail_view :isVisible="modalVisible" :details="selectedDetail" :close="closeModal" />
        <RejectionReasonModal :isVisible="isRejectionModalVisible" @close="closeRejectModal" @submit="submitRejectionReason" />

    </div>
</template>

<script>
export default {
    name: "show_projects",
    data(){
        return{
            isLoading:false,
        }
    }
}
</script>
<style scoped>
.swipe-enter-active, .swipe-leave-active {
    transition: transform 1s;
}
.swipe-enter, .swipe-leave-to  {
    transform: translateX(100%);
}

</style>
