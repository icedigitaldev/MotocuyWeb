<script setup>
import { ref, computed } from 'vue'
import { IconArrowNarrowLeft,  IconSearch,  IconFilter,  IconRotate2,  IconArrowRight, IconId, IconMail,IconCalendarEventFilled,  IconPhone, IconUser, IconStar, IconFlag, IconCake, IconPhonePlus } from '@tabler/icons-vue'
import UniversalContainerLayout from '../../components/UniversalContainerLayout.vue';




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
  { cod: '001', fecha: '2023-12-01', conductor: 'Carlos Ruiz', horaRecogida: '08:00', horaDestino: '09:00', ubicacionRecogida: 'Av. Principal', ubicacionDestino: 'Calle Secundaria', costo: '20.00', estado: 'Completado' },
  { cod: '002', fecha: '2023-12-02', conductor: 'Ana Torres', horaRecogida: '10:00', horaDestino: '11:00', ubicacionRecogida: 'Jr. Los Olivos', ubicacionDestino: 'Av. Las Flores', costo: '15.00', estado: 'Cancelado' },
  { cod: '003', fecha: '2023-12-03', conductor: 'Luis Pérez', horaRecogida: '12:00', horaDestino: '13:00', ubicacionRecogida: 'Calle Falsa', ubicacionDestino: 'Av. Siempre Viva', costo: '25.00', estado: 'Completado' },
  { cod: '004', fecha: '2023-12-04', conductor: 'María López', horaRecogida: '14:00', horaDestino: '15:00', ubicacionRecogida: 'Pasaje Oculto', ubicacionDestino: 'Av. Independencia', costo: '30.00', estado: 'Cancelado' },
  { cod: '005', fecha: '2023-12-05', conductor: 'Pedro Sánchez', horaRecogida: '16:00', horaDestino: '17:00', ubicacionRecogida: 'Callejón 111', ubicacionDestino: 'Carretera Central', costo: '18.00', estado: 'Completado' },
  { cod: '006', fecha: '2023-12-06', conductor: 'Lucía Fernández', horaRecogida: '18:00', horaDestino: '19:00', ubicacionRecogida: 'Av. Las Flores', ubicacionDestino: 'Jr. Los Olivos', costo: '22.00', estado: 'Cancelado' },
  { cod: '007', fecha: '2023-12-07', conductor: 'Jorge Ramírez', horaRecogida: '20:00', horaDestino: '21:00', ubicacionRecogida: 'Av. Principal', ubicacionDestino: 'Calle Secundaria', costo: '19.00', estado: 'Completado' },
  { cod: '008', fecha: '2023-12-08', conductor: 'Elena García', horaRecogida: '22:00', horaDestino: '23:00', ubicacionRecogida: 'Jr. Secundario', ubicacionDestino: 'Calle Falsa', costo: '24.00', estado: 'Cancelado' }
]);

