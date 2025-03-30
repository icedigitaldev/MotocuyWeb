<script setup>
import { defineProps, defineEmits, ref, onMounted, watch, nextTick } from 'vue';
import { IconX, IconDeviceFloppy } from '@tabler/icons-vue';
import { initFlowbite, Datepicker } from 'flowbite';
import { fetchLicenciaInfo } from '@/services/factiliza_service.js'; 


// Variables reactivas para el formulario
const licencia = ref('');
const nombre = ref('');
const categoria = ref('');
const restricciones = ref('');
const fechaExpedicion = ref('');
const fechaVencimiento = ref('');

// Props y eventos para controlar el modal
const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['close', 'save']);
onMounted(() => {
  if (props.isOpen) {
    initDatepickers();
  }
});
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    nextTick(() => {
      initDatepickers();
      fetchLicenciaInfo('27772094')
        .then(data => {
          console.log('Datos de la licencia (al abrir modal):', data);
        })
        .catch(err => {
          console.error('Error al obtener la licencia (al abrir modal):', err);
        });
    });
  }
});
const initDatepickers = () => {
  const fechaExpedicionInput = document.getElementById('fechaExpedicionInput');
  const fechaVencimientoInput = document.getElementById('fechaVencimientoInput');

  if (fechaExpedicionInput && !fechaExpedicionInput._datepicker) {
    new Datepicker(fechaExpedicionInput, {
      format: 'yyyy-mm-dd',
      autohide: true,
      orientation: 'auto',
    });
  }

  if (fechaVencimientoInput && !fechaVencimientoInput._datepicker) {
    new Datepicker(fechaVencimientoInput, {
      format: 'yyyy-mm-dd',
      autohide: true,
      orientation: 'auto',
    });
  }
};

</script>

<template>
  <div v-if="isOpen" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50">
    <div class="flex justify-center items-start md:mt-20 h-full">
      <div class="relative p-4 w-full max-w-3xl max-h-full bg-white rounded-lg shadow-lg dark:bg-gray-700 overflow-y-auto">
        <!-- Cabecera del modal -->
        <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Nuevo conductor</h3>
          <button @click="emit('close')" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <IconX />
          </button>
        </div>
        <!-- Cuerpo del modal -->
        <div class="px-6 py-5 space-y-4">
          <form @submit.prevent="emit('save', { licencia, nombre, categoria, restricciones, fechaExpedicion, fechaVencimiento })">
            <div class="grid grid-cols-2 gap-x-6 gap-y-4 mt-4">
              <!-- Licencia -->
              <div class="col-span-2 md:col-span-1">
                <label for="licencia" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Licencia</label>
                <input type="text" id="licencia" v-model="licencia" placeholder="Ingrese la licencia"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              </div>
              <!-- Nombre -->
              <div class="col-span-2 md:col-span-1">
                <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                <input type="text" id="nombre" v-model="nombre" placeholder="Ingrese el nombre del conductor"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              </div>
              <!-- Categoría -->
              <div class="col-span-2 md:col-span-1">
                <label for="categoria" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría</label>
                <input type="text" id="categoria" v-model="categoria" placeholder="Ingrese la categoría de licencia"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              </div>
              <!-- Restricciones -->
              <div class="col-span-2 md:col-span-1">
                <label for="restricciones" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Restricciones</label>
                <input type="text" id="restricciones" v-model="restricciones" placeholder="Ingrese restricciones"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              </div>
              <!-- Fecha de Expedición con Flowbite Datepicker -->
              <div class="col-span-2 md:col-span-1">
                <label for="fechaExpedicion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de expedición</label>
                <div class="relative max-w-sm">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                    </svg>
                  </div>
                  <input datepicker id="fechaExpedicionInput" v-model="fechaExpedicion" type="text"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="Seleccione fecha de expedición">
                </div>
              </div>
              <!-- Fecha de Vencimiento con Flowbite Datepicker -->
              <div class="col-span-2 md:col-span-1">
                <label for="fechaVencimiento" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de vencimiento</label>
                <div class="relative max-w-sm">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                    </svg>
                  </div>
                  <input datepicker id="fechaVencimientoInput" v-model="fechaVencimiento" type="text"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="Seleccione fecha de vencimiento">
                </div>
              </div>
            </div>
          </form>
        </div>
        <!-- Pie del modal -->
        <div class="flex flex-row-reverse gap-6 items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button @click="emit('save', { licencia, nombre, categoria, restricciones, fechaExpedicion, fechaVencimiento })"
                  class="flex items-center gap-2.5 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
            <IconDeviceFloppy />
            Guardar
          </button>
          <button @click="emit('close')"
                  class="flex items-center gap-2.5 py-2.5 px-5 ms-3 text-sm font-medium text-red-400 focus:outline-none bg-white rounded-lg border border-red-400 hover:bg-red-50 hover:text-red-400 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            <IconX />
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos para el datepicker en dispositivos móviles */
@media (max-width: 640px) {
  .datepicker {
    width: 100%;
    max-width: 100%;
  }

  .datepicker-dropdown {
    width: 100%;
    max-width: 100%;
    left: 0 !important;
    right: 0 !important;
    transform: none !important;
  }
}
</style>