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
import UnitsAddDialog from "@/modules/municipalidad/dialogs/UnitsAddDialog.vue";
import DriverAddDialog from "@/modules/municipalidad/dialogs/DriverAddDialog.vue";


const isAddModalOpen = ref(false);

const openAddModal = () => {
  isAddModalOpen.value = true;
};
const closeAddModal = () => {
  isAddModalOpen.value = false;
};



// ----- Filtros -----
// Buscador y select para Asociación
const searchQuery = ref('');
const selectedAsociacion = ref('Asociación');

// Nuevo filtro: Estado (en vez de Marca)
const selectedEstado = ref('Estado');

// ----- Rango de fecha (unificado en un solo picker) -----
const showDateRangePicker = ref(false);
const dateRange = ref({ start: '', end: '' });
const tempDateRange = ref({ start: '', end: '' });

const openDateRangePicker = () => {
  tempDateRange.value = { ...dateRange.value };
  showDateRangePicker.value = true;
};
const cancelDateRange = () => {
  showDateRangePicker.value = false;
};
const applyDateRange = () => {
  dateRange.value = { ...tempDateRange.value };
  showDateRangePicker.value = false;
};

// Función de búsqueda
const handleSearch = () => {
  console.log('Filtros:', {
    search: searchQuery.value,
    asociacion: selectedAsociacion.value,
    estado: selectedEstado.value,
    dateRange: dateRange.value
  });
};

// Resetea todos los filtros
const resetFilters = () => {
  searchQuery.value = '';
  selectedAsociacion.value = 'Asociación';
  selectedEstado.value = 'Estado';
  dateRange.value = { start: '', end: '' };
};

// ----- Datos de Unidades (simulados) -----
const tableData = ref([
  {
    idPropietario: 'P001',
    place: 'Lima',
    asociacion: 'Asociación A',
    marca: 'Toyota',
    motor: 'V8',
    expedicion: '2023-01-15',
    conductor: 'Juan Pérez',
    estado: 'Activo'
  },
  {
    idPropietario: 'P002',
    place: 'Arequipa',
    asociacion: 'Asociación B',
    marca: 'Honda',
    motor: 'V6',
    expedicion: '2022-12-01',
    conductor: 'María López',
    estado: 'Inactivo'
  },
  {
    idPropietario: 'P003',
    place: 'Cusco',
    asociacion: 'Asociación A',
    marca: 'Ford',
    motor: 'V8',
    expedicion: '2023-05-20',
    conductor: 'Pedro García',
    estado: 'Activo'
  },
  {
    idPropietario: 'P004',
    place: 'Trujillo',
    asociacion: 'Asociación C',
    marca: 'Chevrolet',
    motor: 'V4',
    expedicion: '2023-03-10',
    conductor: 'Ana Martínez',
    estado: 'Activo'
  },
  {
    idPropietario: 'P005',
    place: 'Chiclayo',
    asociacion: 'Asociación B',
    marca: 'Toyota',
    motor: 'V6',
    expedicion: '2023-07-22',
    conductor: 'Luis Fernández',
    estado: 'Inactivo'
  },
  {
    idPropietario: 'P006',
    place: 'Ica',
    asociacion: 'Asociación A',
    marca: 'Hyundai',
    motor: 'V4',
    expedicion: '2022-11-05',
    conductor: 'Sofía Gómez',
    estado: 'Activo'
  },
  {
    idPropietario: 'P007',
    place: 'Piura',
    asociacion: 'Asociación C',
    marca: 'Nissan',
    motor: 'V6',
    expedicion: '2023-09-30',
    conductor: 'Carlos Ramírez',
    estado: 'Activo'
  },
  {
    idPropietario: 'P008',
    place: 'Tacna',
    asociacion: 'Asociación B',
    marca: 'Ford',
    motor: 'V8',
    expedicion: '2023-02-18',
    conductor: 'Elena Torres',
    estado: 'Inactivo'
  },
  {
    idPropietario: 'P009',
    place: 'Iquitos',
    asociacion: 'Asociación A',
    marca: 'Chevrolet',
    motor: 'V6',
    expedicion: '2022-10-05',
    conductor: 'Roberto Sánchez',
    estado: 'Activo'
  },
  {
    idPropietario: 'P010',
    place: 'Puno',
    asociacion: 'Asociación C',
    marca: 'Toyota',
    motor: 'V8',
    expedicion: '2023-04-12',
    conductor: 'Laura Díaz',
    estado: 'Activo'
  }
]);

