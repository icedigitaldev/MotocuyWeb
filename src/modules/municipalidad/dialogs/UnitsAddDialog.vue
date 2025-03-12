<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue'
import { IconX, IconDeviceFloppy } from '@tabler/icons-vue'

// Props y emits del modal
const props = defineProps({
  isOpen: Boolean,
})
const emit = defineEmits(['close', 'save'])

// Variables reactivas que coinciden con las etiquetas
const placa = ref('')
const asociacion = ref('')
const marca = ref('')
const motor = ref('')
const fechaEmision = ref('')
const fechaVencimiento = ref('')

// Conductores en array (de ejemplo)
const conductores = ref([
  { licencia: 'ABC123', nombre: 'Juan Pérez' },
  { licencia: 'XYZ987', nombre: 'María González' },
  { licencia: 'AAA111', nombre: 'Pedro Ramírez' },
  { licencia: 'BBB222', nombre: 'Ana López' },
  { licencia: 'BBB222', nombre: 'Ana López' },
])

// Para la búsqueda
const searchQuery = ref('')

// Conductor seleccionado
const conductorSeleccionado = ref(null)

// Computed para filtrar los conductores
const filteredConductores = computed(() => {
  return conductores.value.filter((conductor) => {
    const query = searchQuery.value.toLowerCase().trim()
    return (
        conductor.licencia.toLowerCase().includes(query) ||
        conductor.nombre.toLowerCase().includes(query)
    )
  })
})
</script>

<template>
  <div v-if="isOpen"
       class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="relative p-4 w-full max-w-3xl max-h-full bg-white rounded-lg shadow-lg dark:bg-gray-700 overflow-y-auto">
      <!-- Modal header -->
      <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Nueva unidad</h3>
        <button @click="emit('close')"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <IconX />
        </button>
      </div>

      <!-- Modal body -->
      <div class="px-6 py-5 space-y-4">
        <form
            @submit.prevent="emit('save', {
            placa,
            asociacion,
            marca,
            motor,
            fechaEmision,
            fechaVencimiento,
            conductorSeleccionado
          })"
        >
          <div class="grid grid-cols-2 gap-x-6 gap-y-4 mt-4">
            <!-- Placa -->
            <div>
              <label for="placa" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Placa
              </label>
              <input
                  type="text"
                  id="placa"
                  v-model="placa"
                  placeholder="Ingrese la placa"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-500 rounded-lg
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <!-- Asociación -->
            <div>
              <label for="asociacion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Asociación
              </label>
              <input
                  type="text"
                  id="asociacion"
                  v-model="asociacion"
                  placeholder="Ingrese la asociación"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-500 rounded-lg
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <!-- Marca -->
            <div>
              <label for="marca" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Marca
              </label>
              <input
                  type="text"
                  id="marca"
                  v-model="marca"
                  placeholder="Ingrese la marca"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-500 rounded-lg
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <!-- Motor -->
            <div>
              <label for="motor" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Motor
              </label>
              <input
                  type="text"
                  id="motor"
                  v-model="motor"
                  placeholder="Ingrese el número de motor"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-500 rounded-lg
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

           <div class="col-span-2 gap-x-6 grid grid-cols-2">
             <!-- Título de tarjeta de circulación -->
             <h3 class="col-span-2 text-colorTextLight dark:text-white">Tarjeta de circulación o documento de verificación</h3>

             <!-- Fecha de Emisión -->
             <div class="mt-2">
               <label for="fechaEmision" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Fecha de emisión
               </label>
               <input
                   type="date"
                   id="fechaEmision"
                   v-model="fechaEmision"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-500 rounded-lg
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
               />
             </div>

             <!-- Fecha de Vencimiento -->
             <div class="mt-2">
               <label for="fechaVencimiento" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Fecha de vencimiento
               </label>
               <input
                   type="date"
                   id="fechaVencimiento"
                   v-model="fechaVencimiento"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-500 rounded-lg
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
               />
             </div>
           </div>

            <!-- Asignar conductor con búsqueda y scroll -->
            <div class="mt-4 col-span-2">
              <label for="conductor" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Asignar conductor
              </label>
              <!-- Input para buscar conductor -->
              <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="Buscar por nombre o licencia"
                  class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-500 rounded-lg
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

              <!-- Select con scroll -->
              <select
                  id="conductor"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white
                       overflow-y-auto"
                  size="5"
                  v-model="conductorSeleccionado"
              >
                <!-- Iteramos conductores filtrados -->
                <option
                    v-for="conductor in filteredConductores"
                    :key="conductor.licencia"
                    :value="conductor"
                >
                  {{ conductor.licencia }} - {{ conductor.nombre }}
                </option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <!-- Modal footer -->
      <div class="flex flex-row-reverse gap-6 items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
            @click="emit('save', {
            placa,
            asociacion,
            marca,
            motor,
            fechaEmision,
            fechaVencimiento,
            conductorSeleccionado
          })"
            class="flex items-center gap-2.5 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <IconDeviceFloppy />
          Guardar
        </button>
        <button
            @click="emit('close')"
            class="flex items-center gap-2.5 py-2.5 px-5 ms-3 text-sm font-medium text-red-400 focus:outline-none bg-white rounded-lg border border-red-400 hover:bg-red-50 hover:text-red-400
                 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400
                 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <IconX/>
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>



<style scoped></style>
