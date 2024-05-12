<script setup>
import PieChart from './PieChart';
import Navbar from './Navbar';
</script>

<template>
    <div>
        <Navbar />
        <br>
    <div class="grid grid-cols-1 p-0 gap-[2%] md:flex md:flex-row flex-wrap w-[80%] space-y-8 relative left-24 md:left-0">
            
      <div class="bg-white text-black w-56 h-20 relative left-20 top-24 md:text-sm md:left-80 md:w-72 md:h-28 shadow-md rounded-md md:rounded-2xl border-l-8 border-[#FF6347] cursor-pointer transition ease-in-out delay-150 hover:
                    hover:-translate-y-1 hover:scale-90 hover:bg-[#FEFBF6] duration-100">
        <div class="flex">
        <div class="grid grid-cols-3 md:grid-cols-1">
            <h1 class="text-xl md:text-xl items-end justify-center px-4 pt-4 font_style_card1">Software Projects</h1>
            <h2 class="text-xl px-14 md:text-3xl pt-5 md:pt-3 md:px-8 font-semibold">10</h2>
        </div>
        <div class="relative pt-2 md:pt-5 left-0 md:left-3">
            <i class="fa-solid fa-laptop text-3xl p-4 md:text-4xl md:p-0 text-[#00bcf1] "></i>
        </div>
    </div>
      </div>
              
    
 <div class="bg-white text-black w-56 h-20 relative left-20 top-20 md:top-16 md:text-sm md:left-80 md:w-72 md:h-28 shadow-md rounded-md md:rounded-2xl border-l-8 border-[#00881E] cursor-pointer transition ease-in-out delay-150 hover:
                    hover:-translate-y-1 hover:scale-90 hover:bg-[#FEFBF6] duration-100">
        <div class="flex">
        <div class="grid grid-cols-3 md:grid-cols-1">
            <h1 class="text-xl md:text-xl items-end justify-center px-4 pt-4 font_style_card1">Hardware Projects</h1>
            <h2 class="text-xl px-14 md:text-3xl pt-5 md:pt-3 md:px-8 font-semibold">5</h2>
        </div>
        <div class="relative pt-2 md:pt-5 left-0 md:left-3">
            <i class="fa-solid fa-screwdriver-wrench text-[#00bcf1] text-3xl p-4 md:text-4xl md:p-0"></i>

        </div>
    </div>
      </div>
         
      <div class="bg-white text-black w-56 h-20 relative left-20 top-16 md:text-sm md:left-80 md:w-72 md:h-28 shadow-md  rounded-md md:rounded-2xl border-l-8 border-[#FF6347] cursor-pointer transition ease-in-out delay-150 hover:
                    hover:-translate-y-1 hover:scale-90 hover:bg-[#FEFBF6] duration-100">
        <div class="flex">
        <div class="grid grid-cols-3 md:grid-cols-1">
            <h1 class="text-xl md:text-xl items-end justify-center px-4 pt-4 font_style_card1">Total</h1>
            <h2 class="text-xl px-12 md:text-3xl pt-5 md:pt-3 md:px-8 font-semibold">15</h2>
        </div>
        <div class="relative pt-2 md:pt-5 left-0 md:left-32">
            <i class="fa-solid fa-list text-[#00bcf1] text-3xl p-4 md:text-4xl md:p-0 "></i>
        </div>
    </div>
      </div>

      <div class="bg-white text-black w-56 h-20 relative left-20 top-16 md:text-sm md:left-80 md:w-72 md:h-28 shadow-md rounded-md md:rounded-2xl border-l-8 border-[#00881E] cursor-pointer transition ease-in-out delay-150 hover:
                    hover:-translate-y-1 hover:scale-90 hover:bg-[#FEFBF6] duration-100">
        <div class="flex">
        <div class="grid grid-cols-3 md:grid-cols-1">
            <h1 class="text-xl md:text-xl items-end justify-center px-4 pt-4 font_style_card2">Appointments<br></h1>
            <h2 class="text-xl px-10 md:text-3xl pt-10 md:pt-3 md:px-8 font-semibold">5<span class="text-sm font-thin  relative md:pt-0">&nbsp;&nbsp;&nbsp;(software)</span></h2>
        </div>
        <div class="relative pt-2 md:pt-5 left-0 md:left-14">
            <i class="fa-regular fa-calendar-days text-[#00bcf1]  text-3xl p-4 md:text-4xl md:p-0"></i>
            
        </div>
    </div>
      </div>
      <div class="bg-white text-black w-56 h-20 relative left-20 top-16 md:text-sm md:left-80 md:w-72 md:h-28 shadow-md rounded-md md:rounded-2xl  border-l-8 border-[#FF6347] cursor-pointer transition ease-in-out delay-150 hover:
                    hover:-translate-y-1 hover:scale-90 hover:bg-[#FEFBF6] duration-100">
        <div class="flex">
        <div class="grid grid-cols-3 md:grid-cols-1">
            <h1 class="text-xl md:text-xl items-end justify-center px-4 pt-4 font_style_card1 ">Appointment</h1>
            <h2 class="text-xl px-10 md:text-3xl pt-5 md:pt-3 md:px-8 font-semibold  relative top-4 md:top-0">3<span class="text-sm font-thin relative top-4 md:top-0">&nbsp;&nbsp;&nbsp;(Hardware)</span></h2>
        </div>
        <div class="relative pt-5 left-0 md:left-16">
            <i class="fa-regular fa-calendar-days  text-[#00bcf1] text-3xl p-4 md:text-4xl md:p-0"></i>
        </div>
    </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-[4%] space-x-4">
        <div class="chart_container ml-24 relative left-20 w-56 md:left-52 md:w-[50%] mt-28 top-96 md:top-1   ">
            <PieChart />
        </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg  top-32 h-80 w-full md:w-[90%] -left-1/4 md:left-0">
    <table class="w-full text-sm text-left text-gray-900 dark:text-gray-900 h-80">
        <thead class="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-[#D9D9D9] dark:text-gray-900">
            <tr>
                <th scope="col" class="px-6 py-3">
                    S no
                </th>
                <th scope="col" class="px-6 py-3">
                    Tac Id
                </th>
                <th scope="col" class="px-6 py-3">
                    Title
                </th>
                <th scope="col" class="px-6 py-3">
                    Team Member
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="odd:bg-zinc-300 odd:dark:bg-white even:bg-gray-100 even:dark:bg-white border-b dark:border-gray-300 ">
                
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    1
                </th>
                <td class="px-6 py-4">
                    19801
                </td>
        
                <td class="px-6 py-4">
                    Ram
                </td>
                <td class="px-6 py-4">
                    <p class="font-medium text-[#00bcf1] dark:text-[#00bcf1]">Budget buddy</p>
                </td>
               
                <td class="px-6 py-4">
                    <div class="bg-yellow-400 bg-opacity-45 p-1 rounded-xl text-yellow-900 border px-5 border-amber-600
">
                        Initiated
                    </div>
                </td>
            </tr>

            <tr class="odd:bg-zinc-300 odd:dark:bg-white even:bg-gray-100 even:dark:bg-white border-b dark:border-gray-300">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    2
                </th>
                <td class="px-6 py-4">
                    19802
                </td>
        
                <td class="px-6 py-4">
                    Kavin
                </td>
                <td class="px-6 py-4">
                    <p class="font-medium text-[#00bcf1] dark:text-[#00bcf1]">News Website</p>
                </td>
               
                <td class="px-6 py-4">
                    <div class="bg-green-600 border border-green-800 bg-opacity-45 p-1 rounded-xl px-4 text-green-900
">
                        Approved
                    </div>
                </td>
            </tr>
            <tr class="odd:bg-zinc-300 odd:dark:bg-white even:bg-gray-100 even:dark:bg-white border-b dark:border-gray-300">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    3
                </th>
                <td class="px-6 py-4">
                    19803
                </td>
        
                <td class="px-6 py-4">
                    John
                </td>
                <td class="px-6 py-4">
                    <p class="font-medium text-[#00bcf1] dark:text-[#00bcf1]">Text generation</p>
                </td>
               
                <td class="px-6 py-4">
                    <div class=" bg-red-500 bg-opacity-45 p-1 rounded-xl text-red-700 px-5 border border-red-900">
                      
                        Rejected
                    </div>
                </td>
            </tr>

            <tr class="odd:bg-zinc-300 odd:dark:bg-white even:bg-gray-100 even:dark:bg-white border-b dark:border-gray-300">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    3
                </th>
                <td class="px-6 py-4">
                    19804
                </td>
        
                <td class="px-6 py-4">
                    John
                </td>
                <td class="px-6 py-4">
                    <p class="font-medium text-[#00bcf1] dark:text-[#00bcf1]">AI Text generation</p>
                </td>
               
                <td class="px-6 py-4">
                    <div class="bg-green-600 border border-green-800 bg-opacity-45 p-1 rounded-xl px-4 text-green-900
">
                        Approved
                    </div>
                </td>
            </tr>
            </tbody>

        </table>
        </div>
    </div>
       
    </div>
</template>
<script>
export default {
    
}
</script>
<style>

</style>