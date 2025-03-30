<script setup>
import { ref, computed, watch } from 'vue';
import {
  IconFilter,
  IconSearch,
  IconRotate2,
  IconSquarePlus,
  IconEdit,
  IconTrash
} from '@tabler/icons-vue';
import UniversalContainerLayout from '../../components/UniversalContainerLayout.vue'
// Importar datos JSON
import departamentos from '@/data/json-ubigeo/ubigeo_peru_2016_departamentos.json'
import provincias from '@/data/json-ubigeo/ubigeo_peru_2016_provincias.json'
import distritos from '@/data/json-ubigeo/ubigeo_peru_2016_distritos.json'
import CampaignAddDialog from '../../modules/admin/dialogs/CampaignAddDialog.vue'

const isAddModalOpen = ref(false);

const openAddModal = () => {
  isAddModalOpen.value = true;
};
const closeAddModal = () => {
  isAddModalOpen.value = false;
};



// Variables reactivas para los selects
const selectedDepartamento = ref('')
const selectedProvincia = ref('')
const selectedDistrito = ref('')



// Computed: Provincias filtradas según 'selectedDepartamento'
const filteredProvincias = computed(() => {
  if (!selectedDepartamento.value) return []
  return provincias.filter(prov => prov.department_id === selectedDepartamento.value)
})

// Computed: Distritos filtrados según 'selectedProvincia'
const filteredDistritos = computed(() => {
  if (!selectedProvincia.value) return []
  return distritos.filter(dist => dist.province_id === selectedProvincia.value)
})

// Watchers que resetean valores encadenados
watch(selectedDepartamento, () => {
  selectedProvincia.value = ''
  selectedDistrito.value = ''
})

watch(selectedProvincia, () => {
  selectedDistrito.value = ''
})

// Function to reset filters
const resetFilters = () => {
  selectedDepartamento.value = ''
  selectedProvincia.value = ''
  selectedDistrito.value = ''
}

// ----- Filtros -----
const searchQuery = ref('');
const selectedEstado = ref('Estado');

const handleSearch = () => {
  console.log('Filtros:', {
    search: searchQuery.value,
    estado: selectedEstado.value
  });
};

const resetFilterstable = () => {
  searchQuery.value = '';
  selectedEstado.value = 'Estado';
};

// ----- Datos -----
const tableData = ref([
  { departamento: 'Lima', provincia: 'Lima', distrito: 'Miraflores', inicio: '2023-01-01', fin: '2023-12-31', estado: 'Activo' },
  { departamento: 'Cusco', provincia: 'Cusco', distrito: 'San Blas', inicio: '2023-02-01', fin: '2023-11-30', estado: 'Inactivo' },
  { departamento: 'Arequipa', provincia: 'Arequipa', distrito: 'Yanahuara', inicio: '2023-03-01', fin: '2023-10-31', estado: 'Activo' },
  { departamento: 'Piura', provincia: 'Piura', distrito: 'Catacaos', inicio: '2023-04-01', fin: '2023-09-30', estado: 'Inactivo' },
  { departamento: 'Trujillo', provincia: 'Trujillo', distrito: 'Huanchaco', inicio: '2023-05-01', fin: '2023-08-31', estado: 'Activo' }
]);

// ----- Filtrado -----
const filteredData = computed(() => {
  return tableData.value.filter(item => {
    const matchesSearch =
        searchQuery.value === '' ||
        item.departamento.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.provincia.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.distrito.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesEstado =
        selectedEstado.value === 'Estado' || item.estado === selectedEstado.value;
    return matchesSearch && matchesEstado;
  });
});

// ----- Paginación -----
const currentPage = ref(1);
const pageSize = ref(5);
const totalPages = computed(() => Math.ceil(filteredData.value.length / pageSize.value));
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredData.value.slice(start, start + pageSize.value);
});
const startRecord = computed(() =>
    filteredData.value.length === 0 ? 0 : ((currentPage.value - 1) * pageSize.value + 1)
);
const endRecord = computed(() => Math.min(currentPage.value * pageSize.value, filteredData.value.length));

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

const updatePageSize = (event) => {
  pageSize.value = Number(event.target.value);
  currentPage.value = 1;
};

</script>

