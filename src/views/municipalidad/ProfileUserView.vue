<script setup>
import {ref} from 'vue';
import {IconDeviceFloppy, IconSend, IconMoodEdit} from '@tabler/icons-vue';
import {logInfo, logError} from '@/utils/logger.js';
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
onMounted(() => {
  initFlowbite();
})

import fotoPerfil from '@/assets/profile.jpg';



const perfil = ref({
  nombre: '',
  ruc: '',
  contacto: '',
  correo: '',
  telefono: '',
  departamento: '',
  provincia: '',
  distrito: '',
  telefono_serenazgo: '',
  correo_cambio: '',
  foto:  fotoPerfil
});

const fileInput = ref(null);

const cambiarFotoPerfil = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      perfil.value.foto = e.target.result;
    };
    reader.readAsDataURL(file);
    subirFotoPerfil(file);
  }
};

const subirFotoPerfil = async (file) => {
  try {
    logInfo("Subiendo nueva foto de perfil");
    // Aquí iría la lógica para subir la foto a la base de datos
  } catch (error) {
    logError("Error al subir la foto de perfil: " + error.message);
  }
};

const guardarCambios = async () => {
  try {
    logInfo("Guardando cambios del perfil");
    // Aquí iría la lógica para enviar los datos a la BD
  } catch (error) {
    logError("Error al guardar cambios: " + error.message);
  }
};
</script>

<template>
  <section>
    <header class="mb-8">
      <h1 class="text-colorText333 text-[28px] md:text-[32px] font-bold dark:text-white">
        Perfil Municipalidad
      </h1>
    </header>
    <main class="bg-white dark:bg-colorsecundary flex flex-col lg:flex-row items-center lg:items-start gap-8 rounded-[20px] p-[50px]">
      <section>
        <div class="w-[130px] h-[130px] rounded-full relative "  >
          <img :src="perfil.foto" class="w-full h-full object-cover rounded-full">
          <input type="file" accept="image/*" class="hidden" ref="fileInput" @change="cambiarFotoPerfil">
         <div class="tooltip absolute bottom-0 right-0" data-tip="Editar Perfil">
           <button @click="fileInput.click()"
                   data-tooltip-target="tooltip-default"
                   class="p-2 bg-[#1814F3] w-fit rounded-full text-white ">
             <IconMoodEdit/>
           </button>
         </div>
        </div>
      </section>
      <section class="flex-1">
        <form class="grid grid-cols-12 gap-7" @submit.prevent="guardarCambios">
          <div class="col-span-12 md:col-span-6">
            <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
            <input v-model="perfil.nombre" type="text" id="nombre" placeholder="Nombre de la cuenta"
                   class="input-class">
          </div>
          <div class="col-span-12 md:col-span-6">
            <label for="ruc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RUC</label>
            <input v-model="perfil.ruc" type="text" id="ruc" placeholder="RUC de la cuenta" class="input-class">
          </div>
          <div class="col-span-12 md:col-span-4">
            <label for="contacto" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contacto</label>
            <input v-model="perfil.contacto" type="text" id="contacto" placeholder="Nombre del contacto"
                   class="input-class">
          </div>
          <div class="col-span-12 md:col-span-4">
            <label for="correo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo
              Electrónico</label>
            <input v-model="perfil.correo" type="email" id="correo" placeholder="contacto@gmail.com"
                   class="input-class">
          </div>
          <div class="col-span-12 md:col-span-4">
            <label for="telefono" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
            <input v-model="perfil.telefono" type="tel" id="telefono" placeholder="+51 959 659 503" class="input-class">
          </div>
          <div class="col-span-12 md:col-span-4">
            <label for="departamento"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Departamento</label>
            <input v-model="perfil.departamento" type="text" id="departamento" placeholder="San Martín"
                   class="input-class">
          </div>
          <div class="col-span-12 md:col-span-4">
            <label for="provincia"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Provincia</label>
            <input v-model="perfil.provincia" type="text" id="provincia" placeholder="Rioja" class="input-class">
          </div>
          <div class="col-span-12 md:col-span-4">
            <label for="distrito" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distrito</label>
            <input v-model="perfil.distrito" type="text" id="distrito" placeholder="Nueva Cajamarca"
                   class="input-class">
          </div>
          <div class="col-span-12 md:col-span-6">
            <label for="telefono_serenazgo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono
              Serenazgo</label>
            <input v-model="perfil.telefono_serenazgo" type="tel" id="telefono_serenazgo" placeholder="+51 959 659 503"
                   class="input-class">
          </div>
          <div class="col-span-12 md:col-span-6">
            <label for="correo_cambio" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cambiar
              Contraseña</label>
            <div class="flex gap-2">
              <input v-model="perfil.correo_cambio" type="email" id="correo_cambio"
                     placeholder="Ingrese Correo Electrónico de la cuenta" class="input-class">
              <div class="tooltip" data-tip="Cambiar Contraseña">
                <button class="btn-icon h-full">
                  <IconSend/>
                </button>
              </div>
            </div>
          </div>
          <div class="col-span-12 mt-6 flex justify-end">
            <button type="submit" class="btn-submit">
              <IconDeviceFloppy/>
              Guardar cambios
            </button>
          </div>
        </form>
      </section>
    </main>
  </section>
</template>

<style scoped>
</style>
