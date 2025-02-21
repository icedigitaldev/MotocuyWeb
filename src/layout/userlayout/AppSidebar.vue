<script setup>
import { useRoute } from "vue-router";
import { IconDashboard, IconUsers, IconAlertSquareRounded, IconUrgent, IconCamper, IconArrowsTransferUpDown,  IconArrowBadgeLeftFilled, IconArrowBadgeRightFilled } from "@tabler/icons-vue";
import { useSidebar } from "@/composables/useSidebar.js";

import {ref} from "vue";


const route = useRoute();
const { isExpanded, isMobileOpen, isHovered, toggleSidebar, toggleMobileSidebar } = useSidebar();

// Lista de elementos de navegación (sin submenús)
const menuItems = [
  { icon: IconDashboard, name: "Dashboard", path: "/user" },
  { icon: IconUsers, name: "Conductores", path: "/user/drivers" },
  { icon: IconCamper, name: "Unidades", path: "/user/units" },
  { icon: IconUrgent, name: "Pánico Evento", path: "/user/panic-event" },
  { icon: IconAlertSquareRounded, name: "Alertas", path: "/user/alerts" },
  { icon: IconArrowsTransferUpDown, name: "Flujo de tráfico", path: "/user/traffic-flow" },
];

// Función para verificar si un enlace está activo
const isActive = (path) => route.path === path;

const handleToggle = () => {
  if (window.innerWidth >= 991) {
    toggleSidebar()
  } else {
    toggleMobileSidebar()
  }
}
</script>
<template>
  <aside
      :class="[
      'fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-[#273142]  text-gray-900 h-screen transition-all duration-300 ease-in-out z-20',
      {
        'lg:w-[250px]': isExpanded || isMobileOpen || isHovered,
        'lg:w-[100px]': !isExpanded && !isHovered,
        'translate-x-0 w-[290px]': isMobileOpen,
        '-translate-x-full': !isMobileOpen,
        'lg:translate-x-0': true,
      },
    ]"

  >
    <!-- Va dentro de las opcione de la etiqueta para que se active con el hover
        @mouseenter="!isExpanded && (isHovered = true)"
      @mouseleave="isHovered = false"
    -->
    <!-- Logo -->
    <div
        :class="[
        'pt-[30px] pb-[40px] flex items-center justify-between',
        !isExpanded && !isHovered ? 'lg:justify-center ' : 'justify-start',
      ]"
    >
      <router-link to="/admin">
        <div v-if="isExpanded || isHovered || isMobileOpen" class="flex gap-2.5 items-center">
          <img src="/logo.svg" alt="Logo" width="30" height="30" />
          <span class="text-colorPrimary font-extrabold text-[20px]">Motocuy</span>
        </div>
        <img v-else src="/logo.svg" alt="Logo" width="32" height="32" />
      </router-link>

      <button
          @click="handleToggle"
          class="absolute hidden  right-[-20px] p-1.5 w-[40px] h-[40px] md:flex bg-[#F5F5F9] dark:bg-[#1B2431] items-center justify-center text-gray-500  rounded-full z-20  dark:text-gray-400 lg:h-11 lg:w-11 "
          :class="[
            isMobileOpen
              ? 'lg:bg-transparent dark:lg:bg-transparent bg-gray-100 dark:bg-gray-800'
              : '',
          ]"
      >

        <div class="bg-colorPrimary rounded-full p-0.5">
          <IconArrowBadgeLeftFilled v-if="isExpanded" class="text-white " stroke="2" />
          <IconArrowBadgeRightFilled v-else class="text-white" stroke="2" />
        </div>

      </button>
    </div>

    <!-- Menú de navegación -->
    <div class="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
      <nav class="mb-6">
        <ul class="flex flex-col gap-4">
          <li v-for="(item, index) in menuItems" :key="index">
            <!-- Opciones para Teléfonos -->
            <router-link
                @click="handleToggle"
                :to="item.path"
                :class="[
                'menu-item group flex md:hidden items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300',
                isActive(item.path) ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
                isExpanded || isHovered || isMobileOpen ? 'justify-start' : 'justify-center'
              ]"
            >
              <span :class="['w-6 h-6 flex justify-center items-center']">
                <component :is="item.icon" />
              </span>
              <span v-if="isExpanded || isHovered || isMobileOpen" class="text-sm font-medium">
                {{ item.name }}
              </span>
            </router-link>
            <!-- Opciones para Desktop -->
            <router-link
                :to="item.path"
                :class="[
                'menu-item group hidden md:flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300',
                isActive(item.path) ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
                isExpanded || isHovered || isMobileOpen ? 'justify-start' : 'justify-center'
              ]"
            >
              <span :class="['w-6 h-6 flex justify-center items-center']">
                <component :is="item.icon" />
              </span>
              <span v-if="isExpanded || isHovered || isMobileOpen" class="text-[14px] font-medium">
                {{ item.name }}
              </span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>
<style scoped>
.menu-item {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
