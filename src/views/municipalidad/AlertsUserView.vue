<script setup>
import { ref, computed } from 'vue'
import {
  IconMap2,
  IconSearch,
  IconFilter,
  IconRotate2,
  IconEdit
} from '@tabler/icons-vue'

// ----- Modal (hipotético para "Mapa de calor") -----
const openHeatMap = () => {
  console.log('Abrir Mapa de calor')
}

// ----- Filtros -----
// Buscador
const searchQuery = ref('')
// Filtro de estado
const selectedState = ref('Estado')
// Filtro por fecha (exacta)
const selectedFecha = ref('')

// Función de búsqueda
const handleSearch = () => {
  console.log('Filtros:', {
    search: searchQuery.value,
    estado: selectedState.value,
    fecha: selectedFecha.value
  })
}

// Resetear filtros
const resetFilters = () => {
  searchQuery.value = ''
  selectedState.value = 'Estado'
  selectedFecha.value = ''
}

// ----- Datos de la tabla (simulados) -----
// Ahora el array contiene: Código, Dirección, Fecha de Envío y Estado
const tableData = ref([
  { codigo: 'COD-001', direccion: 'Av. Principal 123', fechaEnvio: '2023-09-01', estado: 'Atendido' },
  { codigo: 'COD-002', direccion: 'Jr. Secundario 456', fechaEnvio: '2023-09-02', estado: 'En Proceso' },
  { codigo: 'COD-003', direccion: 'Calle Falsa 789', fechaEnvio: '2023-09-03', estado: 'Falsa Alarma' },
  { codigo: 'COD-004', direccion: 'Av. Siempre Viva 742', fechaEnvio: '2023-09-04', estado: 'Pendiente' },
  { codigo: 'COD-005', direccion: 'Pasaje Oculto 159', fechaEnvio: '2023-09-05', estado: 'Atendido' },
  { codigo: 'COD-006', direccion: 'Av. Independencia 321', fechaEnvio: '2023-09-06', estado: 'En Proceso' },
  { codigo: 'COD-007', direccion: 'Callejón 111', fechaEnvio: '2023-09-07', estado: 'Falsa Alarma' },
  { codigo: 'COD-008', direccion: 'Carretera Central Km 22', fechaEnvio: '2023-09-08', estado: 'Pendiente' },
  { codigo: 'COD-009', direccion: 'Av. Las Flores 999', fechaEnvio: '2023-09-09', estado: 'Atendido' },
  { codigo: 'COD-010', direccion: 'Jr. Los Olivos 777', fechaEnvio: '2023-09-10', estado: 'Pendiente' }
]);