// ----- Filtrado -----
const filteredData = computed(() => {
  return tableData.value.filter(item => {
    const searchText = searchQuery.value.toLowerCase();
    const matchesSearch =
        searchQuery.value === '' ||
        item.idPropietario.toLowerCase().includes(searchText) ||
        item.conductor.toLowerCase().includes(searchText) ||
        item.place.toLowerCase().includes(searchText);

    const matchesAsociacion =
        selectedAsociacion.value === 'Asociación' ||
        item.asociacion === selectedAsociacion.value;

    // Nuevo: Filtrado por estado (en vez de marca)
    const matchesEstado =
        selectedEstado.value === 'Estado' ||
        item.estado === selectedEstado.value;

    // Filtrado por rango de fecha (expedicion) usando dateRange
    const itemDate = new Date(item.expedicion);
    if (dateRange.value.start) {
      const start = new Date(dateRange.value.start);
      if (itemDate < start) return false;
    }
    if (dateRange.value.end) {
      const end = new Date(dateRange.value.end);
      if (itemDate > end) return false;
    }

    return matchesSearch && matchesAsociacion && matchesEstado;
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

// ----- Función para editar unidad -----
const openEditModal = (row) => {
  console.log('Editar unidad:', row);
};
</script>

<template>
  <section>
    <!-- Encabezado -->
    <header>
      <h1 class="text-colorText224 text-[28px] md:text-[32px] font-bold dark:text-white">
        Gestión de Unidades
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
            Nuevo unidad
          </button>
        </div>
      </div>
    </header>

    <!-- Contenido principal -->
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
        <!-- Filtros adicionales (Asociación, Estado y Restablecer) -->
        <div class="flex border w-full lg:w-auto border-gray-300 dark:border-gray-600 rounded-lg">
          <div class="hidden lg:flex p-3 border-r border-gray-300 dark:border-gray-600">
            <IconFilter class="text-colorTextLight dark:text-white" />
          </div>
          <div class="border-r border-gray-300 dark:border-gray-600 w-full flex-1">
            <select
                id="asociacion"
                v-model="selectedAsociacion"
                class="w-auto p-3 text-[12px] md:text-[14px] bg-transparent dark:bg-colorsecundary placeholder-gray-500 dark:placeholder-gray-400 border-none text-colorTextLight dark:text-white cursor-pointer focus:ring-0 rounded-[20px] lg:rounded-none"
            >
              <option value="Asociación" disabled>Asociación</option>
              <option value="Asociación A">Asociación A</option>
              <option value="Asociación B">Asociación B</option>
              <option value="Asociación C">Asociación C</option>
            </select>
          </div>
          <div class="border-r border-gray-300 dark:border-gray-600 w-full flex-1">
            <select
                id="estado"
                v-model="selectedEstado"
                class="w-auto p-3 text-[12px] md:text-[14px] bg-transparent dark:bg-colorsecundary placeholder-gray-500 dark:placeholder-gray-400 border-none text-colorTextLight dark:text-white cursor-pointer appearance-none shadow-none focus:outline-none focus:ring-0 rounded-none"
            >
              <option value="Estado" disabled>Estado</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <!-- Botón para abrir el Date Range Picker -->
          <button
              class="w-auto px-4 border-r border-gray-300 dark:border-gray-600 text-[12px] md:text-[14px] text-colorTextLight dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              @click="openDateRangePicker"
          >
           Fecha
          </button>
          <!-- Botón Restablecer -->
          <div
              @click="resetFilters"
              class="w-auto flex-[0.2] justify-center dark:border-gray-600 font-bold text-colorAlert flex items-center gap-2.5 p-3 text-[12px] md:text-[14px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-lg"
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
              <th scope="col" class="px-6 py-3">ID Propietario</th>
              <th scope="col" class="px-6 py-3">Place</th>
              <th scope="col" class="px-6 py-3">Asociación</th>
              <th scope="col" class="px-6 py-3">Marca</th>
              <th scope="col" class="px-6 py-3">Motor</th>
              <th scope="col" class="px-6 py-3">Expedición</th>
              <th scope="col" class="px-6 py-3">Conductor</th>
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
              <td class="px-6 py-4">{{ row.idPropietario }}</td>
              <td class="px-6 py-4">{{ row.place }}</td>
              <td class="px-6 py-4">{{ row.asociacion }}</td>
              <td class="px-6 py-4">{{ row.marca }}</td>
              <td class="px-6 py-4">{{ row.motor }}</td>
              <td class="px-6 py-4">{{ row.expedicion }}</td>
              <td class="px-6 py-4">{{ row.conductor }}</td>
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
              <td class="px-6 py-4 flex justify-center items-center">
                <button
                    @click="openEditModal(row)"
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
        <nav
            class="flex items-center flex-wrap md:flex-row justify-between pt-4"
            aria-label="Table navigation"
        >
          <div class="flex items-center gap-4">
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
              Mostrando
              <span class="font-semibold text-gray-900 dark:text-white"
              >{{ startRecord }}-{{ endRecord }}</span
              >
              de
              <span class="font-semibold text-gray-900 dark:text-white"
              >{{ filteredData.length }}</span
              >
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
                <svg
                    class="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                >
                  <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 1 1 5l4 4"
                  />
                </svg>
              </a>
            </li>
            <li v-for="page in totalPages" :key="page">
              <a
                  href="#"
                  @click.prevent="changePage(page)"
                  :aria-current="currentPage === page ? 'page' : false"
                  :class="currentPage === page
                  ? 'z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                  : 'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'"
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
                <svg
                    class="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                >
                  <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <!-- MINI-MODAL: Date Range Picker -->
      <div
          v-if="showDateRangePicker"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
      >
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg relative">
          <h2 class="text-lg font-semibold mb-4 dark:text-white">Seleccionar Rango de Fechas</h2>
          <!-- Inputs de fecha de inicio y fin -->
          <div class="flex flex-col gap-4">
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Fecha Inicio
              </label>
              <input
                  type="date"
                  v-model="tempDateRange.start"
                  class="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Fecha Fin
              </label>
              <input
                  type="date"
                  v-model="tempDateRange.end"
                  class="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
          </div>
          <!-- Botones de acción -->
          <div class="mt-6 flex justify-end gap-4">
            <button
                type="button"
                class="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                @click="cancelDateRange"
            >
              Cancelar
            </button>
            <button
                type="button"
                class="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                @click="applyDateRange"
            >
              Hecho
            </button>
          </div>
        </div>
      </div>
      <!-- FIN MINI-MODAL -->
    </main>
  </section>}

  <UnitsAddDialog :isOpen="isAddModalOpen" @close="closeAddModal" />
</template>

<style scoped>
</style>
