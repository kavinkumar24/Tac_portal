

<template>
    <Doughnut :data="constData" :options="{ maintainAspectRation:false }"/>
 </template>
 <script setup>
 import {Chart as ChartJs, ArcElement, Tooltip, Legend} from 'chart.js';
 import {Doughnut} from "vue-chartjs"
 ChartJs.register(ArcElement,Tooltip,Legend);
 const constData = {
     labels: [
     'January',
     'February',
     'March',
     'April',
     'May',
    
   ],
   datasets: [{
     data:[1,3,2,1,1],
     backgroundColor: [
       'rgb(255, 99, 132)',
       'rgb(54, 162, 235)',
       'rgb(255, 205, 86)',
       'rgb(173, 86, 255)',
       'rgb(255,167,99)'
     ],
     hoverOffset: 4,
     borderColor:'white'
   }]
 }
 </script>
 <style>
     
 </style>