// ----- Filtrado -----
const filteredData = computed(() => {
  return tableData.value.filter(item => {
    const searchText = searchQuery.value.toLowerCase();
    const matchesSearch =
        searchQuery.value === '' ||
        item.codigo.toLowerCase().includes(searchText) ||
        item.direccion.toLowerCase().includes(searchText) ||
        item.fechaEnvio.toLowerCase().includes(searchText);
    const matchesState =
        selectedState.value === 'Estado' ||
        item.estado.toLowerCase() === selectedState.value.toLowerCase();
    const matchesFecha =
        selectedFecha.value === '' ||
        item.fechaEnvio === selectedFecha.value;
    return matchesSearch && matchesState && matchesFecha;
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
const endRecord = computed(() =>
    Math.min(currentPage.value * pageSize.value, filteredData.value.length)
);
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};
const updatePageSize = (event) => {
  pageSize.value = Number(event.target.value);
  currentPage.value = 1;
};

// ----- Función para editar -----
const editItem = (item) => {
  console.log('Editar:', item);
}
</script>

<template>
  <section>
    <header class="flex justify-between items-center">
      <h1 class="text-colorText224 text-[28px] md:text-[32px] font-bold dark:text-white">
        Lista de alertas
      </h1>
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
        <!-- Filtros adicionales (Estado y Fecha) -->
        <div class="flex border w-full lg:w-auto border-gray-300 dark:border-gray-600 rounded-lg">
          <div class="hidden lg:flex p-3 border-r border-gray-300 dark:border-gray-600">
            <IconFilter class="text-colorTextLight dark:text-white" />
          </div>
          <div class="border-r border-gray-300 dark:border-gray-600 w-full flex-1">
            <select
                id="state"
                v-model="selectedState"
                class="w-full p-3 text-[12px] md:text-[14px] bg-transparent dark:bg-colorsecundary placeholder-gray-500 dark:placeholder-gray-400 border-none text-colorTextLight dark:text-white cursor-pointer appearance-none shadow-none focus:outline-none focus:ring-0 rounded-none"
            >
              <option value="Estado" disabled>Estado</option>
              <option value="Atendido">Atendido</option>
              <option value="En Proceso">En Proceso</option>
              <option value="Falsa Alarma">Falsa Alarma</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>
          <div class="border-r border-gray-300 dark:border-gray-600 w-full flex-1">
            <!-- Filtro por Fecha (única, exacta) -->
            <input
                type="date"
                v-model="selectedFecha"
                class="w-full p-3 text-[12px] md:text-[14px] bg-transparent dark:bg-colorsecundary placeholder-gray-500 dark:placeholder-gray-400 border-none text-colorTextLight dark:text-white cursor-pointer focus:ring-0 rounded-none"
            />
          </div>
          <div
              @click="resetFilters"
              class="w-full flex-[0.2] justify-center dark:border-gray-600 font-bold text-colorAlert flex items-center gap-2.5 p-3 text-[12px] md:text-[14px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-lg"
          >
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
              <th scope="col" class="px-6 py-3">Código</th>
              <th scope="col" class="px-6 py-3">Dirección</th>
              <th scope="col" class="px-6 py-3">Fecha de Envío</th>
              <th scope="col" class="px-6 py-3">Estado</th>
              <th scope="col" class="px-6 py-3">Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(row, index) in paginatedData"
                :key="index"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
            >
              <td class="px-6 py-4">{{ row.codigo }}</td>
              <td class="px-6 py-4">{{ row.direccion }}</td>
              <td class="px-6 py-4">{{ row.fechaEnvio }}</td>
              <td class="px-6 py-4">
                <div class="flex justify-center">
                  <div
                      :style="{
                      backgroundColor:
                        row.estado === 'Atendido'
                          ? '#04CE5B'
                          : row.estado === 'En Proceso'
                          ? '#007BFF'
                          : row.estado === 'Falsa Alarma'
                          ? '#DC3545'
                          : row.estado === 'Pendiente'
                          ? '#FFA756'
                          : '#000'
                    }"
                      class="py-1.5 w-fit px-6 text-[12px] flex justify-center items-center rounded-[4.5px] text-white font-bold"
                  >
                    {{ row.estado }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 flex justify-center items-center">
                <button
                    @click="editItem(row)"
                    class="font-medium text-blue-600 p-[6px] border border-colorBorderButtonLigth dark:bg-[#323D4E] dark:border-gray-600 dark:text-white bg-[#FAFBFD] rounded-[8px]"
                >
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
            <select
                @change="updatePageSize"
                :value="pageSize"
                class="p-2 border border-gray-300 rounded-md text-sm text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          <ul class="flex items-center -space-x-px h-8 text-sm">
            <li>
              <a
                  href="#"
                  @click.prevent="changePage(currentPage - 1)"
                  :class="{'pointer-events-none opacity-50': currentPage === 1}"
                  class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span class="sr-only">Previous</span>
                <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
              </a>
            </li>
            <li v-for="page in totalPages" :key="page">
              <a
                  href="#"
                  @click.prevent="changePage(page)"
                  :aria-current="currentPage === page ? 'page' : false"
                  :class="currentPage === page ? 'z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'"
              >
                {{ page }}
              </a>
            </li>
            <li>
              <a
                  href="#"
                  @click.prevent="changePage(currentPage + 1)"
                  :class="{'pointer-events-none opacity-50': currentPage === totalPages}"
                  class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
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
</template>

<style scoped>
</style>
