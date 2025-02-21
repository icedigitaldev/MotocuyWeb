<script setup>
import { ref, onMounted } from "vue";
import {IconMoon, IconSun} from '@tabler/icons-vue'

const isDarkMode = ref(localStorage.getItem("theme") === "dark");

// Función para cambiar el tema
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  const theme = isDarkMode.value ? "dark" : "light";

  document.documentElement.classList.toggle("dark", isDarkMode.value);
  localStorage.setItem("theme", theme);
};

// Aplicar el tema guardado al cargar la página
onMounted(() => {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
});
</script>

<template>
  <button @click="toggleTheme" class="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 ease-in-out">
    <IconMoon v-if="!isDarkMode" class="w-6 h-6 text-[#435971] text-gray-900 dark:text-gray-100" />
    <IconSun v-else class="w-6 h-6 text-gray-900 dark:text-gray-100"   />
  </button>
</template>
