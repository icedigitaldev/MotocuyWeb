<script setup>
import IconLogo from '@/components/Icons/IconLogo.vue'
import IconPrifile from '@/components/Icons/IconProfile.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import IconLogout from "@/components/Icons/IconLogout.vue";

const dropdownOpen = ref(false)
const dropdownRef = ref(null)

const menuItems = [
  { href: '/admin/profile', icon: IconPrifile  , text: 'Administrar cuenta' }
]

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

// Lógica de serrar sesión
const signOut = () => {

  console.log('Signing out...')
  closeDropdown()
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
<template>
  <div class="relative" ref="dropdownRef">
    <button
      class="flex items-center justify-end text-gray-700 dark:text-gray-400"
      @click.prevent="toggleDropdown"
    >
      <span class="overflow-hidden rounded-full h-11 w-11">
        <img src="/logo.svg" alt="User" />
      </span>
    </button>

    <!-- Dropdown Start -->
    <div
      v-if="dropdownOpen"
      class="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 dark:bg-[#273142] dark:border-gray-800 dark:bg-gray-dark"
    >
      <div class="flex gap-2.5 justify-end">
        <div class="fle-1">
          <span class="block font-bold text-[#303972] dark:text-white text-end text-[14px] ">
          Emirhan Boruch
        </span>
          <span class=" mt-0.5 block text-[#A098AE] text-[12px] dark:text-gray-400">
          emirhanboruch51@gmail.com
        </span>
        </div>
        <div class="flex-0.5 overflow-hidden rounded-full">
        <img src="/logo.svg" alt="User" class="w-10" />
        </div>
      </div>

      <ul class="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
        <li v-for="item in menuItems" :key="item.href">
          <router-link
              @click.prevent="toggleDropdown"
            :to="item.href"
            class="flex flex-row-reverse items-center gap-3 px-3 py-4 font-medium text-colorText333 dark:text-white rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700  dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <!-- SVG icon would go here -->
            <component
              :is="item.icon"
              class="w-6 h-6"
            />
            {{ item.text }}
          </router-link>
        </li>
      </ul>
      <router-link
        to="/signin"
        @click="signOut"
        class="flex flex-row-reverse items-center gap-3 px-3 py-4 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
      >
        <IconLogout
          class="w-6 h-6"
        />
        Sign out
      </router-link>
    </div>
    <!-- Dropdown End -->
  </div>
</template>

