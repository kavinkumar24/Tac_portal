<script setup>
import router from '../../router'

</script>
<template>
     <div class="absolute inset-0  flex items-center justify-center">
   <div class="w-full max-w-xs relative">
  <form class="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 max-w-96 h-1/5">
    <div class="flex justify-center mb-8">
    <img src="../assets/management.png" class="h-16 w-16"/>
    <h1 id="heading" class="inline ml-2 mt-2">Tac</h1>
  </div>
  <div class="mb-2 mt-2">

<label class="block text-gray-700 text-sm font-bold mb-2" for="username">
  Name
</label>
<input class="border-[#00bcf1] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-2xl" id="username" type="text" placeholder="name" v-model="name">
</div>

<div class="mb-2 mt-2">

<label class="block text-gray-700 text-sm font-bold mb-2" for="username">
  Roll no
</label>
<input class="border-[#00bcf1] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-2xl" id="username" type="text" placeholder="roll no" v-model="rollno">
</div>

    <div class="mb-2 mt-2">

      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Email
      </label>
      <input class="border-[#00bcf1] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-2xl" id="username" type="email" placeholder="email" v-model="email">
    </div>
    <div class="mb-2">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border border-[#00bcf1]	 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline  hover:shadow-xl" id="password" type="password" placeholder="***********" v-model="password">
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-[#00bcf1] hover:bg-[#02a6d4] hover:shadow-xl text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button" v-on:click="onSubmit">
        Register
      </button>
    </div>
      <button class="px-14 pt-3 inline-block align-baseline font-bold text-sm text-[#00bcf1] hover:text-[#02a6d4] hover:underline" v-on:click="register_login">
        Click here to login</button>
  </form>

</div>
<div v-if="isLoading===true">
  <div class="bg-white max-w-full max-h-full fixed px-96 inset-0">
    <div class="max-h-10 w-10 bg-[#00bcf1] items-center justify-center pt-10 relative top-60 left-52 rounded-sm animate-spin	"></div>
    <h1 class="text-base relative top-64 left-48">Loading...</h1>
  </div>
</div>
</div>

</template>
<script>
import axios from 'axios';
import { useToast } from 'vue-toast-notification';
const toast = useToast();

export default {
  name: 'RegisterForm',
  
  data() {
    return {
      name: '',
      rollno: '',
      email: '',
      password: '',
      isLoading: false
    };
  },
  methods: {
    async onSubmit() {
      const userData = {
        name: this.name,
        rollno: this.rollno,
        email: this.email,
        password: this.password
      };

      try {

        


        const response = await axios.post('http://localhost:8001/register', userData);
        if (response.data.success) {
          this.isLoading = true;
          console.log('User registered successfully:', response.data.user);
          localStorage.setItem("LoggedIn", "true");
          localStorage.setItem("name", this.name);
          localStorage.setItem("rollno", this.rollno);
          localStorage.setItem("email", this.email);
          toast.success('Registration successful and logging in...');
          
          setTimeout(() => {
            this.isLoading = false;
            router.push('/home');
      }, 2000);
        } else {
          console.error('Registration failed:', response.data.message);
          toast.error('Registration failed');
          // Handle registration failure
        }
      } catch (error) {
        console.error('Error registering user:', error);
        toast.error('Error registering user');
        this.isLoading = false;

        // Handle error
      } finally {
        this.isLoading = false;
      }
    },
    register_login() {
      router.push('/');
    }
  }
}
</script>

<style scoped>
    #heading{
  font-family: "Orbitron", sans-serif;
  font-optical-sizing: auto;
  font-size: 30px;
  color: rgb(77, 77, 77);
}
</style>