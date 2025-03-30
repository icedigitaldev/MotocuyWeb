<script setup>
import { ref } from 'vue';
import { IconDeviceFloppy, IconSend, IconMoodEdit } from '@tabler/icons-vue';
import { logInfo, logError } from '@/utils/logger.js';
import { onMounted } from 'vue';
import { initFlowbite } from 'flowbite';

onMounted(() => {
  initFlowbite();
});

import fotoPerfil from '@/assets/profile.jpg';

const perfilAdmin = ref({
  nombreAdmin: '',
  rucAdmin: '',
  contactoAdmin: '',
  correoAdmin: '',
  telefonoAdmin: '',
  departamentoAdmin: '',
  provinciaAdmin: '',
  distritoAdmin: '',
  telefonoSerenazgoAdmin: '',
  correoCambioAdmin: '',
  fotoAdmin: fotoPerfil
});

const fileInputAdmin = ref(null);

const cambiarFotoPerfilAdmin = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      perfilAdmin.value.fotoAdmin = e.target.result;
    };
    reader.readAsDataURL(file);
    subirFotoPerfilAdmin(file);
  }
};

const subirFotoPerfilAdmin = async (file) => {
  try {
    logInfo("Subiendo nueva foto de perfil");
    // Aquí iría la lógica para subir la foto a la base de datos
  } catch (error) {
    logError("Error al subir la foto de perfil: " + error.message);
  }
};

const guardarCambiosAdmin = async () => {
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
        <div class="w-[130px] h-[130px] rounded-full relative">
          <img :src="perfilAdmin.fotoAdmin" class="w-full h-full object-cover rounded-full">
          <input type="file" accept="image/*" class="hidden" ref="fileInputAdmin" @change="cambiarFotoPerfilAdmin">
          <div class="tooltip absolute bottom-0 right-0" data-tip="Editar Perfil">
            <button @click="fileInputAdmin.click()"
                    data-tooltip-target="tooltip-default"
                    class="p-2 bg-[#1814F3] w-fit rounded-full text-white">
              <IconMoodEdit/>
            </button>
          </div>
        </div>
      </section>
      <section class="flex-1">
        <form class="grid grid-cols-12 gap-7" @submit.prevent="guardarCambiosAdmin">
          <div class="col-span-12 md:col-span-6">
            <label for="nombreAdmin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
            <input v-model="perfilAdmin.nombreAdmin" type="text" id="nombreAdmin" placeholder="Nombre de la cuenta"
                   class="input-class">
          </div>
          <div class="col-span-12 md:col-span-6">
            <label for="rucAdmin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RUC</label>
            <input v-model="perfilAdmin.rucAdmin" type="text" id="rucAdmin" placeholder="RUC de la cuenta" class="input-class">
          </div>
          <div class="col-span-12 md:col-span-4">
            <label for="contactoAdmin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contacto</label>
            <input v-model="perfilAdmin.contactoAdmin" type="text" id="contactoAdmin" placeholder="Nombre del contacto"
                   class="input-class">
          </div>
          <div class="col-span-12 md:col-span-4">
            <label for="correoAdmin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo
              Electrónico</label>
            <input v-model="perfilAdmin.correoAdmin" type="email" id="correoAdmin" placeholder="contacto@gmail.com"
                   class="input-class">
          </div>
          <div class="col-span-12 md:col-span-4">
            <label for="telefonoAdmin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
            <input v-model="perfilAdmin.telefonoAdmin" type="tel" id="telefonoAdmin" placeholder="+51 959 659 503" class="input-class">
          </div>
          <div class="col-span-12 md:col-span-4">
            <label for="departamentoAdmin"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Departamento</label>
            <input v-model="perfilAdmin.departamentoAdmin" type="text" id="departamentoAdmin" placeholder="San Martín"
                   class="input-class">
          </div>
          <div class="col-span-12 md:col-span-4">
            <label for="provinciaAdmin"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Provincia</label>
            <input v-model="perfilAdmin.provinciaAdmin" type="text" id="provinciaAdmin" placeholder="Rioja" class="input-class">
          </div>
          <div class="col-span-12 md:col-span-4">
            <label for="distritoAdmin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distrito</label>
            <input v-model="perfilAdmin.distritoAdmin" type="text" id="distritoAdmin" placeholder="Nueva Cajamarca"
                   class="input-class">
          </div>
          <div class="col-span-12 md:col-span-6">
            <label for="telefonoSerenazgoAdmin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono
              Serenazgo</label>
            <input v-model="perfilAdmin.telefonoSerenazgoAdmin" type="tel" id="telefonoSerenazgoAdmin" placeholder="+51 959 659 503"
                   class="input-class">
          </div>
          <div class="col-span-12 md:col-span-6">
            <label for="correoCambioAdmin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cambiar
              Contraseña</label>
            <div class="flex gap-2">
              <input v-model="perfilAdmin.correoCambioAdmin" type="email" id="correoCambioAdmin"
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
