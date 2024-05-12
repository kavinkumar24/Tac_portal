<script setup>
import Navbar from './Navbar';
import { ref, reactive, watch } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toast-notification';

const categories = ['Software', 'Hardware']; 
const hardware_departments = ['ECE','EEE','MTRS','ME','Auto','Civil','Aero'];
const name = ref(''); 
const rollNo = ref(''); 
const title = ref(''); 
const numberOfStudents = ref(0); 
const listComponents = ref(''); 
const showComponents = ref(false); 
const file = ref(null);
const showDepartment = ref(false);
const additionalStudentFields = reactive([]);
const additionalStudents = reactive([]);
const category = ref('');
const count_student = [1,2,3,4,5];


watch(numberOfStudents, (newVal, oldVal) => {
  if (newVal > oldVal) {
    const numAdditionalFields = newVal - oldVal;
    for (let i = 0; i < numAdditionalFields; i++) {
      additionalStudentFields.push(i);
    }
  } else {
    additionalStudentFields.splice(newVal);
  }
});

function handleCategoryChange() {
  if (category.value === 'Hardware') {
    showComponents.value = true;
    showDepartment.value = true;
  } else {
    showComponents.value = false;
    listComponents.value = '';
  }
}

function handleExcelUpload(event) {
}

// Initialize additionalStudents objects with default values
for (let i = 0; i < 5; i++) {
  additionalStudents.push({ name: '', rollNo: '', skillSet: '' });
}

const handlepdf = (event) => {
  file.value = event.target.files[0]; // Update the file ref
  console.log(file.value.name); // Ensure the file is properly set
  localStorage.setItem('pdfPath', file.value.name);
}

