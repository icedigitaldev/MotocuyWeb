<script setup>
import {ref, computed} from 'vue'
import {useRouter} from 'vue-router'

// Iconos de ejemplo (cámbialos o quítalos según tu necesidad)
import {
  IconDashboard,
  IconUsers,
  IconCamper,
  IconUrgent,
  IconAlertSquareRounded,
  IconArrowsTransferUpDown,
  IconUser
} from '@tabler/icons-vue'

const router = useRouter()

// Lista de menús a filtrar
const menuItems = [
  {icon: IconDashboard, name: "Dashboard", path: "/user"},
  {icon: IconUsers, name: "Conductores", path: "/user/drivers"},
  {icon: IconCamper, name: "Unidades", path: "/user/units"},
  {icon: IconUrgent, name: "Pánico Evento", path: "/user/panic-event"},
  {icon: IconAlertSquareRounded, name: "Alertas", path: "/user/alerts"},
  {icon: IconArrowsTransferUpDown, name: "Flujo de tráfico", path: "/user/traffic-flow"},
  {icon: IconUser, name: "Perfil", path: "/user/profile"},
]

// Campo de búsqueda
const searchQuery = ref("")

// Computed que filtra dinámicamente los menús
const filteredMenuItems = computed(() => {
  // Si el usuario no ha escrito nada, no mostramos la lista
  if (!searchQuery.value) return []

  return menuItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Al hacer clic en un resultado, navega y limpia el texto
const navigateTo = (path) => {
  router.push(path)
  // Se limpia la búsqueda, provocando que se oculte la lista
  searchQuery.value = ""
}

// Evitar el envío del formulario (que recargaría la página)
const onSubmit = (e) => {
  e.preventDefault()
}
</script>

<template>
  <div class="hidden lg:block relative">
    <!-- Evitamos que el form se envíe y recargue la página -->
    <form
        action="https://formbold.com/s/unique_form_id"
        method="POST"
        @submit.prevent="onSubmit"
    >
      <div class="relative">
        <button class="absolute -translate-y-1/2 left-4 top-1/2">
          <svg
              class="fill-gray-500 dark:fill-gray-400"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
            />
          </svg>
        </button>

        <!-- Campo de búsqueda -->
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar una sección"
            class="dark:bg-dark-900 h-11 w-full rounded-lg bg-gray-50 focus:outline-gray-100
                 py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400
                 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10
                 dark:focus:outline-gray-500 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90
                 dark:placeholder:text-white/30 border-none xl:w-[430px]"
        />
      </div>
    </form>

    <!-- Lista de resultados filtrados, visible solo cuando hay elementos y texto -->
    <ul
        v-if="filteredMenuItems.length && searchQuery"
        class="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg
             overflow-hidden dark:bg-gray-800 dark:border-gray-700"
    >
      <li
          v-for="(item, index) in filteredMenuItems"
          :key="index"
          @click="navigateTo(item.path)"
          class="px-4 py-2 text-gray-700 dark:text-gray-200
               hover:bg-gray-100 dark:hover:bg-gray-700
               cursor-pointer flex items-center gap-2"
      >
        <!-- Si deseas mostrar también el ícono -->
        <component :is="item.icon"/>
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>
