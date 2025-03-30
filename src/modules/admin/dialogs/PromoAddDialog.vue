<script setup>
import {defineProps, defineEmits, ref, computed, watch} from 'vue';
// Importar datos JSON
import departamentos from '@/data/json-ubigeo/ubigeo_peru_2016_departamentos.json'
import provincias from '@/data/json-ubigeo/ubigeo_peru_2016_provincias.json'
import distritos from '@/data/json-ubigeo/ubigeo_peru_2016_distritos.json'

const department = ref('');
const province = ref('');
const district = ref('');
const tipo = ref(''); 
const tipoBeneficio = ref('');
const sectorizacion = ref('');

// Computed: Provincias filtradas según 'department'
const filteredProvincias = computed(() => {
  if (!department.value) return []
  return provincias.filter(prov => prov.department_id === department.value)
})

// Computed: Distritos filtrados según 'province'
const filteredDistritos = computed(() => {
  if (!province.value) return []
  return distritos.filter(dist => dist.province_id === province.value)
})

// Watchers que resetean valores encadenados
watch(department, () => {
  province.value = ''
  district.value = ''
})

watch(province, () => {
  district.value = ''
})

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['close']);

</script>
<template>

<div v-if="isOpen"
       class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div
        class="relative p-4 w-full max-w-4xl max-h-full bg-white rounded-lg shadow-lg dark:bg-gray-700 overflow-y-auto">
      <!-- Modal header -->
      <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Nueva Promoción</h3>
        <button @click="emit('close')"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <!-- Modal body -->
       <div class="my-8 grid grid-cols-12 gap-6">
            <div class="col-span-12 md:col-span-4">
                <label for="rol" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de Promoción *</label>
                <select id="rol" v-model="tipo"
                        class="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled>Seleccione Tipo de Promoción</option> 
                    <option value="bonoInicio">Bono por Primera Vez</option>
                    <option value="BonoLimitado">Promoción por Tiempo Limitado.</option>
                </select>
            </div>
            <div class="col-span-12 md:col-span-4">
                <label for="companyName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nombre de la Promoción *    
                </label>
                <input type="text" placeholder="Nombre de promoción"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="col-span-12 md:col-span-4">
                <label for="companyName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Descripción *
                </label>
                <input type="text" placeholder="Descripción de la promoción"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="col-span-12 md:col-span-3">
                <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de beneficio *</label>
                <select 
                    v-model="tipoBeneficio"
                        class="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled>Seleccione Tipo</option> 
                    <option value="montoFijo">Monto Fijo</option>
                    <option value="porcentaje">Porcentaje</option>
                </select>
            </div>
            <div class="col-span-12 md:col-span-3">
                <label for="companyName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Monto *
                </label>
                <input type="number" placeholder="Ingrese el monto"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="col-span-12 md:col-span-3">
                <label for="companyName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Válido desde *
                </label>
                <input type="date" placeholder="Ingrese el monto"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="col-span-12 md:col-span-3">
                <label for="companyName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Válido hasta *
                </label>
                <input type="date" placeholder="Ingrese el monto"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="col-span-12">
                <label for="companyName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Restricciones *</label>
                    <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div class="flex items-center ps-3">
                                <input id="horizontal-list-radio-license" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                <label for="horizontal-list-radio-license" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Solo para nuevos usuarios </label>
                            </div>
                        </li>
                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div class="flex items-center ps-3">
                                <input id="horizontal-list-radio-id" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                <label for="horizontal-list-radio-id" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Monto Mínimo Aplicable</label>
                            </div>
                        </li>
                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div class="flex items-center ps-3">
                                <input id="horizontal-list-radio-military" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                <label for="horizontal-list-radio-military" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Límite de Usos por Usuario</label>
                            </div>
                        </li>
                        <li class="w-full dark:border-gray-600">
                            <div class="flex items-center ps-3">
                                <input id="horizontal-list-radio-passport" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                <label for="horizontal-list-radio-passport" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Máximo de Usos Totales</label>
                            </div>
                        </li>
                    </ul>
            </div>
            <div class="col-span-12 md:col-span-4">
                <label for="companyName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Monto Mínimo Aplicable *
                </label>
                <input type="number" placeholder="Ingrese el monto mínimo"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="col-span-12 md:col-span-4">
                <label for="companyName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Límite de Usos por Usuario *
                </label>
                <input type="number" placeholder="Ingrese el límite de usos"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="col-span-12 md:col-span-4">
                <label for="companyName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Máximo de Usos Totales*
                </label>
                <input type="number" placeholder="Ingrese el máximo de usos"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="col-span-12 md:col-span-3">
                <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sectorización *</label>
                <select 
                    v-model="sectorizacion"
                        class="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled>Sectorización</option> 
                    <option value="sectGlobal">Global</option>
                    <option value="sectSectorizado">Sectorizado</option>
                </select>
            </div>
            <div class="col-span-12 md:col-span-3">
              <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Departamento *</label>
              <select id="department" v-model="department"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Departamento</option>
                <option v-for="dep in departamentos" :key="dep.id" :value="dep.id">
                  {{ dep.name }}
                </option>
              </select>
            </div>
            <div class="col-span-12 md:col-span-3">
              <label for="province" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Provincia *</label>
              <select id="province" v-model="province" :disabled="!department"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Seleccione Provincia</option>
                <option v-for="prov in filteredProvincias" :key="prov.id" :value="prov.id">
                  {{ prov.name }}
                </option>
              </select>
            </div>
            <div class="col-span-12 md:col-span-3">
              <label for="district" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distrito *</label>
              <select id="district" v-model="district" :disabled="!province"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Seleccione Distrito</option>
                <option v-for="dist in filteredDistritos" :key="dist.id" :value="dist.id">
                  {{ dist.name }}
                </option>
              </select>
            </div>
       </div>
      <!-- Modal footer -->
      <div class="flex flex-row-reverse gap-6 items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
            class="flex items-center gap-2.5 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
          <IconDeviceFloppy/>
          Guardar
        </button>
        <button @click="emit('close')"
                class="flex items-center gap-2.5 py-2.5 px-5 ms-3 text-sm font-medium text-red-400 focus:outline-none bg-white rounded-lg border border-red-400 hover:bg-red-50 hover:text-red-400 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          <IconX/>
          Cancelar
        </button>
      </div>
    </div>
  </div>

</template>
<style scoped>
</style>