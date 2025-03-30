<script setup>
// IMPORTS DE VUE
import { ref, computed, watch, nextTick, onMounted } from 'vue';
// IMPORTS DE COMPONENTES Y ICONOS
import UniversalContainerLayout from '@/components/UniversalContainerLayout.vue';
import { IconRotate2, IconFilterSearch } from '@tabler/icons-vue';
// IMPORTS DE DATOS JSON
import departamentos from '@/data/json-ubigeo/ubigeo_peru_2016_departamentos.json';
import provincias from '@/data/json-ubigeo/ubigeo_peru_2016_provincias.json';
import distritos from '@/data/json-ubigeo/ubigeo_peru_2016_distritos.json';
// IMPORT DEL DATEPICKER DE FLOWBITE
import { Datepicker } from 'flowbite-datepicker';

// Variables reactivas de los selects
const selectedDepartamento = ref('');
const selectedProvincia = ref('');
const selectedDistrito = ref('');

// Computed: Provincias filtradas según selectedDepartamento
const filteredProvincias = computed(() => {
  if (!selectedDepartamento.value) return [];
  return provincias.filter((prov) => prov.department_id === selectedDepartamento.value);
});

// Computed: Distritos filtrados según selectedProvincia
const filteredDistritos = computed(() => {
  if (!selectedProvincia.value) return [];
  return distritos.filter((dist) => dist.province_id === selectedProvincia.value);
});

// Variables reactivas para las fechas
const fechaExpedicion = ref('');
const fechaVencimiento = ref('');

// Inicializa los datepickers una sola vez
const initDatepickers = () => {
  const fechaExpedicionInput = document.getElementById('fechaExpedicionInput');
  const fechaVencimientoInput = document.getElementById('fechaVencimientoInput');

  // Si no están instanciados, se crean
  if (fechaExpedicionInput && !fechaExpedicionInput._datepicker) {
    fechaExpedicionInput._datepicker = new Datepicker(fechaExpedicionInput, {
      format: 'yyyy-mm-dd',
      autohide: true,
      orientation: 'auto',
    });
  }

  if (fechaVencimientoInput && !fechaVencimientoInput._datepicker) {
    fechaVencimientoInput._datepicker = new Datepicker(fechaVencimientoInput, {
      format: 'yyyy-mm-dd',
      autohide: true,
      orientation: 'auto',
    });
  }
};

// Watchers para encadenar las selecciones
watch(selectedDepartamento, () => {
  selectedProvincia.value = '';
  selectedDistrito.value = '';
});

watch(selectedProvincia, () => {
  selectedDistrito.value = '';
});

// Montamos datepickers al inicio
onMounted(() => {
  initDatepickers();
});

// Función para resetear todos los filtros (incluyendo datepickers)
const resetFilters = async () => {
  // Resetea todas las variables
  selectedDepartamento.value = '';
  selectedProvincia.value = '';
  selectedDistrito.value = '';
  fechaExpedicion.value = '';
  fechaVencimiento.value = '';

  // Esperamos a que el DOM se actualice antes de tocar datepickers
  await nextTick();

  // Asegurarnos de que los datepickers se limpien
  const fechaExpedicionInput = document.getElementById('fechaExpedicionInput');
  const fechaVencimientoInput = document.getElementById('fechaVencimientoInput');
  if (fechaExpedicionInput && fechaExpedicionInput._datepicker) {
    fechaExpedicionInput._datepicker.clear();
  }
  if (fechaVencimientoInput && fechaVencimientoInput._datepicker) {
    fechaVencimientoInput._datepicker.clear();
  }

  // Re-inicializamos (por si hiciera falta tras limpiar)
  initDatepickers();
};
</script>

<template>
  <UniversalContainerLayout>
    <div class="grid grid-cols-12 gap-6">
      <!-- SELECT DEPARTAMENTO -->
      <select
        id="select-departamento"
        v-model="selectedDepartamento"
        class="col-span-12 md:col-span-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm
               rounded-lg focus:ring-blue-500 focus:border-blue-500
               block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
               dark:placeholder-gray-400 dark:text-white
               dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option disabled value="">Departamento</option>
        <option v-for="dep in departamentos" :key="dep.id" :value="dep.id">
          {{ dep.name }}
        </option>
      </select>

      <!-- SELECT PROVINCIA -->
      <select
        id="select-provincia"
        v-model="selectedProvincia"
        :disabled="!selectedDepartamento"
        class="col-span-12 md:col-span-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm
               rounded-lg focus:ring-blue-500 focus:border-blue-500
               block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
               dark:placeholder-gray-400 dark:text-white
               dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option disabled value="">Provincia</option>
        <option v-for="prov in filteredProvincias" :key="prov.id" :value="prov.id">
          {{ prov.name }}
        </option>
      </select>

      <!-- SELECT DISTRITO -->
      <select
        id="select-distrito"
        v-model="selectedDistrito"
        :disabled="!selectedProvincia"
        class="col-span-12 md:col-span-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm
               rounded-lg focus:ring-blue-500 focus:border-blue-500
               block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
               dark:placeholder-gray-400 dark:text-white
               dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option disabled value="">Distrito</option>
        <option v-for="dist in filteredDistritos" :key="dist.id" :value="dist.id">
          {{ dist.name }}
        </option>
      </select>

      <!-- Filtrar Desde (Flowbite Datepicker) -->
      <div class="col-span-12 md:col-span-4">
        <label for="fechaExpedicion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Filtrar desde
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
              />
            </svg>
          </div>
          <input
            datepicker
            id="fechaExpedicionInput"
            v-model="fechaExpedicion"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5
                   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                   dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Seleccione fecha de inicio"
          />
        </div>
      </div>

      <!-- Filtrar Hasta (Flowbite Datepicker) -->
      <div class="col-span-12 md:col-span-4">
        <label for="fechaVencimiento" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Filtrar hasta
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
              />
            </svg>
          </div>
          <input
            datepicker
            id="fechaVencimientoInput"
            v-model="fechaVencimiento"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5
                   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                   dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Seleccione fecha de fin"
          />
        </div>
      </div>

      <!-- Botones de Restablecer y Filtrar -->
      <div class="col-span-12 md:col-span-4">
        <div class="flex w-full h-full items-end gap-4">
          <!-- Botón Restablecer -->
          <div
            class="md:tooltip w-full h-[44px] md:tooltip-left bg-gray-200
                   dark:bg-gray-800 flex-[0.2] justify-center dark:border-gray-600
                   font-bold text-colorAlert flex items-center gap-2.5 p-3 text-[12px]
                   md:text-[14px] cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800
                   rounded-lg"
            data-tip="Restablecer filtros"
            @click="resetFilters"
          >
            <IconRotate2 class="w-5 md:w-6" />
            <span class="flex md:hidden">Restablecer</span>
          </div>
          <!-- Botón Filtrar -->
          <button
            class="flex justify-center w-full items-center gap-2.5 text-white bg-blue-700
                   hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                   dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <IconFilterSearch />
            Filtrar
          </button>
        </div>
      </div>
    </div>
  </UniversalContainerLayout>
</template>

<style scoped>
/* Estilos de tu componente (si los necesitas) */
</style>
