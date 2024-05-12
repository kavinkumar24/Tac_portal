<script setup>
import Navbar from './Navbar.vue';
</script>
<template>
    <div>
        <Navbar />
        <div class="w-[80%] h-auto left-48 pl-20 relative top-20">
        <form class="bg-white shadow-lg rounded-lg px-5 pt-6 pb-8 mb-4">
          <div class="grid grid-cols-2 gap-4">
            <!-- Name -->
            <div class="mb-4 mt-1">
              <label class="text-gray-700 text-sm font-bold mb-2" for="name">Name <span class="text-red-500">*</span></label>
              <input class="border-[#00bcf1] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg" id="name" type="text" required placeholder="Name" v-model="name">
            </div> 
            
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="rollNo">Roll No  <span class="text-red-500">*</span></label>
              <input class="border-[#00bcf1] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg" id="rollNo" type="text" placeholder="Roll No" required v-model="rollNo">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="category">Tac ID <span class="text-red-500">*</span></label>
              <select class="border-[#00bcf1] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg" id="category">
                <option value="" disabled selected>Select Category</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>

              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="category">Appointment date<span class="text-red-500">*</span></label>
              <input class="border-[#00bcf1] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg" id="rollNo" type="Date" placeholder="Roll No" required v-model="date">

            </div>  

            <button class="bg-[#00bcf1] text-white p-2 rounded-md hover:bg-[#02a6d4] w-36">
          Book
         </button>

            
        </div>
    </form>
</div>
  
    </div>
</template>
<script >
export default {
    name:'Acivity_table'
}

</script>
<style lang="">
    
</style>