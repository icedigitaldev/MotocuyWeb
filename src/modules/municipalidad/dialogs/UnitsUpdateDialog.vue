<script setup>
import { defineProps, defineEmits, ref, computed, watch, nextTick, onMounted } from 'vue'
import { IconX, IconDeviceFloppy } from '@tabler/icons-vue'
import { initFlowbite, Datepicker } from 'flowbite'

const props = defineProps({
  isOpen: Boolean,
  unidad: {
    type: Object,
    default: () => ({})
  },
  conductores: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'update'])

// Campos a editar
const placa = ref('')
const asociacion = ref('')
const marca = ref('')
const motor = ref('')
const fechaEmision = ref('')
const fechaVencimiento = ref('')
const estado = ref(false) // Changed to ref for reactivity

// Manejo del dropdown de conductores (reutilizamos la prop conductores)
const searchQuery = ref('')
const isDropdownOpen = ref(false)
const conductorSeleccionado = ref(null)

// Computed para filtrar conductores según query
const filteredConductores = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  return props.conductores.filter((c) => {
    return (
      c.licencia.toLowerCase().includes(query) ||
      c.nombre.toLowerCase().includes(query)
    )
  })
})

// Cerrar dropdown si se hace clic fuera
const cerrarDropdown = (event) => {
  if (!event.target.closest('.dropdown-container')) {
    isDropdownOpen.value = false
  }
}
onMounted(() => {
  document.addEventListener('click', cerrarDropdown)
})

// Seleccionar un conductor
const seleccionarConductor = (conductor) => {
  conductorSeleccionado.value = conductor
  isDropdownOpen.value = false
}

// Cuando se abra el modal (isOpen = true) y tengamos la unidad, cargamos valores
watch(
  () => props.isOpen,
  (val) => {
    if (val && props.unidad) {
      placa.value = props.unidad.placa || ''
      asociacion.value = props.unidad.asociacion || ''
      marca.value = props.unidad.marca || ''
      motor.value = props.unidad.motor || ''
      // Suponiendo que la expedición de la tabla = fechaEmision aquí
      fechaEmision.value = props.unidad.fechaEmision || props.unidad.expedicion || ''
      fechaVencimiento.value = props.unidad.fechaVencimiento || ''
      estado.value = props.unidad.estado || false // Initialize estado from props
      
      // Buscar el conductor en el array que coincida por nombre
      if (props.unidad.conductor) {
        conductorSeleccionado.value =
          props.conductores.find(
            (c) =>
              c.nombre.toLowerCase() === props.unidad.conductor.toLowerCase()
          ) || null
      } else {
        conductorSeleccionado.value = null
      }

      // Tras asignar, inicializamos datepickers
      nextTick(() => {
        initDatepickers()
      })
    }
  },
  { immediate: true }
)

// Inicializamos Flowbite datepickers
const initDatepickers = () => {
  const fechaEmisionInput = document.getElementById('fechaEmisionInput')
  const fechaVencimientoInput = document.getElementById('fechaVencimientoInput')

  if (fechaEmisionInput && !fechaEmisionInput._datepicker) {
    new Datepicker(fechaEmisionInput, {
      format: 'yyyy-mm-dd',
      autohide: true,
      orientation: 'auto'
    })
  }
  if (fechaVencimientoInput && !fechaVencimientoInput._datepicker) {
    new Datepicker(fechaVencimientoInput, {
      format: 'yyyy-mm-dd',
      autohide: true,
      orientation: 'auto'
    })
  }
}

