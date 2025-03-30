<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import { IconX, IconCalendarWeek, IconClock, IconMapPin, IconLink, IconDeviceFloppy, IconSteeringWheel } from "@tabler/icons-vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['update:visible', 'close']);

const close = () => {
  emits('update:visible', false);
  emits('close');
};

const isFalsaAlarma = ref(false);
const selectedRadio = ref(null);
const link = ref("https://www.ejemplo.com/evento-panico");
const isCopied = ref(false);
const message = ref("Copiar enlace");

watch(isFalsaAlarma, (newValue) => {
  if (newValue) {
    selectedRadio.value = null;
  }
});

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(link.value);
    isCopied.value = true;
    message.value = "Enlace copiado";
    setTimeout(() => {
      isCopied.value = false;
      message.value = "Copiar enlace";
    }, 2000);
  } catch (error) {
    console.error("Error al copiar el enlace", error);
    message.value = "Error al copiar el enlace";
  }
};

</script>

<template>
  <div v-if="visible" @click.self="close" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50">
    <div class="flex justify-center items-center md:items-start md:mt-20 h-full">
      <div class="relative p-4 w-full max-w-xl bg-white rounded-lg shadow-lg dark:bg-gray-700 overflow-y-auto">
        <!-- Cabecera del modal -->
        <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Evento de Pánico</h3>
          <button
              @click="close"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <IconX />
          </button>
        </div>
        <!-- Body del Modal -->
        <div class="mt-2.5">
          <div class="grid grid-cols-2 gap-4 md:gap-2.5">
            <div class="flex col-span-2 md:col-span-1 gap-2.5 items-center">
              <div class="p-1 border-4 dark:border-white border-[#303972] rounded-full">
                <div class="p-2.5 bg-[#303972] dark:bg-white rounded-full">
                  <IconSteeringWheel class="w-8 h-8 text-white dark:text-[#303972]" />
                </div>
              </div>
              <div class="text-colorText333 dark:text-white">
                <h2 class="text-[18px] font-bold leading-normal">Juan Carlos</h2>
                <span class="text-[14px] font-normal leading-normal">Conductor</span>
              </div>
            </div>
            <div class="flex col-span-2 md:col-span-1 flex-col gap-2 text-[14px] font-regular">
              <div class="flex gap-4">
                <IconCalendarWeek class="text-[#FB7D5B]" />
                <p class="text-colorText333 dark:text-white">Jueves 02 de Diciembre de 2024</p>
              </div>
              <div class="flex gap-4">
                <IconClock class="text-[#FCC43E]" />
                <p class="text-colorText333 dark:text-white">09.00 - 10.00 AM</p>
              </div>
              <div class="flex gap-4">
                <IconMapPin class="text-[#039746]" />
                <p class="text-colorText333 dark:text-white">-6.0498642, -7.02579522</p>
              </div>
            </div>
          </div>
          <div class="mt-5 grid grid-cols-2 gap-5">
            <label
                    for="radio-en-camino"
                    class="col-span-2 md:col-span-1 w-full text-center cursor-pointer px-6 py-2.5 text-[16px] font-medium text-gray-900 bg-white border border-gray-200 rounded-lg
                  focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700
                  dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:focus:ring-blue-400 dark:focus:text-white
                  peer-checked:bg-blue-700 peer-checked:text-white dark:peer-checked:bg-blue-600 dark:peer-checked:text-white"
                >
                  En camino
                </label>
            <div class="flex col-span-2 md:col-span-1 gap-[10px]">
              <a
                  href="/"
                  target="_blank"
                  class="border-2 w-full justify-center text-colorText333 dark:text-white hover:bg-green-600 hover:text-white gap-2.5 flex border-green-600 py-2.5 px-4 rounded-[10px] transition-colors duration-300 ease-in-out"
              >
                Seguimiento
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
              <div class="tooltip tooltip-left" :data-tip="message">
                <button
                    @click="copyLink"
                    class="border h-full border-gray-400 px-2.5 rounded-[10px] flex justify-center items-center text-gray-600 dark:text-gray-200 hover:scale-110 transition-transform duration-200 ease-in-out"
                >
                  <IconLink />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
