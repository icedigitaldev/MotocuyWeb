<script setup>
import CardTotal from '@/modules/municipalidad/components/CardTotal.vue';
import {IconUserFilled, IconIdOff, IconUrgent, IconAlertSquareRounded} from '@tabler/icons-vue'
import IconMoto from '../../components/icons/IconMoto.vue';
import GraphiLine from '../../modules/municipalidad/components/dashboard/GraphiLine.vue';
import PieChart from '../../modules/municipalidad/components/dashboard/PieChart.vue';
import PieIncidencias from '../../modules/municipalidad/components/dashboard/PieIncidencias.vue';
import ColumChart from '../../modules/municipalidad/components/dashboard/ColumChart.vue';
import BarChart from '../../modules/municipalidad/components/dashboard/BarChart.vue';
</script>

<template>
  <section>
    <header class="w-full flex justify-between items-center">
      <h1 class="text-colorText333 text-[28px] md:text-[32px] font-bold dark:text-white">
        Dashboard
      </h1>
    </header>
    <main class="mt-6">
      <!-- Contenido de la página -->
       <!-- Resumen de Conductores -->
       <section>
        <h2 class="text-[22px] md:text-[28px] font-bold text-colorText333 dark:text-white">Resumen de conductores</h2>
        <!-- Totales -->
        <div class="grid grid-cols-12 gap-6 mt-4">
          <!-- Total de Conductores -->
          <CardTotal class="col-span-12 md:col-span-4">
            <div class="text-colorText333 dark:text-white flex gap-1 items-center">
              <IconUserFilled class="w-5 h-5"/>
              <span class="text-[16px] font-semibold leading-[14px]">Total de Conductores</span>
            </div>
            <span class="text-colorText333 dark:text-white font-bold text-[34px] leading-[24px]">
              1560
            </span>
          </CardTotal>
          <!-- Conductores Vigentes -->
          <CardTotal class="col-span-12 md:col-span-4">
            <div class="text-colorText333 dark:text-white flex gap-1 items-center">
              <IconUserFilled class="w-5 h-5 text-colorSuccess"/>
              <span class="text-[16px] font-semibold leading-[14px]">Conductores Vigentes</span>
            </div>
            <span class="text-colorText333 dark:text-white font-bold text-[34px] leading-[24px]">
              1560
            </span>
          </CardTotal>
           <!-- Conductores No Vigentes -->
           <CardTotal class="col-span-12 md:col-span-4">
            <div class="text-colorText333 dark:text-white flex gap-1 items-center">
              <IconUserFilled class="w-5 h-5 text-colorAlert"/>
              <span class="text-[16px] font-semibold leading-[14px]">Conductores No Vigentes</span>
            </div>
            <span class="text-colorText333 dark:text-white font-bold text-[34px] leading-[24px]">
              1560
            </span>
          </CardTotal>
          
          <!-- Conductores -->
           <CardTotal class="col-span-12 md:col-span-5">
            <div class="flex justify-between items-center">
             <h3 class="text-colorText333 dark:text-white text-[22px] font-bold leading-[20px]">Conductores</h3>
             <select id="countries" class="w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
               <option selected>Todos</option>
               <option value="empresa1">Empresa 1</option>
               <option value="empresa2">Empresa 2</option>
               <option value="empresa3">Empresa 3</option>
             </select>
           </div>
           <PieChart/>
           </CardTotal>
          <!-- Gráfico Vencimiento de Licencia -->
          <CardTotal class="col-span-12 md:col-span-7">
            <div class="flex justify-between items-center">
             <h3 class="text-colorText333 dark:text-white text-[22px] font-bold leading-[20px]">Vencimientos de Licencias</h3>
             <select id="countries" class="w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
               <option selected>2025</option>
               <option value="2026">2026</option>
               <option value="2027">2027</option>
               <option value="2028">2028</option>
             </select>
           </div>
           <GraphiLine />
          </CardTotal>

        </div>

      </section>
      <!-- Resumen de Unidades -->
       <section class="mt-6">
        <h2 class="text-[22px] md:text-[28px] font-bold text-colorText333 dark:text-white">Resumen de Unidades</h2>
        <!-- Totales -->
        <div class="grid grid-cols-12 gap-6 mt-4">
          <!-- Total de Unidades -->
          <CardTotal class="col-span-12 md:col-span-3">
            <div class="text-colorText333 dark:text-white flex gap-1 items-center">
              <IconMoto class="text-colorText333 dark:text-white" width="22" height="22" />
              <span class="text-[16px] font-semibold leading-[14px]">Total de Unidades</span>
            </div>
            <span class="text-colorText333 dark:text-white font-bold text-[34px] leading-[24px]">
              1560
            </span>
          </CardTotal>
          <!-- Conductores Vigentes -->
          <CardTotal class="col-span-12 md:col-span-3">
            <div class="text-colorText333 dark:text-white flex gap-1 items-center">
              <IconMoto class="text-colorSuccess" width="22" height="22" />
              <span class="text-[16px] font-semibold leading-[14px]">Unidades Activas</span>
            </div>
            <span class="text-colorText333 dark:text-white font-bold text-[34px] leading-[24px]">
              1560
            </span>
          </CardTotal>
           <!-- Conductores No Vigentes -->
           <CardTotal class="col-span-12 md:col-span-3">
            <div class="text-colorText333 dark:text-white flex gap-1 items-center">
              <IconMoto class="text-colorAlert" width="22" height="22" />
              <span class="text-[16px] font-semibold leading-[14px]">Unidades Inactivas</span>
            </div>
            <span class="text-colorText333 dark:text-white font-bold text-[34px] leading-[24px]">
              1560
            </span>
          </CardTotal>
           <!-- Conductores No Vigentes -->
           <CardTotal class="col-span-12 md:col-span-3">
            <div class="text-colorText333 dark:text-white flex gap-1 items-center">
              <IconIdOff class="w-5 h-5 text-colorAlert"/>
              <span class="text-[16px] font-semibold leading-[14px]">Tarjetas de Circulación Vencidas</span>
            </div>
            <span class="text-colorText333 dark:text-white font-bold text-[34px] leading-[24px]">
              1560
            </span>
          </CardTotal>

          <!-- Unidades -->
          <CardTotal class="col-span-12 md:col-span-6">
            <div class="flex justify-between items-center">
             <h3 class="text-colorText333 dark:text-white text-[22px] font-bold leading-[20px]">Unidades</h3>
             <select id="countries" class="w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
               <option selected>Todos</option>
               <option value="empresa1">Empresa 1</option>
               <option value="empresa2">Empresa 2</option>
               <option value="empresa3">Empresa 3</option>
             </select>
           </div>
           <PieChart/>
           </CardTotal>
            <!-- Unidades por empresa -->
          <CardTotal class="col-span-12 md:col-span-6">
            <div class="flex justify-between items-center">
             <h3 class="text-colorText333 dark:text-white text-[22px] font-bold leading-[20px]">Unidades por Empresa</h3>
            
           </div>
           <PieChart/>
           </CardTotal>
            <!-- Gráfico Vencimiento de tarjeta de circulación -->
          <CardTotal class="col-span-12">
            <div class="flex justify-between items-center">
             <h3 class="text-colorText333 dark:text-white text-[22px] font-bold leading-[20px]">Vencimientos de Licencias</h3>
             <select id="countries" class="w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
               <option selected>2025</option>
               <option value="2026">2026</option>
               <option value="2027">2027</option>
               <option value="2028">2028</option>
             </select>
           </div>
           <GraphiLine />
          </CardTotal>

        </div>
       </section>
       <!-- Resumen de Pánico Evento -->
       <section class="mt-6">
        <h2 class="text-[22px] md:text-[28px] font-bold text-colorText333 dark:text-white">Resumen de Pánico Evento</h2>
        <!-- Totales de Pánico Event -->
        <div class="grid grid-cols-12 gap-6 mt-4">
          <!-- Total de pánico evento -->
          <CardTotal class="col-span-12 md:col-span-4">
            <div class="text-colorText333 dark:text-white flex gap-1 items-center">
              <IconUrgent class="text-colorText333 dark:text-white" />
              <span class="text-[16px] font-semibold leading-[14px]">Total de pánico evento</span>
            </div>
            <span class="text-colorText333 dark:text-white font-bold text-[34px] leading-[24px]">
              1560
            </span>
          </CardTotal>
          <!-- Total Atendidos -->
          <CardTotal class="col-span-12 md:col-span-4">
            <div class="text-colorText333 dark:text-white flex gap-1 items-center">
              <IconUrgent class="text-colorSuccess" />
              <span class="text-[16px] font-semibold leading-[14px]">Total Atendidos</span>
            </div>
            <span class="text-colorText333 dark:text-white font-bold text-[34px] leading-[24px]">
              1560
            </span>
          </CardTotal>
           <!-- Total Falsas Alarmas -->
           <CardTotal class="col-span-12 md:col-span-4">
            <div class="text-colorText333 dark:text-white flex gap-1 items-center">
              <IconUrgent class="text-colorAlert"  />
              <span class="text-[16px] font-semibold leading-[14px]">Total Falsas Alarmas</span>
            </div>
            <span class="text-colorText333 dark:text-white font-bold text-[34px] leading-[24px]">
              1560
            </span>
          </CardTotal>

           <!-- Incidentes Totales-->
           <CardTotal class="flex flex-col col-span-12 md:col-span-4">
            <div class="justify-between items-center">
             <h3 class="text-colorText333 dark:text-white text-[22px] font-bold leading-[20px]">Unidades por Empresa</h3>
           </div> 
            <div class=" flex justify-center h-full items-center">
              <PieIncidencias/>
            </div>
           </CardTotal>

          <!-- Incidentes por Usuario -->
          <CardTotal class="col-span-12 md:col-span-4">
            <div class="flex justify-between items-center">
             <h3 class="text-colorText333 dark:text-white text-[22px] font-bold leading-[20px]">Incidentes por usuario</h3>
            
           </div>
           <ColumChart />
          </CardTotal>
          
          <!-- Gráfico Vencimiento de Licencia -->
            <CardTotal class="col-span-12 md:col-span-4">
            <div class="flex justify-between items-center">
             <h3 class="text-colorText333 dark:text-white text-[22px] font-bold leading-[20px]">Distribución de tiempo de respuesta</h3>
            
           </div>
           <BarChart />
          </CardTotal>

        </div>
       </section>
       <!-- Resumen de Alertas -->
       <section class="mt-6">
        <h2 class="text-[22px] md:text-[28px] font-bold text-colorText333 dark:text-white">Resumen de Alertas</h2>
        <!-- Totales de Alertas -->
        <div class="grid grid-cols-12 gap-6 mt-4">
          <!-- Total de Alertas -->
          <CardTotal class="col-span-12 md:col-span-4">
            <div class="text-colorText333 dark:text-white flex gap-1 items-center">
              <IconAlertSquareRounded class="text-colorText333 dark:text-white" />
              <span class="text-[16px] font-semibold leading-[14px]">Total de Alertas</span>
            </div>
            <span class="text-colorText333 dark:text-white font-bold text-[34px] leading-[24px]">
              1560
            </span>
          </CardTotal>
          <!-- Total Atendidos -->
          <CardTotal class="col-span-12 md:col-span-4">
            <div class="text-colorText333 dark:text-white flex gap-1 items-center">
              <IconAlertSquareRounded class="text-colorSuccess" />
              <span class="text-[16px] font-semibold leading-[14px]">Total de Alertas Atendidas</span>
            </div>
            <span class="text-colorText333 dark:text-white font-bold text-[34px] leading-[24px]">
              1560
            </span>
          </CardTotal>
           <!-- Total Falsas Alarmas -->
           <CardTotal class="col-span-12 md:col-span-4">
            <div class="text-colorText333 dark:text-white flex gap-1 items-center">
              <IconAlertSquareRounded class="text-colorAlert"  />
              <span class="text-[16px] font-semibold leading-[14px]">Total de Falsas Alertas</span>
            </div>
            <span class="text-colorText333 dark:text-white font-bold text-[34px] leading-[24px]">
              1560
            </span>
          </CardTotal>
        </div>
       </section>
    </main>
  </section>
</template>

<style scoped>
/* Tus estilos locales */
</style>
