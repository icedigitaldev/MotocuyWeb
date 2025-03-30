<script setup>
import { ref, computed } from 'vue'
import { IconSquarePlus, IconTrash, IconEdit } from '@tabler/icons-vue'
import PromoAddDialog from '../../modules/admin/dialogs/PromoAddDialog.vue';


const isAddModalOpen = ref(false);

const openAddModal = () => {
  isAddModalOpen.value = true;
};
const closeAddModal = () => {
  isAddModalOpen.value = false;
};


const promociones = ref([
  {
    id: 1,
    titulo: "Bono por iniciación",
    descripcion: "S/ 10 en tu primer viaje como nuevo usuario",
    tipo: "Monto fijo",
    monto: 10,
    minimo: 10,
    desde: null,
    hasta: null,
    usosPorUsuario: 1,
    usosTotales: 100,
    restricciones: "Solo nuevos usuarios",
    sector: "Global",
    ubicacion: {
      departamento: "Lima",
      provincia: "Lima",
      distrito: "Lima"
    },
    activo: true
  },
  {
    id: 2,
    titulo: "Bono por referidos",
    descripcion: "Gana S/ 15 por cada amigo que invites",
    tipo: "Monto fijo",
    monto: 15,
    minimo: 20,
    desde: "2024-01-01",
    hasta: "2025-01-01",
    usosPorUsuario: 5,
    usosTotales: 500,
    restricciones: "Solo con código de referido",
    sector: "Global",
    ubicacion: {
      departamento: "Cusco",
      provincia: "Cusco",
      distrito: "Cusco"
    },
    activo: true
  },
  {
    id: 3,
    titulo: "Bono de fidelidad",
    descripcion: "Recibe S/ 5 después de 3 viajes completados",
    tipo: "Monto fijo",
    monto: 5,
    minimo: 5,
    desde: null,
    hasta: null,
    usosPorUsuario: 1,
    usosTotales: 1000,
    restricciones: "Solo usuarios frecuentes",
    sector: "Segmentado",
    ubicacion: {
      departamento: "Arequipa",
      provincia: "Arequipa",
      distrito: "Arequipa"
    },
    activo: false
  }
])

</script>

<template>
<section>
    <header class="flex justify-between items-center">
      <h1 class="text-colorText333 text-[28px] md:text-[32px] font-bold dark:text-white">
        Listado de Promociones
      </h1>
      <button @click="openAddModal" class="btn-primary">
        <IconSquarePlus class="font-bold" />
        <span>Nueva Promoción</span>
      </button>
    </header>
    <main class="mt-7">
        <!-- Iterate over promociones array to create cards -->
        <div v-for="promocion in promociones" :key="promocion.id" 
             :class="['p-5 rounded-[20px] mb-4', 
                      promocion.activo ? 'border-2 border-green-500 bg-white dark:bg-colorsecundary' : 'border-2 border-red-500 bg-white dark:bg-colorsecundary']">
            <!-- Header card -->
            <div class="flex flex-col-reverse gap-4 md:gap-0 md:flex-row justify-between items-start">
               <div class="text-colorText333 dark:text-white">
                    <span class="text-[14px]">{{ promocion.titulo }}</span>
                    <h3 class="text-[24px] font-bold">{{ promocion.titulo }}</h3>
                    <p class="text-[12px]">{{ promocion.descripcion }}</p>
               </div>
               
                <div class="inline-flex rounded-md shadow-xs" role="group">
                    <div type="button" class="px-4 flex items-center py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                        <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" :checked="promocion.activo" class="sr-only peer">
                            <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                        </label>
                    </div>
                    <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700">
                        <IconEdit/>
                    </button>
                    <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-red-100 hover:text-red-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-red-100 dark:hover:bg-red-700">
                        <IconTrash/>
                    </button>
                </div>
             </div>
             <!-- Body card -->
             <div class="mt-4 flex flex-col md:flex-row justify-between gap-2 md:gap-8">
                <table class="w-full">
                    <tbody class="text-xs text-left text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Tipo
                            </th>
                            <td class="px-6 py-2">
                                {{ promocion.tipo }}
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Monto
                            </th>
                            <td class="px-6 py-2">
                                S/. {{ promocion.monto }}
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Inicio
                            </th>
                            <td class="px-6 py-2">
                                {{ promocion.desde || 'No especificado' }}
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Fin
                            </th>
                            <td class="px-6 py-2">
                                {{ promocion.hasta || 'No especificado' }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table class="w-full">
                    <tbody class="text-xs text-left text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Restricciones
                            </th>
                            <td class="px-6 py-2">
                                {{ promocion.restricciones }}
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Mínimo Aplicable
                            </th>
                            <td class="px-6 py-2">
                                S/. {{ promocion.minimo }}
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                               Usos por usuario
                            </th>
                            <td class="px-6 py-2">
                                {{ promocion.usosPorUsuario }}
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                               Usos Totales
                            </th>
                            <td class="px-6 py-2">
                                {{ promocion.usosTotales }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table class="w-full">
                    <tbody class="text-xs text-left text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Sectorización
                            </th>
                            <td class="px-6 py-2">
                                {{ promocion.sector }}
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Departamento
                            </th>
                            <td class="px-6 py-2">
                                {{ promocion.ubicacion.departamento }}
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Provincia
                            </th>
                            <td class="px-6 py-2">
                                {{ promocion.ubicacion.provincia }}
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Distrito
                            </th>
                            <td class="px-6 py-2">
                                {{ promocion.ubicacion.distrito }}
                            </td>
                        </tr>
                    </tbody>
                </table>
             </div>
        </div>
    </main>
    <PromoAddDialog :isOpen="isAddModalOpen" @close="closeAddModal" />
</section>
</template>

<style scoped>

</style>