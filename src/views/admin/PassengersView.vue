<script setup>
import { ref, computed, watch } from 'vue';
import {
  IconFilter,
  IconSearch,
  IconRotate2,
  IconArrowRight
} from '@tabler/icons-vue';

// Importar datos JSON
import departamentos from '@/data/json-ubigeo/ubigeo_peru_2016_departamentos.json'
import provincias from '@/data/json-ubigeo/ubigeo_peru_2016_provincias.json'
import distritos from '@/data/json-ubigeo/ubigeo_peru_2016_distritos.json'
import UniversalContainerLayout from '../../components/UniversalContainerLayout.vue'

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
  { dni: '12345678', nombre: 'Carlos Ruiz', email: 'carlos@gmail.com', telefono: '987654321', sexo: 'Masculino', estado: 'Activo' },
  { dni: '23456789', nombre: 'Ana Torres', email: 'ana.t@gmail.com', telefono: '912345678', sexo: 'Femenino', estado: 'Inactivo' },
  { dni: '34567890', nombre: 'Luis Gómez', email: 'luisg@correo.com', telefono: '986543210', sexo: 'Masculino', estado: 'Activo' },
  { dni: '45678901', nombre: 'Lucía Pérez', email: 'lucia.p@gmail.com', telefono: '923456789', sexo: 'Femenino', estado: 'Inactivo' },
  { dni: '56789012', nombre: 'Marco Díaz', email: 'marco_dz@mail.com', telefono: '934567890', sexo: 'Masculino', estado: 'Activo' },
  { dni: '67890123', nombre: 'Elena Rojas', email: 'elena_rojas@mail.com', telefono: '945678901', sexo: 'Femenino', estado: 'Inactivo' },
  { dni: '78901234', nombre: 'Pedro Ramos', email: 'pedro.ramos@mail.com', telefono: '956789012', sexo: 'Masculino', estado: 'Activo' },
  { dni: '89012345', nombre: 'Sofía Vega', email: 'sofia_vega@gmail.com', telefono: '967890123', sexo: 'Femenino', estado: 'Inactivo' },
  { dni: '90123456', nombre: 'Jorge Castillo', email: 'jorge.c@gmail.com', telefono: '978901234', sexo: 'Masculino', estado: 'Activo' },
  { dni: '01234567', nombre: 'Valeria Luna', email: 'valeria.luna@correo.com', telefono: '989012345', sexo: 'Femenino', estado: 'Inactivo' }
]);

// ----- Filtrado -----
const filteredData = computed(() => {
  return tableData.value.filter(item => {
    const matchesSearch =
        searchQuery.value === '' ||
        item.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.dni.includes(searchQuery.value) ||
        item.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesEstado =
        selectedEstado.value === 'Estado' || item.estado === selectedEstado.value; // Corrected to use estado
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
        Lista de Pasajeros
      </h1>
      <div class="flex gap-4 md:gap-6 flex-col md:flex-row  ">
        <div class="w-full col-span-2 lg:col-span-1 flex flex-col lg:flex-row justify-end items-center gap-4 lg:gap-6">
          <!-- SELECT DEPARTAMENTO -->
          <select
            id="select-departamento"
            v-model="selectedDepartamento"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm
                   rounded-lg focus:ring-blue-500 focus:border-blue-500
                   block w-full lg:w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600
                   dark:placeholder-gray-400 dark:text-white
                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option disabled value="">Departamento</option>
            <option
              v-for="dep in departamentos"
              :key="dep.id"
              :value="dep.id"
            >
              {{ dep.name }}
            </option>
          </select>

          <!-- SELECT PROVINCIA -->
          <select
            id="select-provincia"
            v-model="selectedProvincia"
            :disabled="!selectedDepartamento"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm
                   rounded-lg focus:ring-blue-500 focus:border-blue-500
                   block w-full lg:w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600
                   dark:placeholder-gray-400 dark:text-white
                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option disabled value="">Provincia</option>
            <option
              v-for="prov in filteredProvincias"
              :key="prov.id"
              :value="prov.id"
            >
              {{ prov.name }}
            </option>
          </select>

          <!-- SELECT DISTRITO -->
          <select
            id="select-distrito"
            v-model="selectedDistrito"
            :disabled="!selectedProvincia"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm
                   rounded-lg focus:ring-blue-500 focus:border-blue-500
                   block w-full lg:w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600
                   dark:placeholder-gray-400 dark:text-white
                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option disabled value="">Distrito</option>
            <option
              v-for="dist in filteredDistritos"
              :key="dist.id"
              :value="dist.id"
            >
              {{ dist.name }}
            </option>
          </select>
        </div>
         <div
            class="md:tooltip h-fit md:tooltip-left w-auto bg-gray-200 md:bg-gray-200 dark:bg-gray-800 flex-[0.2] justify-center dark:border-gray-600 font-bold text-colorAlert flex items-center gap-2.5 p-3 text-[12px] md:text-[14px] cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800 rounded-lg"
            data-tip="Restablecer filtros"
            @click="resetFilters"
            >
            <IconRotate2 class="w-5 md:w-6" />
            <span class="flex md:hidden">Restablecer</span>
          </div>
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
                  <th class="px-6 py-3">DNI</th>
                  <th class="px-6 py-3">Nombre</th>
                  <th class="px-6 py-3">Email</th>
                  <th class="px-6 py-3">Teléfono</th>
                  <th class="px-6 py-3">Sexo</th>
                  <th class="px-6 py-3">Estado</th> <!-- New column for Estado -->
                  <th class="px-6 py-3">Ver más</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in paginatedData" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-4">{{ row.dni }}</td>
                  <td class="px-6 py-4">{{ row.nombre }}</td>
                  <td class="px-6 py-4">{{ row.email }}</td>
                  <td class="px-6 py-4">{{ row.telefono }}</td>
                  <td class="px-6 py-4">{{ row.sexo }}</td>
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
                    <RouterLink to="infopassenger" class="md:tooltip md:tooltip-left" data-tip="Ver información">
                    <button
                        class="font-medium relative text-blue-600 p-[6px] border border-colorBorderButtonLigth dark:bg-[#323D4E] dark:border-gray-600 dark:text-white bg-[#FAFBFD] rounded-[8px]"
                    >
                      <IconArrowRight />
                    </button>
                  </RouterLink>
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
  </section>
</template>

<style scoped>

</style>