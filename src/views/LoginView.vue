<script setup>
import { ref } from "vue";
import { IconLockFilled, IconMailFilled, IconEye, IconEyeOff } from '@tabler/icons-vue';


//---  Toggle mostrar y ocultar Contraseña ---//
const showPassword = ref(false);
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
//--- End Toggle mostrar y ocultar Contraseña ---//

</script>

<template>
  <section class="flex p-5  md:h-screen bg-white dark:bg-colorBgDark">

    <!-- Container Banner -->
    <div class="flex-1 h-full w-full hidden  md:flex justify-center items-center bg-[#005CEF] rounded-3xl">
      <img src="/banerLogin.png" alt="Baner de Motocuy">
    </div>

    <!-- Container Form -->
   <div class="md:px-[45px] flex justify-center items-center">
     <div class="max-w-md mx-auto mt-6 p-6 md:p-[35px] bg-white rounded-lg shadow-md dark:bg-colorBgDark">
       <div class="flex items-start justify-start flex-col">
         <img src="/logo.svg" alt="Logo de Motocuy" class="w-[60px] md:w-[70px] mb-3">
         <h1 class="text-colorBgDark dark:text-white text-[22px] md:text-[28px] font-extrabold uppercase">Bienvenido a Motocuy!</h1>
         <p class="text-gray-600 dark:text-gray-300 text-[14px] md:text-[16px] leading-[27px] tracking-[0.32px]">Por favor Ingrese sus credenciales para ingresar al sistema</p>
       </div>

       <form class="mt-6 text-end">
         <!-- Input Email -->
         <div class="relative mb-4">
           <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
             <IconMailFilled class="w-5 h-5 text-gray-500 dark:text-gray-400" :stroke="2" />
           </div>
           <input
               type="text"
               id="input-email"
               class="bg-gray-100 border-none h-[60px] text-colorText333 text-[16px]  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Dirección Email"
           />
         </div>

         <!-- Input Password -->
         <div class="relative mb-1">
           <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
             <IconLockFilled class="w-5 h-5 text-gray-500 dark:text-gray-400" :stroke="2" />
           </div>
           <input
               :type="showPassword ? 'text' : 'password'"
               id="input-password"
               class="bg-gray-100 pr-10 border-none h-[60px] text-colorText333 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Password"
           />
           <!-- Botón para alternar visibilidad de la contraseña -->
           <button
               type="button"
               class="absolute inset-y-0 end-3 flex items-center text-gray-500 dark:text-gray-400"
               @click="togglePasswordVisibility"
               aria-label="Toggle Password Visibility"
           >
             <IconEye v-if="!showPassword" class="w-6 h-6" :stroke="2" />
             <IconEyeOff v-else class="w-6 h-6" :stroke="2" />
           </button>
         </div>
         <a href="/public" class="colorText333 dark:text-white text-[12px] leading-[13px] font-normal ">¿Olvidaste tu contraseña?</a>

         <!-- Botón de Login -->
         <button
             type="submit"
             class="w-full mt-6 bg-blue-600 text-[16px] text-white font-bold py-[18px] rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600"
         >
           <RouterLink to="/admin">Ingresar</RouterLink>
         </button>

         <div class="w-full text-center mt-6">
           <span class="colorText333 dark:text-white font-normal text-[16px] leading-[27px] tracking-[0.32px]">¿No tienes una cuenta? <a href="/public" class="text-colorPrimary">Contáctanos</a></span>
         </div>

       </form>
     </div>
   </div>
  </section>
</template>
