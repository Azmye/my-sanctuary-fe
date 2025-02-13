<script setup lang="ts"></script>

<template>
  <div class="h-screen flex">
    <!-- Sidebar -->
    <div class="w-2/12 h-full">
      <SideBar />
    </div>

    <!-- Main Content -->
    <div class="w-10/12 flex flex-col">
      <Header />
      <div class="flex-1 overflow-y-auto">
        <slot />
      </div>
    </div>
  </div>

  <UNotifications />
</template>
