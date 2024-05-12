<script setup>
import router from '../../router'

</script>

<template>
    <div>
      <div class="nav bg-[#00bcf1] px-10 h-14 flex shadow-lg fixed w-full z-50">
        <h1 id="Nav_heading" class="text-6xl text-white left-8 pt-2">Tac</h1>


        <!-- <div class="flex items-center justify-center w-10 h-10 border border-black cursor-pointer hover:bg-transparent hover: bg-white rounded-full" @click="toggleSidebar"></div> -->

        <div class="flex items-center justify-end w-full">
          <div class="flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-transparent hover:border border-white bg-white rounded-full" @click="setdropdown_login = !setdropdown_login">
            <h3 class="text-xl">{{letter.charAt(0).toUpperCase()}}</h3>
          </div>
          <div class="grid grid-cols-1 gap-16 ml-6 space-x-10 md:hidden p-1" @click="set_mobile_menu=!set_mobile_menu" v-if="set_mobile_menu==false">
            <i class="fa-solid fa-bars md:hidden text-white text-2xl"></i>
          </div>

          <div class="grid grid-cols-1 gap-16 ml-6 space-x-10 md:hidden p-1" @click="set_mobile_menu=!set_mobile_menu" v-if="set_mobile_menu==true">
            <i class="fa-solid fa-xmark text-2xl"></i>
          </div>

        </div>
        <div class="bg-white absolute top-14 right-10 shadow-lg w-32 z-50" v-if="setdropdown_login">
          <div class="list-none cursor-pointer">
            <div class="flex hover:bg-slate-300"  @click="open_model">
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

  <div id="default-modal" tabindex="-1" aria-hidden="true" class="max-h-full" v-if="popup==true">
    <div class="absolute p-4 w-full  h-[40%] inset-0 z-50">
        <div class="relative bg-white rounded-lg dark:bg-white shadow-xl">
            <div class="bg-[#f7fee7] flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-black">
                    Profile
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" @click="open_model">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <div class="p-4 md:p-5 space-y-4">
              <table class="w-full text-sm text-left text-gray-900 dark:text-gray-900"></table>
                <tr>
                  <th scope="col" class="px-6 py-3">
                      Name:
                  </th>
                  <td class="px-6 py-4">
                      {{letter}}
                  </td>
                </tr>

                <tr>
                  <th scope="col" class="px-6 py-3">
                      Roll-no:
                  </th>
                  <td class="px-6 py-4">
                      {{ rollno }}
                  </td>
                </tr>

                <tr>
                  <th scope="col" class="px-6 py-3">
                      Email:
                  </th>
                  <td class="px-6 py-4">
                      {{ email }}
                  </td>
                </tr>

              <table/>
               
            </div>
            <!-- Modal footer -->
            <!-- <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                <button data-modal-hide="default-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
            </div> -->
        </div>
    </div>
</div>

      </div>
      <div class="grid grid-cols-2">
        <div class="grid grid-cols-2">
      <div class="hidden lg:block fixed left-0 top-14 w-[40%] h-full bg-white ease-in-out duration-700 shadow-lg lg:w-[20%] sm:hidden" :class="{ 'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen}">
    <ul class="pt-2">
      <li class="p-4 border-b border-gray-400 text-[#142c74] hover:bg-gray-200 side_bar_font cursor-pointer" @click="navigate"><i class="fa-solid fa-house"></i> &nbsp;Home </li>
      <li class="p-4 border-b border-gray-400 text-[#142c74] hover:bg-gray-200 side_bar_font cursor-pointer" @click="navigate_activity"><i class="fa-solid fa-bars-progress"></i> &nbsp; Activity</li>
      <li class="p-4 border-b border-gray-400 text-[#142c74] hover:bg-gray-200 side_bar_font cursor-pointer" @click="navigate_appointment"><i class="fa-regular fa-calendar-check"></i> &nbsp; Appointment</li>
    </ul>
  </div>
</div>

      </div>
      <div v-if="set_mobile_menu==true">
      <div className='fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-1000 md:hidden z-10'>
      <h1 className='w-full text-3xl text-white'>Demo</h1>

      <ul class="pt-10">
      <li class="p-4 border-b border-gray-400 text-[#142c74] hover:bg-gray-200 side_bar_font cursor-pointer" @click="navigate"><i class="fa-solid fa-house"></i> &nbsp;Home </li>
      <li class="p-4 border-b border-gray-400 text-[#142c74] hover:bg-gray-200 side_bar_font cursor-pointer" @click="navigate_activity"><i class="fa-solid fa-bars-progress"></i> &nbsp; Activity</li>
      <li class="p-4 border-b border-gray-400 text-[#142c74] hover:bg-gray-200 side_bar_font cursor-pointer" @click="navigate_appointment"><i class="fa-regular fa-calendar-check"></i> &nbsp; Appointment</li>
    </ul>
      </div>
    </div> 
      <div v-if="isLoading_inside">
        <div class="upper-layer bg-white max-w-full max-h-full fixed  md:px-96 left-custom top-14 inset-0 z-50">
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
        const roll_no = localStorage.getItem('rollno');
        const email_id = localStorage.getItem('email');
      return {
        setdropdown_login: false,
        isLoading: false,
        isLoading_inside: false,
        isSidebarOpen:true,
        letter:personLetter,
        popup:false,
        rollno: roll_no,
        email:email_id,
        set_mobile_menu: false
        

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
          router.push('/')
          console.log("logging")
          this.isLoading = false
        }, 3000);
      },
      navigate() {
        this.isLoading_inside = true
        this.set_mobile_menu = false
        setTimeout(() => {
          router.push('/home')
          console.log("logging")

          this.isLoading_inside = false

        }, 2000);

      },
      navigate_activity(){
        this.isLoading_inside = true
        this.set_mobile_menu = false
        setTimeout(() => {
          router.push('/activity')
          console.log("logging")
          this.isLoading_inside = false
        }, 2000);
      },
      open_model(){
            this.popup = !this.popup
            console.log(this.popup)
          },
          navigate_appointment(){
            this.isLoading_inside = true
            setTimeout(() => {
              router.push('/appointment')
              console.log("logging")
              this.isLoading_inside = false
            }, 2000);
          }
    }
  }
  </script>
  
<style >
    
</style>