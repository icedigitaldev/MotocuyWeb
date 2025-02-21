<script setup>
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import { useSidebar } from '@/composables/useSidebar.js'
import Backdrop from './Backdrop.vue'
const { isExpanded, isHovered } = useSidebar()
</script>
<template>
  <div class="min-h-screen xl:flex bg-[#F5F5F9] dark:bg-[#1B2431]">
    <app-sidebar />
    <Backdrop />
    <div
      class="flex-1  transition-all duration-300 ease-in-out"
      :class="[isExpanded || isHovered ? 'lg:ml-[250px]' : 'lg:ml-[100px]']"
    >
      <app-header />
      <div class="z-0 p-4 mx-auto max-w-screen-2xl md:p-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>


