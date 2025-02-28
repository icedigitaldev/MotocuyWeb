<script setup>
import { ref, computed } from 'vue'
import {
  IconSquarePlus,
  IconSearch,
  IconFilter,
  IconRotate2,
  IconEdit
} from '@tabler/icons-vue'
import UserUpdateDialog from "@/modules/admin/dialogs/UserUpdateDialog.vue";
import UserAddDialog from "@/modules/admin/dialogs/UserAddDialog.vue";

// Modal: agregar y editar usuario
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);

const openAddModal = () => {
  isAddModalOpen.value = true;
};
const closeAddModal = () => {
  isAddModalOpen.value = false;
};

const openEditModal = () => {
  isEditModalOpen.value = true;
};
const closeEditModal = () => {
  isEditModalOpen.value = false;
};

// Filtros
const searchQuery = ref('');
const selectedRole = ref('Rol');
const selectedState = ref('Estado');

const handleSearch = () => {
  console.log('Filtros:', {
    search: searchQuery.value,
    role: selectedRole.value,
    state: selectedState.value
  });
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedRole.value = 'Rol';
  selectedState.value = 'Estado';
};

// Datos de la tabla (simulados)
const tableData = ref([
  { ruc: '1010101010', empresa: 'Empresa A', contacto: 'Juan Perez', email: 'juan@empresa.com', rol: 'Municipalidad', estado: 'Activo' },
  { ruc: '2020202020', empresa: 'Empresa B', contacto: 'Maria Lopez', email: 'maria@empresa.com', rol: 'Empresa', estado: 'Inactivo' },
  { ruc: '3030303030', empresa: 'Empresa C', contacto: 'Pedro Garcia', email: 'pedro@empresa.com', rol: 'Policia', estado: 'Activo' },
  { ruc: '4040404040', empresa: 'Empresa D', contacto: 'Ana Martinez', email: 'ana@empresa.com', rol: 'Registro Nacional', estado: 'Activo' },
  { ruc: '5050505050', empresa: 'Empresa E', contacto: 'Luis Fernandez', email: 'luis@empresa.com', rol: 'Municipalidad', estado: 'Inactivo' },
  { ruc: '6060606060', empresa: 'Empresa F', contacto: 'Sofía Gomez', email: 'sofia@empresa.com', rol: 'Empresa', estado: 'Activo' },
  { ruc: '7070707070', empresa: 'Empresa G', contacto: 'Carlos Ramirez', email: 'carlos@empresa.com', rol: 'Policia', estado: 'Activo' },
  { ruc: '8080808080', empresa: 'Empresa H', contacto: 'Elena Torres', email: 'elena@empresa.com', rol: 'Registro Nacional', estado: 'Inactivo' },
  { ruc: '9090909090', empresa: 'Empresa I', contacto: 'Roberto Sanchez', email: 'roberto@empresa.com', rol: 'Municipalidad', estado: 'Activo' },
  { ruc: '1111111111', empresa: 'Empresa J', contacto: 'Laura Diaz', email: 'laura@empresa.com', rol: 'Empresa', estado: 'Activo' }
]);

// Computed: Filtrado según búsqueda y selects
const filteredData = computed(() => {
  return tableData.value.filter(item => {
    const searchText = searchQuery.value.toLowerCase();
    const matchesSearch =
        searchQuery.value === '' ||
        item.ruc.toLowerCase().includes(searchText) ||
        item.empresa.toLowerCase().includes(searchText) ||
        item.contacto.toLowerCase().includes(searchText) ||
        item.email.toLowerCase().includes(searchText);
    const matchesRole = selectedRole.value === 'Rol' || item.rol.toLowerCase() === selectedRole.value.toLowerCase();
    const matchesState = selectedState.value === 'Estado' || item.estado.toLowerCase() === selectedState.value.toLowerCase();
    return matchesSearch && matchesRole && matchesState;
  });
});

// Paginación
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
    <header class="flex justify-between items-center">
      <h1 class="text-colorText224 text-[28px] md:text-[32px] font-bold dark:text-white">
        Usuarios
      </h1>
      <button @click="openAddModal" class="btn-primary">
        <IconSquarePlus class="font-bold" />
        <span>Nuevo Usuario</span>
      </button>
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
                id="role"
                v-model="selectedRole"
                class="w-full p-3 text-[12px] md:text-[14px] bg-transparent dark:bg-colorsecundary placeholder-gray-500 dark:placeholder-gray-400 border-none text-colorTextLight dark:text-white cursor-pointer focus:ring-0 rounded-[20px] lg:rounded-none"
            >
              <option value="Rol" disabled>Rol</option>
              <option value="municipalidad">Municipalidad</option>
              <option value="empresa">Empresa</option>
              <option value="policia">Policia</option>
              <option value="mtc">MTC</option>
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
              <th scope="col" class="px-6 py-3">RUC</th>
              <th scope="col" class="px-6 py-3">Empresa</th>
              <th scope="col" class="px-6 py-3">Contacto</th>
              <th scope="col" class="px-6 py-3">Email</th>
              <th scope="col" class="px-6 py-3">Rol</th>
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
              <td class="px-6 py-4">{{ row.ruc }}</td>
              <td class="px-6 py-4">{{ row.empresa }}</td>
              <td class="px-6 py-4">{{ row.contacto }}</td>
              <td class="px-6 py-4">{{ row.email }}</td>
              <td class="px-6 py-4">{{ row.rol }}</td>
              <td class="px-6 py-4">
                <div :class="[
                    row.estado === 'Activo' ? 'bg-colorSuccess' : 'bg-colorAlert',
                    'py-1.5 px-6 text-[12px] flex justify-center items-center rounded-[4.5px] text-white font-bold'
                  ]">
                  {{ row.estado }}
                </div>
              </td>
              <td class="px-6 py-4 flex justify-center items-center">
                <button
                    @click="openEditModal"
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
    <!-- Diálogos -->
    <UserAddDialog :isOpen="isAddModalOpen" @close="closeAddModal" />
    <UserUpdateDialog :isOpen="isEditModalOpen" @close="closeEditModal" />
  </section>
</template>

<style scoped>
</style>
