<script setup lang="ts">
const links = [
  {
    label: "Journals",
    icon: "simple-icons:bookstack",
    to: "/",
  },
];
</script>

<template>
  <div class="w-full border-r-2 h-full">
    <div class="flex h-16 border-b-2">
      <NuxtLink class="my-auto pl-2 flex items-center justify-start text-2xl font-bold text-sky-500" to="/">
        <UIcon name="icon-park-solid:journey" />
        <h1>My Sanctuary</h1>
      </NuxtLink>
    </div>

    <div class="p-2">
      <UVerticalNavigation :links="links" :ui="{
        icon: {
          active: 'text-sky-500',
        },
      }">
        <template #default="{ link }"><span class="relative text-xl">{{ link.label }}</span>
        </template>

        <template #icon="{ link }">
          <UIcon :name="link.icon" v-if="link.active" />
        </template>
      </UVerticalNavigation>
    </div>
  </div>
</template>
