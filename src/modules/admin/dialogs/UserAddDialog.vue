<script setup>
import {defineProps, defineEmits, ref} from 'vue';
import {IconX, IconDeviceFloppy, IconUserCircle, IconEye, IconEyeOff} from '@tabler/icons-vue'

const rol = ref('');
const companyImage = ref(null);
const companyName = ref('');
const ruc = ref('');
const department = ref('');
const province = ref('');
const district = ref('');
const contact = ref('');
const phone = ref('');
const email = ref('');
const username = ref('');
const password = ref('');
const resolutionFile = ref(null);
const unitDelimiter = ref('');

const isPasswordVisible = ref(false);

const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
  const passwordInput = document.getElementById('password-input');
  if (passwordInput) {
    passwordInput.type = isPasswordVisible.value ? 'text' : 'password';
  }
};

const onCompanyImageChange = (e) => {
  companyImage.value = e.target.files[0];
};

const onResolutionFileChange = (e) => {
  resolutionFile.value = e.target.files[0];
};

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['close']);
</script>

<template>
  <div v-if="isOpen"
       class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div
        class="relative p-4 w-full max-w-4xl max-h-full bg-white rounded-lg shadow-lg dark:bg-gray-700 overflow-y-auto">
      <!-- Modal header -->
      <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Nuevo usuario</h3>
        <button @click="emit('close')"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <!-- Modal body -->
      <div class="p-6 space-y-4">
        <form>
          <!-- Rol -->
          <div class="grid grid-cols-3">
            <div>
              <label for="rol" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rol</label>
              <select id="rol" v-model="rol"
                      class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Seleccione Rol</option>
                <option value="municipalidad">Municipalidad</option>
                <option value="empresa">Empresa</option>
                <option value="policia">Policia</option>
                <option value="rn">Registro Nacional</option>
              </select>
            </div>
          </div>
          <!-- Datos de la empresa -->
          <h3 class="text-[16px] font-semibold text-colorTextLight dark:text-white">Datos de la empresa</h3>
          <div class="grid grid-cols-3 gap-x-6 gap-y-4 mt-4">
            <div>
              <label for="companyImage" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen de
                perfil</label>
              <input
                  id="companyImage"
                  type="file"
                  @change="onCompanyImageChange"
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <div>
              <label for="companyName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de la
                Empresa</label>
              <input type="text" id="companyName" v-model="companyName" placeholder="Ingrese el nombre de la empresa"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div>
              <label for="ruc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RUC</label>
              <input type="text" id="ruc" v-model="ruc" placeholder="Ingrese el RUC"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div>
              <label for="department"
                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Departamento</label>
              <input type="text" id="department" v-model="department" placeholder="Ingrese el departamento"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div>
              <label for="province"
                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Provincia</label>
              <input type="text" id="province" v-model="province" placeholder="Ingrese la provincia"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div>
              <label for="district"
                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distrito</label>
              <input type="text" id="district" v-model="district" placeholder="Ingrese el distrito"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
          </div>
          <!-- Datos del Contacto -->
          <h3 class="mt-6 text-[16px] font-semibold text-colorTextLight dark:text-white">Datos del Contacto</h3>
          <div class="grid grid-cols-3 gap-x-6 gap-y-4 mt-4">
            <div>
              <label for="contact" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contacto</label>
              <input type="text" id="contact" v-model="contact" placeholder="Ingrese el nombre del contacto"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div>
              <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
              <input type="tel" id="phone" v-model="phone" placeholder="Ingrese el teléfono"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email" id="email" v-model="email" placeholder="Ingrese el email"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
          </div>
          <!-- Datos de Acceso -->
          <h3 class="mt-6 text-[16px] font-semibold text-colorTextLight dark:text-white">Datos de Acceso</h3>
          <div class="grid grid-cols-2 gap-x-6 gap-y-4 mt-4">
            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
              <div class="flex">
                <span
                    class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <IconUserCircle class="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                </span>
                <input type="text" id="username" v-model="username" placeholder="Ingrese nombre de usuario"
                       class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
            </div>
            <div class="relative">
              <label for="password-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
              <div class="relative">
                <input type="password" id="password-input" v-model="password" placeholder="Ingrese la contraseña"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <button type="button" @click="togglePassword"
                        class="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400">
                  <component :is="isPasswordVisible ? IconEye : IconEyeOff" class="w-5 h-5"/>
                </button>
              </div>
            </div>
          </div>
          <!-- Perminos y Delimitaciones (sólo para rol "empresa") -->
          <template v-if="rol === 'empresa'">
            <h3 class="mt-6 text-[16px] font-semibold text-colorTextLight dark:text-white">Perminos y
              Delimitaciones</h3>
            <div class="grid grid-cols-2 gap-x-6 gap-y-4 mt-4">
              <div>
                <label for="resolutionFile" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Resolución
                  Municipal</label>
                <input
                    id="resolutionFile"
                    type="file"
                    @change="onResolutionFileChange"
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div>
                <label for="unitDelimiter" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Delimitación
                  de unidades</label>
                <input type="number" id="unitDelimiter" v-model="unitDelimiter"
                       placeholder="Ingrese el número de unidades"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
            </div>
          </template>
        </form>
      </div>
      <!-- Modal footer -->
      <div class="flex flex-row-reverse gap-6 items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
            class="flex items-center gap-2.5 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
          <IconDeviceFloppy/>
          Guardar
        </button>
        <button @click="emit('close')"
                class="flex items-center gap-2.5 py-2.5 px-5 ms-3 text-sm font-medium text-red-400 focus:outline-none bg-white rounded-lg border border-red-400 hover:bg-red-50 hover:text-red-400 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          <IconX/>
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
