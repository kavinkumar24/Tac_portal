<script setup>
import Navbar from './Navbar'
import router from '../../router'
import Bar from '../Pages/BarChart'
import axios from 'axios'
import { onUpdated } from 'vue'
import { ref } from 'vue' 
const userEmail = localStorage.getItem('email');
const activityData =ref([]); 
const userName = localStorage.getItem('name')



onUpdated(async () => {
  
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
      let hardwareProjects = 12;

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

});

</script>
<template>
    <div>
      <Navbar />
      <h1 class="text-2xl w-30 absolute left-10 top-10 md:left-96 md:top-14 pt-6 ">Hi ! {{ name }} 👋</h1>
      <div class="flex items-center w-full dashboard">
      <div class="grid grid-cols-1 pl-0 pt-14 md:pl-10">   
        <div class="bg-white w-60 h-24 relative left-20 top-10 md:left-80 md:w-72 md:h-28 shadow-md rounded-md border-l-8 border-[#142c74e5] cursor-pointer transition ease-in-out delay-150 hover: hover:-translate-y-1 hover:scale-110 hover:bg-[#FEFBF6]  duration-100" >
    <a @click="form_open" class="block w-full h-full">
        <div class="flex items-center">
            <div class="grid grid-cols-1">
                <h1 class="text-xl md:text-3xl items-end justify-center px-3 pt-5 font_style_card">Tac Form</h1>
            </div>
            <div class="relative pt-5 left-14 md:left-14">
                <i class="fa-regular fa-rectangle-list text-4xl text-[#00bcf1]"></i>
            </div>
        </div>
    </a>
</div>



      <div class="bg-white text-black w-60 h-24 relative left-20 top-16 md:text-sm md:left-80 md:w-72 md:h-28 shadow-md rounded-md border-l-8 border-amber-700 cursor-pointer transition ease-in-out delay-150 hover:
                    hover:-translate-y-1 hover:scale-110 hover:bg-[#FEFBF6] duration-100">
        <div class="flex">
        <div class="grid grid-cols-3 md:grid-cols-1">
            <h1 class="text-xl md:text-xl items-end justify-center px-4 pt-4 font_style_card1">Software Projects</h1>
            <h2 class="text-xl px-14 md:text-3xl pt-7 md:pt-3 md:px-8 font-semibold">{{softwareProjects}}</h2>
        </div>
        <div class="relative pt-5 left-0 md:left-3">
            <i class="fa-solid fa-laptop text-4xl text-[#00bcf1] pr-6"></i>
        </div>
    </div>
      </div>
      <div class="bg-white w-60 h-24 relative left-20 top-24 md:left-80 md:w-72 md:h-28 shadow-md rounded-md border-l-8 border-green-700 cursor-pointer transition ease-in-out delay-150 hover:
                    hover:-translate-y-1 hover:scale-110 hover:bg-[#FEFBF6] duration-100">
            

            <div class="flex">
        <div class="grid grid-cols-3 md:grid-cols-1">
            <h1 class="text-xl items-end justify-center px-4 pt-4 font_style_card1">Hardware Projects</h1>
            <h2 class="text-xl px-14 md:text-3xl pt-7 md:pt-3 md:px-8 font-semibold">{{hardwareProjects?hardwareProjects:0}}</h2>

        </div>
        <div class="relative pt-5 left-0 md:left-3">
                <i class="fa-solid fa-screwdriver-wrench text-[#00bcf1]  text-4xl  pr-6"></i>
            </div>
    </div>
      </div>
      </div>
      <div class="absolute md:relative left-[15%] pl-0 top-96 mt-28 md:mt-0 w-72 md:left-1/3 bg-white p-6 md:w-[30%] md:top-28 rounded-lg shadow-lg">
      <Bar class="ml-7"/>
      <br>
     <h2 class="text-sm px-7">This graph will show the last six months of data</h2>

    </div>

    </div>
    <!--
        graph
        <div class="flex justify-center items-center h-screen">
    <div class="max-w-md w-full">
      <h2 class="text-xl font-bold mb-4">Vertical Bar Graph Visualization</h2>
      <div class="flex">
        <div v-for="(bar, index) in bars" :key="index" class="flex-1 mr-4">
          <div class="bg-gray-200 h-full w-full relative">
            <div
              class="absolute bottom-0 left-0"
              :style="{ height: barHeight(bar.value), backgroundColor: bar.color }"
            ></div>
          </div>
          <p class="text-center mt-2">{{ bar.label }}</p>
        </div>
      </div>
    </div>
  </div> -->



    </div>
  
    <div v-if="isLoading==true">
        <div class="bg-white max-w-full max-h-full fixed px-96 left-custom top-14 inset-0 z-0">
    <div class="max-h-6 w-6 bg-[#00bcf1] items-center justify-center pt-6 relative top-60 left-24 rounded-sm animate-ping"></div>
  </div>
</div>
</template>
<script>

export default {

    name:'Home_page',
    data(){
        const personName = localStorage.getItem('name');
        const softwareProjects = localStorage.getItem('softwareProjects');
        const hardwareProjects = localStorage.getItem('hardwareProjects');
        return{
            showform : false,
            home_cards: true,
            setdropdown_login:false,
            isLoading:false,
            name:personName,
            softwareProjects:softwareProjects,
            hardwareProjects:hardwareProjects,
        }
        
    },

    methods:{
        visible(){
        this.showform=true,
        this.home_cards=false
        },
        navigate(){
            this.showform=false,
            this.home_cards=true
        },
        logout(){
            this.isLoading = true;
            setTimeout(() => {
            localStorage.setItem("LoggedIn", "false");
            router.push('/')
            console.log("logging")
            this.isLoading = false
          }, 3000);
          },
          form_open(){
            this.isLoading = true;
            setTimeout(() => {
            this.isLoading = true
            router.push('/form')
            localStorage.setItem("reload", "false");
            console.log("logging")
            this.isLoading = false
          }, 2000);

          },
          open_model(){
            this.popup = !this.popup
            console.log(this.popup)
          }
           
      


        }
        
    }
    
</script>


<style>
    #Nav_heading{
    font-family: "Orbitron", sans-serif;
    font-optical-sizing: auto;
    font-size: 40px;
    }
    .side_bar_font{
        font-family: "Varela Round", sans-serif;
        font-weight: 400;
        font-style: normal;
    }
    .font_style_card{
        font-family: "Outfit", sans-serif;
        font-optical-sizing: auto;
        font-weight: 250;
    
    }
    .font_style_card1{
        font-family: "Outfit", sans-serif;
        font-optical-sizing: auto;
        font-size: 22px;
        font-weight: 300;
    
    }
    .dashboard{
        padding: 10px;
    }
    .left-custom {
        left: 260px !important;
    }
</style>
