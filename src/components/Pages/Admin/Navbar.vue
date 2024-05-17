
<script setup>
import router from '@/router';

</script>

<template>
    <div>
      <div class="nav bg-[#00bcf1] px-10 h-14 flex shadow-lg fixed w-full z-50">
        <h1 id="Nav_heading" class="text-6xl text-white left-8 pt-2 w-24">TacAdmin</h1>

        <!-- <div class="flex items-center justify-center w-10 h-10 border border-black cursor-pointer hover:bg-transparent hover: bg-white rounded-full" @click="toggleSidebar"></div> -->

        <div class="flex items-center justify-end w-full">
          <div class="flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-transparent hover:border border-white bg-white rounded-full" @click="setdropdown_login = !setdropdown_login">
            <h3 class="text-xl">{{letter.charAt(0)}}</h3>
          </div>
        </div>
        <div class="bg-white absolute top-14 right-10 shadow-lg w-32 z-50" v-if="setdropdown_login">
          <div class="list-none cursor-pointer">
            <div class="flex hover:bg-slate-300">
              <li><i class="fa-regular fa-user pt-4 px-2 py-0"></i></li>
              <li class="p-3 px-1 font_style_card">Profile</li>
            </div>
            <hr class="h-px bg-gray-200 border-0 dark:bg-gray-200">
            <div class="flex hover:bg-slate-300">
              <li><i class="fa-solid fa-right-from-bracket pt-4 px-2 py-0"></i></li>
              <li class="hover:bg-slate-300 p-3 px-1 font_style_card" @click="logout">Logout</li>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2">
        <div class="fixed left-0 top-14 w-[40%] h-full bg-white ease-in-out duration-700 shadow-lg md:w-[20%]" :class="{ 'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen}">
          <ul class="pt-2">
            <li class="p-4 border-b border-gray-400 text-[#142c74] hover:bg-gray-200 side_bar_font cursor-pointer" @click="navigate"><i class="fa-solid fa-house"></i>  &nbsp;Home </li>
            <li class="p-4 border-b border-gray-400 text-[#142c74] hover:bg-gray-200 side_bar_font cursor-pointer" @click="navigate_activity"><i class="fa-solid fa-bars-progress"></i> &nbsp; Projects</li>
            <li class="p-4 border-b border-gray-400 text-[#142c74] hover:bg-gray-200 side_bar_font cursor-pointer"><i class="fa-regular fa-calendar-check"></i> &nbsp; Appointment</li>
          </ul>
        </div>

        
      </div>
      <div v-if="isLoading_inside">
        <div class="upper-layer bg-white max-w-full max-h-full fixed px-96 left-custom top-14 inset-0 z-50">
          <div class="max-h-6 w-6 bg-[#00bcf1] items-center justify-center pt-6 relative top-60 left-24 rounded-sm animate-ping"></div>
        </div>
      </div>
      <div v-if="isLoading">
        <div class="bg-white max-w-full max-h-full fixed px-96 inset-0 z-50">
          <div class="max-h-10 w-10 bg-[#00bcf1] items-center justify-center pt-10 relative top-60 left-52 rounded-sm animate-spin"></div>
          <h1 class="text-base relative top-64 left-48">Loading...</h1>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'navbar_page',
    
    data() {
        const personLetter = localStorage.getItem('name');

      return {
        setdropdown_login: false,
        isLoading: false,
        isLoading_inside: false,
        isSidebarOpen:true,
        letter:personLetter
      };
    },
    methods: {
    toggleSidebar(){
      this.isSidebarOpen = !this.isSidebarOpen;
    },
      logout() {
        localStorage.setItem("name", '');
        this.isLoading = true;
        setTimeout(() => {
          localStorage.setItem("LoggedIn", "false");
          console.log("logging")
          this.isLoading = false
        }, 3000);
      },
      navigate() {
        
        this.isLoading_inside = true
        setTimeout(() => {
          console.log("logging")
          this.isLoading_inside = false
        }, 2000);
      },
      navigate_activity(){
        this.isLoading_inside = true
        setTimeout(() => {
          console.log("logging")
          this.isLoading_inside = false
        }, 2000);
        router.push('/show_projects')
      }
    }
  }
  </script>
  
<style >
    
</style>