// Al guardar, emitimos 'update' con los campos
const guardarCambios = () => {
  emit('update', {
    // aquí mezclas lo que necesites
    placa: placa.value,
    asociacion: asociacion.value,
    marca: marca.value,
    motor: motor.value,
    fechaEmision: fechaEmision.value,
    fechaVencimiento: fechaVencimiento.value,
    estado: estado.value, // Include estado in the update
    conductor: conductorSeleccionado.value
      ? conductorSeleccionado.value.nombre
      : ''
  })
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50"
  >
    <div
      class="relative p-4 w-full max-w-3xl max-h-full bg-white rounded-lg shadow-lg dark:bg-gray-700 overflow-y-auto"
    >
      <!-- Modal header -->
      <div
        class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200"
      >
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          Editar unidad
        </h3>
        <button
          @click="emit('close')"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <IconX />
        </button>
      </div>

      <!-- Modal body -->
      <div class="px-6 py-5 space-y-4">
        <form @submit.prevent="guardarCambios">
          <div class="grid grid-cols-2 gap-x-6 gap-y-4 mt-4">
            <!-- Placa -->
            <div class="col-span-2 md:col-span-1">
              <label
                for="placa"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
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
            <div class="col-span-2 md:col-span-1">
              <label
                for="asociacion"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
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
            <div class="col-span-2 md:col-span-1">
              <label
                for="marca"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
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
            <div class="col-span-2 md:col-span-1">
              <label
                for="motor"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
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

            <!-- Tarjeta de circulación o documento de verificación -->
            <div class="col-span-2">
              <h3 class="col-span-2 mb-4 mt-2 text-colorTextLight dark:text-white">
                Tarjeta de circulación o documento de verificación
              </h3>
              <div class="gap-x-6 gap-y-4 grid grid-cols-2">
                <!-- Fecha de Emisión -->
                <div class="col-span-2 md:col-span-1">
                  <label
                    for="fechaEmisionInput"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Fecha de emisión
                  </label>
                  <div class="relative max-w-sm">
                    <div
                      class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
                    >
                      <svg
                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                        />
                      </svg>
                    </div>
                    <input
                      datepicker
                      id="fechaEmisionInput"
                      v-model="fechaEmision"
                      type="text"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Seleccione fecha de emisión"
                    />
                  </div>
                </div>

                <!-- Fecha de Vencimiento -->
                <div class="col-span-2 md:col-span-1">
                  <label
                    for="fechaVencimientoInput"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Fecha de vencimiento
                  </label>
                  <div class="relative max-w-sm">
                    <div
                      class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
                    >
                      <svg
                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                        />
                      </svg>
                    </div>
                    <input
                      datepicker
                      id="fechaVencimientoInput"
                      v-model="fechaVencimiento"
                      type="text"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Seleccione fecha de vencimiento"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Asignar conductor con búsqueda y dropdown -->
            <div class="mt-4 col-span-2 dropdown-container">
              <label
                for="conductor"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Asignar conductor
              </label>
              <!-- Input para buscar conductor -->
              <div class="relative">
                <input
                  type="text"
                  v-model="searchQuery"
                  @click="isDropdownOpen = true"
                  placeholder="Buscar por nombre o licencia"
                  class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder-gray-500 rounded-lg
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <!-- Dropdown con opciones -->
                <div
                  v-if="isDropdownOpen"
                  class="absolute z-10 w-full bg-white rounded-lg shadow-lg dark:bg-gray-700 max-h-60 overflow-y-auto"
                >
                  <ul class="py-2">
                    <li
                      v-for="conductor of filteredConductores"
                      :key="conductor.licencia"
                      @click="seleccionarConductor(conductor)"
                      class="px-4 py-2 text-colorText333 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer"
                    >
                      {{ conductor.licencia }} - {{ conductor.nombre }}
                    </li>
                  </ul>
                </div>
              </div>
              <!-- Mostrar conductor seleccionado -->
              <div
                v-if="conductorSeleccionado"
                class="mt-2 p-2 bg-gray-50 rounded-lg dark:bg-gray-600"
              >
                <span class="text-sm text-gray-900 dark:text-white">
                  {{ conductorSeleccionado.licencia }} -
                  {{ conductorSeleccionado.nombre }}
                </span>
              </div>
            </div>

            <!-- Estado Toggle -->
            <div class="col-span-2 mt-4">
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="estado" class="sr-only peer">
                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{ estado ? 'Activo' : 'Inactivo' }}</span>
              </label>
            </div>

          </div>
        </form>
      </div>

      <!-- Modal footer -->
      <div
        class="flex flex-row-reverse gap-6 items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600"
      >
        <button
          @click="guardarCambios"
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
          <IconX />
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>
  
  
  <style scoped>
  .dropdown-container {
    position: relative;
  }
  .dropdown-container ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .dropdown-container li {
    padding: 8px 12px;
    cursor: pointer;
  }
  </style>
  