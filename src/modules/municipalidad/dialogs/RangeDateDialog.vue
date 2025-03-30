<script setup>
import { defineProps, defineEmits } from 'vue';

// Recibimos las propiedades desde el componente padre
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  // Rango de fechas temporal (lo que el usuario manipula en el modal)
  tempRange: {
    type: Object,
    default: () => ({
      start: '',
      end: ''
    })
  }
});

// Definimos los eventos que podemos emitir al padre
const emits = defineEmits(['cancel', 'apply']);

// Funciones internas para emitir
const cancel = () => {
  emits('cancel'); // Notificamos que el usuario canceló
};

const apply = () => {
  // Notificamos que el usuario confirmó, pasando el rango de fechas
  emits('apply', props.tempRange);
};
</script>

<template>
  <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
  >
    <div
        class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg relative"
    >
      <h2 class="text-lg font-semibold mb-4 dark:text-white">
        Seleccionar Rango de Fechas
      </h2>
      <!-- Inputs de fecha de inicio y fin -->
      <div class="flex flex-col gap-4">
        <div>
          <label
              class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Fecha Inicio
          </label>
          <input
              type="date"
              v-model="tempRange.start"
              class="w-full p-2 text-sm text-gray-900 border border-gray-300
                   rounded-lg bg-gray-50 placeholder-gray-400 focus:ring-blue-500
                   focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                   dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div>
          <label
              class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Fecha Fin
          </label>
          <input
              type="date"
              v-model="tempRange.end"
              class="w-full p-2 text-sm text-gray-900 border border-gray-300
                   rounded-lg bg-gray-50 placeholder-gray-400 focus:ring-blue-500
                   focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                   dark:placeholder-gray-400 dark:text-white"
          />
        </div>
      </div>
      <!-- Botones de acción -->
      <div class="mt-6 flex justify-end gap-4">
        <button
            type="button"
            class="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800
                 rounded-md dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            @click="cancel"
        >
          Cancelar
        </button>
        <button
            type="button"
            class="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            @click="apply"
        >
          Hecho
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos propios, si los necesitas */
</style>