// ----- Filtrado -----
const filteredData = computed(() => {
  return tableData.value.filter(item => {
    const matchesSearch =
        searchQuery.value === '' ||
        item.conductor.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.cod.includes(searchQuery.value) ||
        item.fecha.includes(searchQuery.value);
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
    <header class="flex items-center gap-4">
    <RouterLink to="passengers" data-tip="Volver" class="btn-primary  md:tooltip md:tooltip-bottom hover:bg-gray-100 hover:text-colorsecundary dark:text-white">
        <IconArrowNarrowLeft/>
    </RouterLink>
     <h1 class="flex-0.2 text-colorText333 text-[28px] md:text-[32px] font-bold dark:text-white">
        Información del Pasajero [Nombre del Pasajero]
      </h1>
    </header>

    <div class="grid grid-cols-12 gap-8 mt-8">
        <!-- Card información principal -->
        <UniversalContainerLayout class="col-span-12 md:col-span-6">
           <div class="flex flex-col gap-4">
            <header class="flex items-center justify-between">
                <div class="flex gap-2.5 items-center">
                    <div class="border-4 border-colorBlueText dark:border-white w-fit rounded-full p-1">
                        <img src="@/assets/profile.jpg" class="w-[60px] h-[60px] object-cover rounded-full" />
                    </div>
                    <div>
                        <h3 class="text-[16px] font-semibold text-colorBlueText dark:text-white">Juan de la Torre Gomez</h3>
                        <span class="text-[12px] text-gray-400 flex gap-1 items-center">
                            <IconId />
                            123456789
                        </span>
                    </div>
                </div>
                <label class="inline-flex items-center mb-5 cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer">
                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                </label>
            </header>
            <div class="grid grid-cols-2">
                <div class="text-colorBlueText py-2 dark:text-white col-span-1 text-[14px] flex flex-col gap-2 border-r border-gray-400">
                    <span class=" flex gap-1 items-center">
                        <IconMail/>
                        juandelatorre@gmail.com
                    </span>
                    <span class=" flex gap-1 items-center">
                        <IconPhone/>
                        +51 959 659 501
                    </span>
                    <span class=" flex gap-1 items-center">
                        <IconUser/>
                        Masculino
                    </span>
                    <span class=" flex gap-1 items-center">
                        <IconFlag/>
                        Peruano
                    </span>
                    <span class=" flex gap-1 items-center">
                        <IconCake/>
                        04-12-2001
                    </span>
                    <span class="flex gap-1 items-center">
                        <IconPhonePlus/>
                        +51 959 659 500
                    </span>
                </div>
                <div class="col-span-1 flex flex-col justify-between py-2">
                    <div class="flex flex-col gap-3  items-center">
                        <h3 class="text-[16px] text-colorBlueText dark:text-white font-semibold">Clasificación</h3>
                        <div class="flex items-center gap-2">
                            <IconStar class="text-yellow-300 fill-yellow-300"/>
                            <IconStar class="text-yellow-300 fill-yellow-300"/>
                            <IconStar class="text-yellow-300 fill-yellow-300"/>
                            <IconStar class="text-yellow-300 fill-yellow-300"/>
                        </div>
                        <span class="text-colorBlueText dark:text-white font-semibold text-[14px]">Normal</span>
                    </div>
                    <div class="grid grid-cols-2 ">
                        <div class="flex flex-col gap-1 items-center">
                            <span class="text-[20px] text-colorBlueText dark:text-white font-semibold">0</span>
                            <span class="text-[14px] text-colorBlueText dark:text-white">Quejas</span>
                        </div>
                        <div class="flex flex-col gap-1 items-center">
                            <span class="text-[20px] text-colorBlueText dark:text-white font-semibold">0</span>
                            <span class="text-[14px] text-colorBlueText dark:text-white">Emergencias</span>
                        </div>
                    </div>
                </div>
            </div>
           </div>
        </UniversalContainerLayout>

        <!-- Card información Saldo -->
        <UniversalContainerLayout class="col-span-12 md:col-span-6">
            <div class="flex flex-col justify-between h-full">
                <div class="py-2 border-b border-gray-500 flex justify-between text-colorBlueText dark:text-white">
                    <h2 class="text-[18px] font-bold ">Saldo actual</h2>
                    <span class="font-bold">S/. 80.00</span>
                </div>
                <div class="overflow-y-auto py-4 h-52 overflow-hidden-scroll"> <!-- Add custom class -->
                    <div class="flex py-2 border-b border-gray-300 dark:border-gray-600 justify-between items-center">
                        <div>
                            <span class="text-[16px] text-colorBlueText dark:text-white">Recarga</span>
                            <span class="flex gap-1 text-[12px] items-center text-gray-400 dark:text-gray-300">
                                <IconCalendarEventFilled class="w-4"/>
                                20-12-2023
                            </span>
                        </div>
                        <span class="text-colorBlueText dark:text-white">
                            S/. 100.00
                        </span>
                    </div>
                    <div class="flex py-2 border-b border-gray-300 dark:border-gray-600 justify-between items-center">
                        <div>
                            <span class="text-[16px] text-colorBlueText dark:text-white">Recarga</span>
                            <span class="flex gap-1 text-[12px] items-center text-gray-400 dark:text-gray-300">
                                <IconCalendarEventFilled class="w-4"/>
                                20-12-2023
                            </span>
                        </div>
                        <span class="text-colorBlueText dark:text-white">
                            S/. 100.00
                        </span>
                    </div>

                    <!-- Add more content here if needed -->
                </div>
                <div class="py-2 border-t border-gray-500 flex justify-between text-colorBlueText dark:text-white">
                    <h2 class="text-[18px] font-bold ">Total</h2>
                    <span class="font-bold">S/. 400.00</span>
                </div>
            </div>
        </UniversalContainerLayout>

        <UniversalContainerLayout class="col-span-12">
            <div>
                <h2 class="mb-3 text-colorText333 dark:text-white text-[22px] font-semibold">Historial de viajes</h2>
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
                    <option value="Completado">Completado</option>
                    <option value="Cancelado">Cancelado</option>
                    </select>
                </div>
                <div @click="resetFilterstable" class="cursor-pointer flex items-center gap-2.5 p-3 font-bold text-colorAlert hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-lg">
                    <IconRotate2 class="w-5 md:w-6" />
                    <span class="hidden md:block">Restablecer</span>
                </div>
                </div>
            </div>
            </div>

            <!-- Tabla -->
            <div class="">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th class="px-6 py-3">Cod</th>
                        <th class="px-6 py-3">Fecha</th>
                        <th class="px-6 py-3">Conductor</th>
                        <th class="px-6 py-3">Hora Recogida</th>
                        <th class="px-6 py-3">Hora Destino</th>
                        <th class="px-6 py-3">Ubicación Recogida</th>
                        <th class="px-6 py-3">Ubicación Destino</th>
                        <th class="px-6 py-3">Costo</th>
                        <th class="px-6 py-3">Estado</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(row, index) in paginatedData" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td class="px-6 py-4">{{ row.cod }}</td>
                        <td class="px-6 py-4">{{ row.fecha }}</td>
                        <td class="px-6 py-4">{{ row.conductor }}</td>
                        <td class="px-6 py-4">{{ row.horaRecogida }}</td>
                        <td class="px-6 py-4">{{ row.horaDestino }}</td>
                        <td class="px-6 py-4">{{ row.ubicacionRecogida }}</td>
                        <td class="px-6 py-4">{{ row.ubicacionDestino }}</td>
                        <td class="px-6 py-4">{{ row.costo }}</td>
                        <td class="px-6 py-4">
                        <div
                            :class="[row.estado === 'Completado' ? 'bg-colorSuccess' : 'bg-colorAlert', 'py-1.5 px-6 text-[12px] flex justify-center items-center rounded-[4.5px] text-white font-bold']"
                        >
                            {{ row.estado }}
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
    </div>
</section>
</template>

  <style scoped>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .overflow-hidden-scroll::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .overflow-hidden-scroll {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  </style>