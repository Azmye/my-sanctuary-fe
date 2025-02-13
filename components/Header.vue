<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <div class="px-4 flex items-center justify-between w-full border-b-2 h-16">
    <h1 class="text-lg font-semibold">Hello, Muhammad Azmi</h1>

    <ul class="flex gap-2 items-center">
      <li>
        <UButton
          :icon="
            isDark
              ? 'line-md:sunny-outline-loop'
              : 'line-md:sunny-filled-loop-to-moon-filled-alt-loop-transition'
          "
          :color="isDark ? 'sky' : 'gray'"
          @click="isDark = !isDark"
          variant="ghost"
        />
      </li>
      <li>
        <UAvatar
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          alt="Avatar"
        />
      </li>
    </ul>
  </div>
</template>
