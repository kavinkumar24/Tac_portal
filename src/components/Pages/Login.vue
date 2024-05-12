


<template>
    <div class="absolute inset-0  flex items-center justify-center">
   <div class="w-full max-w-xs relative">
  <form class="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 max-w-96 h-1/5">
    <div class="flex justify-center mb-8">
    <img src="../assets/management.png" class="h-16 w-16"/>
    <h1 id="heading" class="inline ml-2 mt-2">Tac</h1>
  </div>
    <div class="mb-4 mt-4">

      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Email
      </label>
      <input class="border-[#00bcf1] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-2xl" id="username" type="text" placeholder="email" v-model="email">
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border border-[#00bcf1]	 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline  hover:shadow-xl" id="password" type="password" placeholder="***********" v-model="password">
      <p class="text-[#142c74] text-xs italic ml-10">Sign in with bitsathy credentials</p>
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-[#00bcf1] hover:bg-[#02a6d4] hover:shadow-xl text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button" v-on:click="onSubmit">
        Sign In
      </button>
    </div>
      <button class=" px-14 pt-3 inline-block align-baseline font-bold text-sm text-[#00bcf1] hover:text-[#02a6d4] hover:underline" @click="navigate_register">
        Click here to Register</button>
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
import router from '../../router'
import { useToast } from 'vue-toast-notification';
const toast = useToast();

export default {
    name: 'LoginForm',
    data(){
      return {
        email:'',
        password:'',
        isLoading:false,
        name:''
      }
    },
    methods:{
      onSubmit() {
       
      this.isLoading = true;
      const userData = {
        email: this.email,
        password: this.password
      };
    router.push('/home')
      axios.post('http://localhost:8001/', userData)
        .then(response => {
          if(response.data.user.email==this.email && response.data.user.password==this.password){
          setTimeout(() => {  
            localStorage.setItem("LoggedIn", "true");
            localStorage.setItem("name", response.data.user.name);
            localStorage.setItem("rollno", response.data.user.rollno);
            localStorage.setItem("email", this.email);
            console.log(response)
            console.log("logging")
            this.isLoading = false
            router.push('/home')
            

          }, 3000);
          }
          else{
        this.isLoading = false
        console.log("Invalid");
        }
        
        })
        .catch(error => {
          this.isLoading = false
          console.error('Error:', error);
          toast.error('Invalid Credentials')

    
        });
    },
    navigate_register(){
      router.push('/register')
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