const update_pdf = async () => {
  try {
    const formData = new FormData();
    formData.append('file', file.value); // Append the file from the ref
    const response = await axios.post("http://localhost:8001/add_pdf", formData);
    console.log("File uploaded successfully:", response.data.filename);
    return response.data.filename; // Assuming the backend returns the filename
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
const toast = useToast();

const submitForm = async (event) => {

  try {

    event.preventDefault();
    update_pdf()
    await axios.post("http://localhost:8001/add_form", {
      email: localStorage.getItem('email'), 
      category:category.value,
      title: title.value,
      numberOfStudents:numberOfStudents.value,
      additionalStudents: additionalStudents,
      pdfPath:localStorage.getItem('pdfPath')
     
    });
    console.log("Successfully saved");
    clearForm();
    toast.success('Form submitted successfully');

    console.log(additionalStudents[0])

  } catch (error) {
    console.error("Error in saving:", error);
    toast.error('Error submitting form');

  }
};
const clearForm = () => {
      category.value = '';
      title.value = '';
      numberOfStudents.value = '';
      name.value = '';
      rollNo.value = '';
      additionalStudents.forEach(student => {
        student.name = '';
        student.rollNo = '';
        student.skillSet = '';
      });
      file.value = null;
      
    };

</script>


<template>
    <div>
      <Navbar />
      <div class="w-[100%] md:w-[80%] left-0 md:left-48 pl-2 pr-2  md:pl-20 relative top-20 overflow-x-hidden">
        <h1 class="text-2xl">Tac Form</h1>
        <br>
        <form class="bg-white shadow-lg rounded-lg px-5 pt-6 pb-8 mb-4">
          <div class="grid grid-cols-2 gap-4">
            <!-- Name -->
            <div class="mb-4 mt-1">
              <label class="text-gray-700 text-sm font-bold mb-2" for="name">Name <span class="text-red-500">*</span></label>
              <input class="border-[#00bcf1] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg" id="name" type="text" required placeholder="Name" v-model="name">
            </div>  
  
            <!-- Roll No -->
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="rollNo">Roll No  <span class="text-red-500">*</span></label>
              <input class="border-[#00bcf1] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg" id="rollNo" type="text" placeholder="Roll No" required v-model="rollNo">
            </div>
  
            <!-- Category Dropdown -->
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="category">Category <span class="text-red-500">*</span></label>
              <select class="border-[#00bcf1] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg" id="category" select v-model="category" @change="handleCategoryChange()">
                <option value="" disabled selected>Select Category</option>
                <option v-for="(category, index) in categories" :key="index" >{{ category }}</option>
              </select>
            </div>
  
            <!-- Title -->
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Title <span class="text-red-500">*</span></label>
              <input class="border-[#00bcf1] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg" id="title" type="text" placeholder="Title" v-model="title" required>
            </div>
  
            <!-- Number of Students -->
            <div class="mb-4 ">
          <!-- Number of Students Dropdown -->
            <label class="block text-gray-700 text-sm font-bold mb-2" for="numberOfStudents">Number of Students <span class="text-red-500">*</span></label>
            <select class="border-[#00bcf1] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg" 
            id="numberOfStudents" placeholder="select" required
            v-model="numberOfStudents" @change="handle_students">
  <option value="">Select Category</option>
  <option v-for="(count, index) in count_student" :key="index">{{ count }}</option>
</select>




        </div>
        <div class="mb-4  ">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="pdfDocument">PDF Document <span class="text-red-500">*</span></label>
              <div class="p-3 border-dotted border-2 border-zinc-400 cursor-pointer">
              <input type="file" id="pdfDocument" accept=".pdf" class="cursor-pointer" @change="handlepdf" placeholder="Choose PDF" required>
            </div>
            </div>
            <div class="mb-4" v-if="showDepartment">
              <fieldset>
                <legend class="block text-gray-700 text-sm font-bold mb-2">Choose your department<span class="text-red-500">*</span></legend>
                <div class="flex items-center" required>
                
              <select :id="`studentSkillSet_${index}`" class="border-[#00bcf1] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-2xl"  v-model ="department" required>
                <option value="" disabled selected>Select Department</option>

                <option v-for="(department, index) in hardware_departments " :key="index" >{{ department }}</option>

              </select>
                </div>
              </fieldset>
            </div>

      
       
            <!-- List of Components -->
           
  
            <!-- PDF Document Input -->
            
          </div>
          <template v-if="additionalStudentFields.length > 0">
            <div v-for="(index, i) in additionalStudentFields" :key="i" class="mb-4">
              <!-- Student Name -->
              <label class="block text-gray-700 text-sm font-bold mb-2" :for="`studentName_${index}`">Student {{ i + 1 }} Name<span class="text-red-500">*</span></label>
    <input :id="`studentName_${index}`" type="text" class="border-[#00bcf1] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg" v-model="additionalStudents[i].name" placeholder="Student Name" required>
    
    <!-- Roll No -->
    <label class="block text-gray-700 text-sm font-bold mb-2">Student {{ i + 1 }} Roll No <span class="text-red-500">*</span></label>
    <input :id="`studentRollNo_${index}`" type="text" class="border-[#00bcf1] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg" v-model="additionalStudents[i].rollNo" placeholder="Roll No" required>

    <!-- Skill Set Dropdown (Conditional) -->
    <template v-if="category === 'Software'">
      <label class="block text-gray-700 text-sm font-bold mb-2">Student {{ i + 1 }} Skill Set <span class="text-red-500">*</span></label>
      <select :id="`studentSkillSet_${index}`" class="border-[#00bcf1] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-2xl" v-model="additionalStudents[i].skillSet" required>
        <option value="" disabled selected>Select Skill Set</option>
        <option value="UI">UI</option>
        <option value="Front End">Front End</option>
        <option value="Back End">Back End</option>
      </select>
    </template>
      </div>
          

            <div class="mb-4" v-if="department!=null">
              <fieldset>
                <legend class="block text-gray-700 text-sm font-bold mb-2">List of Components <span class="text-red-500">*</span></legend>
                <div class="flex items-center" required>
                  <input class="mr-2" type="radio" id="componentsYes" value="Yes" v-model="listComponents">
                  <label class="mr-4" for="componentsYes">Yes</label>
                  <input class="mr-2" type="radio" id="componentsNo" value="No" v-model="listComponents">
                  <label for="componentsNo">No</label>
                </div>
              </fieldset>
            </div>

          <div class="mb-4" v-if="showComponents">
              <fieldset>
                <legend class="block text-gray-700 text-sm font-bold mb-2">List of Components <span class="text-red-500">*</span></legend>
                <div class="flex items-center" required>
                  <input class="mr-2" type="radio" id="componentsYes" value="Yes" v-model="listComponents">
                  <label class="mr-4" for="componentsYes">Yes</label>
                  <input class="mr-2" type="radio" id="componentsNo" value="No" v-model="listComponents">
                  <label for="componentsNo">No</label>
                </div>
              </fieldset>
            </div>
  
            <!-- Excel Document Input -->
            <div v-if="showComponents && listComponents === 'Yes'" class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="excelDocument">Excel Document <span class="text-red-500">*</span></label>
              <div class="p-3 border-dotted border-2 border-zinc-400 cursor-pointer">
              <input type="file" id="excelDocument" accept=".xls,.xlsx" @change="handleExcelUpload" required>
              </div>
            </div>
         
        </template>
        <button class="bg-[#00bcf1] text-white p-2 rounded-md hover:bg-[#02a6d4] " @click="submitForm">
          Submit
         </button>
        </form>
        
      </div>
    </div>

  </template>
  
<script>
export default {
  name: 'FormPage',
  components: {
    Navbar
  },

  computed: {
    placeholder() {
      return this.numberOfStudents === 0 ? "" : "Select Category"; 
    },
  },
  data(){
      return {
        category:'',
        title:'',
        numberOfStudents:'',
        additionalStudents:[],
        department:null,
        file:'',
        global_index: 0,

      }
     
    },
    method:{
      handle_students() {
        console.log(this.numberOfStudents)
// Update global_index based on the selected number of students
this.global_index = parseInt(this.numberOfStudents);
// If the number of students is increased
if (this.additionalStudents.length < this.global_index) {
  // Add new additional student input fields
  const numNewFields = this.global_index - this.additionalStudents.length;
  for (let i = 0; i < numNewFields; i++) {
    this.additionalStudents.push({ name: '', rollNo: '', skillSet: '' });
  }
} else if (this.additionalStudents.length > this.global_index) {
  // If the number of students is decreased
  // Remove excess additional student input fields
  this.additionalStudents.splice(this.global_index);
}
}


      }
//     // methods:{
    //   handlepdf(event){
    //     this.file = event.target.files[0]
    //     console.log(this.file)
        
    //   }
  
    // }


};
</script>

<style scoped>
  /* Add your scoped styles here */
</style>