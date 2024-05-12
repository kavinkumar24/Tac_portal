

<template>
    <Doughnut :data="constData" :options="{ maintainAspectRatio:false }"/>
 </template>
 <script setup>
 import {Chart as ChartJs, ArcElement, Tooltip, Legend} from 'chart.js';
 import {Doughnut} from "vue-chartjs"
 ChartJs.register(ArcElement,Tooltip,Legend);
 const constData = {
     labels: [
     'Software Projects',
     'Hardware Projects',
     'Software Appointments',
     'Hardware Appointments'
   ],
   datasets: [{
     data:[10,5,5,3],
     backgroundColor: [
       'rgb(255, 99, 132)',
       'rgb(54, 162, 235)',
       'rgb(255, 205, 86)',
       'rgb(173, 86, 255)'
     ],
     hoverOffset: 4,
     borderColor:'#ebebeb'
   }]
 }
 </script>
 <style>
     
 </style>