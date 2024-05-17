<script setup>
import Navbar from '../Pages/Navbar';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const userEmail = localStorage.getItem('email'); // Replace with the logged-in user's email
const activityData = ref([]); // Store an array of objects containing user data
const userName = localStorage.getItem('name')
onMounted(async () => {
  try {
  const userResponse = await axios.get('http://localhost:8001/', { params: { email: userEmail, name: userName } });
  console.log('User Response:', userResponse.data);

  if (userResponse.data.status === 'ok') {
    const user = userResponse.data.data;
    const roll_no = localStorage.getItem('rollno');

    const formResponse = await axios.get('http://localhost:8001/add_form', { params: { roll_no } });
    console.log('Form Response:', formResponse.data);

    if (formResponse.data.status === 'ok') {
      const formDetails = formResponse.data.data.filter(detail => detail.roll_no === roll_no);
      console.log('Filtered form details:', formDetails);

      activityData.value = formDetails;
      let softwareProjects = 0;
      let hardwareProjects = 0;

      for (const user of formDetails) {
        for (const detail of user.Details) {
          if (detail.category === 'Software') {
            softwareProjects++;
          } else if (detail.category === 'Hardware') {
            hardwareProjects++;
          }
        }
      }
      localStorage.setItem('softwareProjects', softwareProjects);
      localStorage.setItem('hardwareProjects', hardwareProjects);
      console.log('Fetched form details:', formDetails);

    } else {
      console.error('Error fetching form details:', formResponse.data.message);
    }
  } else {
    console.error('Error fetching user details:', userResponse.data.message);
  }
} catch (error) {
  console.error('Error:', error);
}

  
  /*try {
  const userResponse = await axios.get('http://localhost:8001/', { params: { email: userEmail, name: userName } });
  if (userResponse.data.status === 'ok') {
    const user = userResponse.data.data[0];
    const rollNo = user.rollno;

    // Get the roll number from local storage
    const storedRollNo = localStorage.getItem('rollNo');

    // Compare the roll numbers
    if (rollNo === storedRollNo) {
      const formResponse = await axios.get('http://localhost:8001/add_form', { params: { roll_no: rollNo } });
      if (formResponse.data.status === 'ok') {
        // Extracting only the roll number data
        const rollNoData = formResponse.data.data.map(item => item.rollno);
        console.log('Fetched roll number data:', rollNoData);
      } else {
        console.error('Error fetching form details:', formResponse.data.message);
      }
    } else {
      console.log('Roll number mismatch. Data will not be displayed.');
    }
  } else {
    console.error('Error fetching user details:', userResponse.data.message);
  }
} catch (error) {
  console.error('Error:', error);
}
*/
});
</script>








<template>
  <div>
    <Navbar />
    <h1 class="text-xl p-2 absolute top-20 md:left-72 left-0">Your Data</h1>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-[75%] top-32 left-10 md:left-72 overflow-hidden scrollbar-thumb-gray-700 rounded-md">
      <table class="w-full text-sm text-left text-gray-900 dark:text-gray-900">
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
            <th scope="col" class="px-6 py-3">Status</th>
          </tr>
        </thead>
        <!-- Table body -->
        <tbody>
          <!-- Iterate over each object in activityData -->
          <template v-for="(user, index) in activityData" :key="index">
            <!-- Iterate over each detail object -->
            <template v-for="(detail, detailIndex) in user.Details" :key="detailIndex">
              <tr :class="detailIndex % 2 !== 0 ? 'even:bg-gray-200 even:text-gray-900' : 'odd:bg-white odd:text-gray-900'">
                <td class="px-6 py-4">{{ maskedId(index, detailIndex) }}</td>
                <!-- Table cells for other properties -->
                <td class="px-6 py-4 text-nowrap">{{ userName }}</td>
                <td class="px-6 py-4">{{ user.roll_no }}</td>
                <td class="px-6 py-4">{{ detail.category }}</td>
                <td class="px-6 py-4">{{ detail.title }}</td>
                <td class="px-6 py-4 text-nowrap text-justify">{{ detail.additionalStudents[0].name || '--' }} {{ detail.additionalStudents[0].rollNo ? '(' + detail.additionalStudents[0].rollNo + ')' : '' }}</td>
                <td class="px-6 py-4 text-nowrap text-center">{{ detail.additionalStudents[1].name || '--' }} {{ detail.additionalStudents[1].rollNo ? '(' + detail.additionalStudents[1].rollNo + ')' : '' }}</td>
                <td class="px-6 py-4 text-nowrap text-center">{{ detail.additionalStudents[2].name || '--' }} {{ detail.additionalStudents[2].rollNo ? '(' + detail.additionalStudents[2].rollNo + ')' : '' }}</td>
                <td class="px-6 py-4 text-nowrap text-center">{{ detail.additionalStudents[3].name || '--' }} {{ detail.additionalStudents[3].rollNo ? '(' + detail.additionalStudents[3].rollNo + ')' : '' }}</td>
                <td class="px-6 py-4 text-nowrap text-center">{{ detail.additionalStudents[4].name || '--' }} {{ detail.additionalStudents[4].rollNo ? '(' + detail.additionalStudents[4].rollNo + ')' : '' }}</td>
                <td class="px-6 py-4 text-nowrap text-center">{{ detail.numberOfStudents   }}</td>

                <td class="px-6 py-4 text-nowrap text-center">{{ detail.pdfPath || '--' }}</td>
                


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
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
tr {
  background-color: white;
}
</style>

<script>
export default {
  name: 'UserData',
  methods: {
    // Method to generate masked ID
    maskedId(userIndex, detailIndex) {
      // Assuming a maximum of 100 users
      const id = userIndex * 100 + detailIndex + 1;
      return id;
    }
  }
}
</script>
