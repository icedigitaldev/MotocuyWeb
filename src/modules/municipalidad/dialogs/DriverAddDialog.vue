<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { IconX, IconDeviceFloppy } from '@tabler/icons-vue';

const licencia = ref('');
const nombre = ref('');
const categoria = ref('');
const restricciones = ref('');
const fechaExpedicion = ref('');
const fechaVencimiento = ref('');

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['close', 'save']);
</script>

<template>
  <div v-if="isOpen"
       class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="relative p-4 w-full max-w-3xl max-h-full bg-white rounded-lg shadow-lg dark:bg-gray-700 overflow-y-auto">
      <!-- Modal header -->
      <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Nuevo conductor</h3>
        <button @click="emit('close')"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <IconX />
        </button>
      </div>
      <!-- Modal body -->
      <div class="px-6 py-5   space-y-4">
        <form @submit.prevent="emit('save', { licencia, nombre, categoria, restricciones, fechaExpedicion, fechaVencimiento })">
          <div class="grid grid-cols-2 gap-x-6 gap-y-4 mt-4">
            <div>
              <label for="licencia" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Licencia</label>
              <input type="text" id="licencia" v-model="licencia" placeholder="Ingrese la licencia"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
            <div>
              <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
              <input type="text" id="nombre" v-model="nombre" placeholder="Ingrese el nombre del conductor"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
            <div>
              <label for="categoria" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría</label>
              <input type="text" id="categoria" v-model="categoria" placeholder="Ingrese la categoría de licencia"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
            <div>
              <label for="restricciones" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Restricciones</label>
              <input type="text" id="restricciones" v-model="restricciones" placeholder="Ingrese restricciones"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
            <div>
              <label for="fechaExpedicion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de expedición</label>
              <input type="date" id="fechaExpedicion" v-model="fechaExpedicion"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
            <div>
              <label for="fechaVencimiento" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de vencimiento</label>
              <input type="date" id="fechaVencimiento" v-model="fechaVencimiento"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
          </div>
        </form>
      </div>
      <!-- Modal footer -->
      <div class="flex flex-row-reverse gap-6 items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button @click="emit('save', { licencia, nombre, categoria, restricciones, fechaExpedicion, fechaVencimiento })"
                class="flex items-center gap-2.5 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
          <IconDeviceFloppy />
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
