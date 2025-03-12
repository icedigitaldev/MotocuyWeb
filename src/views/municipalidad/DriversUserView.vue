<script setup>
import { ref, computed } from 'vue';
import {
  IconTableDown,
  IconTableImport,
  IconTableExport,
  IconSquarePlus,
  IconFilter,
  IconSearch,
  IconEdit,
  IconRotate2
} from '@tabler/icons-vue';
import DriverAddDialog from "@/modules/municipalidad/dialogs/DriverAddDialog.vue";
import UserAddDialog from "@/modules/admin/dialogs/UserAddDialog.vue";


const isAddModalOpen = ref(false);

const openAddModal = () => {
  isAddModalOpen.value = true;
};
const closeAddModal = () => {
  isAddModalOpen.value = false;
};


// ----- Filtros -----
const searchQuery = ref('');
const selectedCategoria = ref('Categoria');
const selectedState = ref('Estado');

const handleSearch = () => {
  console.log('Filtros:', {
    search: searchQuery.value,
    categoria: selectedCategoria.value,
    estado: selectedState.value
  });
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategoria.value = 'Categoria';
  selectedState.value = 'Estado';
};

// ----- Datos de Conductores -----
const tableData = ref([
  { licencia: 'ABC123', conductor: 'Juan Pérez', categoria: 'A', vencimiento: '2025-12-31', restricciones: 'Ninguna', estado: 'Activo' },
  { licencia: 'DEF456', conductor: 'María López', categoria: 'B', vencimiento: '2024-11-30', restricciones: 'Sin alcohol', estado: 'Inactivo' },
  { licencia: 'GHI789', conductor: 'Pedro García', categoria: 'C', vencimiento: '2023-10-15', restricciones: 'Restricción 1', estado: 'Activo' },
  { licencia: 'JKL012', conductor: 'Ana Martínez', categoria: 'A', vencimiento: '2026-05-20', restricciones: 'Ninguna', estado: 'Activo' },
  { licencia: 'MNO345', conductor: 'Luis Fernández', categoria: 'B', vencimiento: '2024-08-10', restricciones: 'Limitación de velocidad', estado: 'Inactivo' },
  { licencia: 'PQR678', conductor: 'Sofía Gómez', categoria: 'C', vencimiento: '2025-01-15', restricciones: 'Ninguna', estado: 'Activo' },
  { licencia: 'STU901', conductor: 'Carlos Ramírez', categoria: 'D', vencimiento: '2023-12-31', restricciones: 'Sin transporte de sustancias', estado: 'Activo' },
  { licencia: 'VWX234', conductor: 'Elena Torres', categoria: 'A', vencimiento: '2024-03-25', restricciones: 'Ninguna', estado: 'Inactivo' },
  { licencia: 'YZA567', conductor: 'Roberto Sánchez', categoria: 'B', vencimiento: '2025-09-05', restricciones: 'Uso de lentes', estado: 'Activo' },
  { licencia: 'BCD890', conductor: 'Laura Díaz', categoria: 'C', vencimiento: '2023-07-14', restricciones: 'Ninguna', estado: 'Activo' }
]);