<template>
  <section>
    <header class="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-0">
      <h1 class="flex-0.2 text-colorText333 text-[28px] md:text-[32px] font-bold dark:text-white">
        Campañas
      </h1>
      <div
          class="inline-flex rounded-md shadow-xs w-full lg:w-auto"
          role="group"
        >
          <button
            type="button"
            class="flex flex-1 lg:flex-auto items-center gap-2.5 px-4 py-3 lg:py-4 text-[14px] lg:text-[16px] font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg  hover:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white"
          >
          <label class="inline-flex items-center  cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer">
            <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
            <span class="ms-3 text-[14px] font-semibold text-gray-900 dark:text-white">Activar Todo</span>
        </label>
          </button>
          <button
            type="button"
            @click="openAddModal"
            class="flex flex-1 lg:flex-auto items-center gap-2.5 px-4 py-3 lg:py-4 text-[14px] lg:text-[16px] font-medium text-gray-900 bg-white border-r border-y border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700"
          >
            <IconSquarePlus />
            Agregar campaña
          </button>
        </div>
    </header>
    <UniversalContainerLayout class="mt-7">
       <!-- Filtros -->
       <div class="flex flex-col md:flex-row gap-2.5 justify-between items-center">
        <!-- Buscador -->
        <form @submit.prevent="handleSearch" class="lg:max-w-md w-full">
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IconSearch class="text-gray-500 dark:text-gray-400" />
            </div>
            <input type="search" v-model="searchQuery" class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Buscar..." />
          </div>
        </form>
        <!-- Filtro sexo -->
        <div class="flex border w-full lg:w-auto border-gray-300 dark:border-gray-600 rounded-lg">
          <div class="hidden lg:flex p-3 border-r border-gray-300 dark:border-gray-600">
            <IconFilter class="text-colorTextLight dark:text-white" />
          </div>
          <div class="border-r border-gray-300 dark:border-gray-600 w-full flex-1">
            <select v-model="selectedEstado" class="w-full p-3 text-[12px] md:text-[14px] bg-transparent dark:bg-colorsecundary placeholder-gray-500 dark:placeholder-gray-400 border-none text-colorTextLight dark:text-white cursor-pointer focus:ring-0 rounded-[20px] lg:rounded-none">
              <option value="Estado" disabled>Estado</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div @click="resetFilterstable" class="cursor-pointer flex items-center gap-2.5 p-3 font-bold text-colorAlert hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-lg">
            <IconRotate2 class="w-5 md:w-6" />
            <span class="hidden md:block">Restablecer</span>
          </div>
        </div>
      </div>

      <!-- Tabla -->
      <div class="">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th class="px-6 py-3">Departamento</th>
                <th class="px-6 py-3">Provincia</th>
                <th class="px-6 py-3">Distrito</th>
                <th class="px-6 py-3">Inicio</th>
                <th class="px-6 py-3">Fin</th>
                <th class="px-6 py-3">Estado</th>
                <th class="px-6 py-3">Ver más</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in paginatedData" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4">{{ row.departamento }}</td>
                <td class="px-6 py-4">{{ row.provincia }}</td>
                <td class="px-6 py-4">{{ row.distrito }}</td>
                <td class="px-6 py-4">{{ row.inicio }}</td>
                <td class="px-6 py-4">{{ row.fin }}</td>
                <td class="px-6 py-4">
                  <div
                    :class="[
                      row.estado === 'Activo' ? 'bg-colorSuccess' : 'bg-colorAlert',
                      'py-1.5 px-6 text-[12px] flex justify-center items-center rounded-[4.5px] text-white font-bold'
                    ]"
                  >
                    {{ row.estado }}
                  </div>
                </td>
                <td class="px-6 py-4 text-blue-600 hover:underline cursor-pointer">
                  <div class="flex gap-3 justify-center">
                    <button
                      class="font-medium relative text-blue-600 p-[6px] border border-colorBorderButtonLigth dark:bg-[#323D4E] dark:border-gray-600 dark:text-white bg-[#FAFBFD] rounded-[8px]"
                  >
                    <IconEdit />
                  </button>
                  <button
                      class="font-medium relative text-red-600 p-[6px] border border-colorBorderButtonLigth dark:bg-[#323D4E] dark:border-gray-600 dark:text-red-100 bg-[#FAFBFD] rounded-[8px]"
                  >
                    <IconTrash />
                  </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <nav class="flex items-center justify-between pt-4">
          <div class="flex items-start md:items-center flex-col md:flex-row gap-4">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              Mostrando <span class="font-semibold text-gray-900 dark:text-white">{{ startRecord }}-{{ endRecord }}</span> de
              <span class="font-semibold text-gray-900 dark:text-white">{{ filteredData.length }}</span>
            </span>
            <select @change="updatePageSize" :value="pageSize" class="p-2 border border-gray-300 rounded-md text-sm text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          <ul class="flex items-center -space-x-px h-8 text-sm">
            <li>
              <a href="#" @click.prevent="changePage(currentPage - 1)" :class="{'pointer-events-none opacity-50': currentPage === 1}" class="flex items-center justify-center px-3 h-8 ms-0 text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                <span class="sr-only">Anterior</span>
                <svg class="w-2.5 h-2.5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/></svg>
              </a>
            </li>
            <li v-for="page in totalPages" :key="page">
              <a href="#" @click.prevent="changePage(page)" :class="currentPage === page ? 'z-10 flex items-center justify-center px-3 h-8 text-blue-600 border border-blue-300 bg-blue-50 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'flex items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'">
                {{ page }}
              </a>
            </li>
            <li>
              <a href="#" @click.prevent="changePage(currentPage + 1)" :class="{'pointer-events-none opacity-50': currentPage === totalPages}" class="flex items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                <span class="sr-only">Siguiente</span>
                <svg class="w-2.5 h-2.5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/></svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </UniversalContainerLayout>

    <CampaignAddDialog :isOpen="isAddModalOpen" @close="closeAddModal"/>

  </section>
</template>

<style scoped>

</style>