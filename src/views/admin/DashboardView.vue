<script setup>
import {ref, computed, watch} from 'vue'

// Importar datos JSON
import departamentos from '@/data/json-ubigeo/ubigeo_peru_2016_departamentos.json'
import provincias from '@/data/json-ubigeo/ubigeo_peru_2016_provincias.json'
import distritos from '@/data/json-ubigeo/ubigeo_peru_2016_distritos.json'

// Variables reactivas para el toggle y los selects
const isSearchActive = ref(false)        // Controla si la búsqueda está activada
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

 watch(isSearchActive, (newValue) => {
   if (!newValue) {
     // Apagado => Reseteamos los selects
     selectedDepartamento.value = ''
     selectedProvincia.value = ''
     selectedDistrito.value = ''
   }
 })
</script>

<template>
  <section>
    <header class="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center  gap-6 lg:gap-0">
      <h1 class="flex-0.2 text-colorText333 text-[28px] md:text-[32px] font-bold dark:text-white">
        Dashboard
      </h1>
     <div class="flex-1 w-full grid grid-cols-2 justify-items-start lg:justify-items-end gap-6">
       <label class="col-span-2 lg:col-span-1 inline-flex items-center cursor-pointer">
         <!-- Enlazamos el checkbox a isSearchActive con v-model -->
         <input
             type="checkbox"
             class="sr-only peer"
             v-model="isSearchActive"
         />
         <!-- Estilos de Tailwind para el switch -->
         <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
                      peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full
                      peer dark:bg-gray-700 peer-checked:after:translate-x-full
                      rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white
                      after:content-[''] after:absolute after:top-[2px] after:start-[2px]
                      after:bg-white after:border-gray-300 after:border after:rounded-full
                      after:h-5 after:w-5 after:transition-all dark:border-gray-600
                      peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
         ></div>
         <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Activar búsqueda
          </span>
       </label>
       <div class="w-full col-span-2 lg:col-span-1 flex flex-col lg:flex-row  justify-end items-center gap-4 lg:gap-6">
         <!-- SELECT DEPARTAMENTO -->
         <select
             id="select-departamento"
             v-model="selectedDepartamento"
             :disabled="!isSearchActive"
             class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm
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
             :disabled="!isSearchActive || !selectedDepartamento"
             class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm
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
             :disabled="!isSearchActive || !selectedProvincia"
             class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm
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
     </div>
    </header>
  </section>
</template>

<style scoped>
/* Tus estilos locales */
</style>