// ----- Filtrado -----
const filteredData = computed(() => {
  return tableData.value.filter(item => {
    const matchesSearch =
        searchQuery.value === '' ||
        item.conductor.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.licencia.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategoria =
        selectedCategoria.value === 'Categoria' || item.categoria === selectedCategoria.value;
    const matchesEstado =
        selectedState.value === 'Estado' || item.estado.toLowerCase() === selectedState.value.toLowerCase();
    return matchesSearch && matchesCategoria && matchesEstado;
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

// ----- Función para editar conductor -----
const openEditModal = (row) => {
  console.log('Editar conductor:', row);
};
</script>

<template>
  <section>
    <header>
      <h1 class="text-colorText224 text-[28px] md:text-[32px] font-bold dark:text-white">
        Gestión de Conductores
      </h1>
      <!-- Controladores -->
      <div class="flex flex-col gap-2 lg:flex-row justify-between items-center mt-7">
        <div class="inline-flex rounded-md shadow-xs w-full lg:w-auto" role="group">
          <button type="button" class="flex flex-1 lg:flex-auto items-center gap-2.5 px-4 py-3 lg:py-4 text-[14px] lg:text-[16px] font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700">
            <IconTableDown />
            Descargar excel
          </button>
          <button type="button" class="flex flex-1 lg:flex-auto items-center gap-2.5 px-4 py-3 lg:py-4 text-[14px] lg:text-[16px] font-medium text-gray-900 bg-white border-r border-y border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700">
            <IconTableImport />
            Importar excel
          </button>
        </div>
        <div class="inline-flex rounded-md shadow-xs w-full lg:w-auto" role="group">
          <button type="button" class="flex flex-1 lg:flex-auto items-center gap-2.5 px-4 py-3 lg:py-4 text-[14px] lg:text-[16px] font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700">
            <IconTableExport />
            Exportar excel
          </button>
          <button type="button" @click="openAddModal" class="flex flex-1 lg:flex-auto items-center gap-2.5 px-4 py-3 lg:py-4 text-[14px] lg:text-[16px] font-medium text-gray-900 bg-white border-r border-y border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700">
            <IconSquarePlus />
            Nuevo conductor
          </button>
        </div>
      </div>
    </header>
    <main class="bg-white dark:bg-colorsecundary rounded-[20px] p-5 mt-7">
      <!-- Filtros -->
      <div class="flex flex-col md:flex-row gap-2.5 md:gap-0 justify-between items-center">
        <!-- Buscador -->
        <form @submit.prevent="handleSearch" class="lg:max-w-md w-full">
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IconSearch class="text-gray-500 dark:text-gray-400" />
            </div>
            <input
                type="search"
                id="default-search"
                v-model="searchQuery"
                class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Buscar..."
                required
            />
          </div>
        </form>
        <!-- Filtros adicionales -->
        <div class="flex border w-full lg:w-auto border-gray-300 dark:border-gray-600 rounded-lg">
          <div class="hidden lg:flex p-3 border-r border-gray-300 dark:border-gray-600">
            <IconFilter class="text-colorTextLight dark:text-white" />
          </div>
          <div class="border-r border-gray-300 dark:border-gray-600 w-full flex-1">
            <select
                id="categoria"
                v-model="selectedCategoria"
                class="w-auto p-3 text-[12px] md:text-[14px] bg-transparent dark:bg-colorsecundary placeholder-gray-500 dark:placeholder-gray-400 border-none text-colorTextLight dark:text-white cursor-pointer focus:ring-0 rounded-[20px] lg:rounded-none"
            >
              <option value="Categoria" disabled>Categoría</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <div class="border-r border-gray-300 dark:border-gray-600 w-full flex-1">
            <select
                id="state"
                v-model="selectedState"
                class="w-full p-3 text-[12px] md:text-[14px] bg-transparent dark:bg-colorsecundary placeholder-gray-500 dark:placeholder-gray-400 border-none text-colorTextLight dark:text-white cursor-pointer appearance-none shadow-none focus:outline-none focus:ring-0 rounded-none"
            >
              <option value="Estado" disabled>Estado</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          <div @click="resetFilters" class="w-full flex-[0.2] justify-center dark:border-gray-600 font-bold text-colorAlert flex items-center gap-2.5 p-3 text-[12px] md:text-[14px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-lg">
            <IconRotate2 class="w-5 md:w-6" />
            <span class="hidden md:block">Restablecer</span>
          </div>
        </div>
      </div>
      <!-- Tabla -->
      <div class="mt-8">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Licencia</th>
              <th scope="col" class="px-6 py-3">Conductor</th>
              <th scope="col" class="px-6 py-3">Categoría</th>
              <th scope="col" class="px-6 py-3">Vencimiento</th>
              <th scope="col" class="px-6 py-3">Restricciones</th>
              <th scope="col" class="px-6 py-3">Estado</th>
              <th scope="col" class="px-6 py-3">Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row, index) in paginatedData" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <td class="px-6 py-4">{{ row.licencia }}</td>
              <td class="px-6 py-4">{{ row.conductor }}</td>
              <td class="px-6 py-4">{{ row.categoria }}</td>
              <td class="px-6 py-4">{{ row.vencimiento }}</td>
              <td class="px-6 py-4">{{ row.restricciones }}</td>
              <td class="px-6 py-4">
                <div :class="[
                    row.estado === 'Activo' ? 'bg-colorSuccess' : 'bg-colorAlert',
                    'py-1.5 px-6 text-[12px] flex justify-center items-center rounded-[4.5px] text-white font-bold'
                  ]">
                  {{ row.estado }}
                </div>
              </td>
              <td class="px-6 py-4 flex justify-center items-center">
                <button @click="openEditModal(row)" class="font-medium text-blue-600 p-[6px] border border-colorBorderButtonLigth dark:bg-[#323D4E] dark:border-gray-600 dark:text-white bg-[#FAFBFD] rounded-[8px]">
                  <IconEdit />
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- Paginación -->
        <nav class="flex items-center flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
          <div class="flex items-center gap-4">
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
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
              <a href="#" @click.prevent="changePage(currentPage - 1)" :class="{'pointer-events-none opacity-50': currentPage === 1}" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="sr-only">Previous</span>
                <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
              </a>
            </li>
            <li v-for="page in totalPages" :key="page">
              <a href="#" @click.prevent="changePage(page)" :aria-current="currentPage === page ? 'page' : false" :class="currentPage === page ? 'z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'">
                {{ page }}
              </a>
            </li>
            <li>
              <a href="#" @click.prevent="changePage(currentPage + 1)" :class="{'pointer-events-none opacity-50': currentPage === totalPages}" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="sr-only">Next</span>
                <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  </section>

  <DriverAddDialog :isOpen="isAddModalOpen" @close="closeAddModal"/>
</template>

<style scoped>
</style>
