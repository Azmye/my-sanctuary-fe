<script setup lang="ts">


const { journal } = defineProps<{
    journal: Journal;
}>();
</script>

<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">{{ journal.title }}</h2>

        <div class="grid grid-cols-[auto_auto_1fr] gap-x-4 items-center">
            <UIcon name="tabler:tags-filled" class="text-gray-400" />
            <p class="text-gray-400">Tags:</p>
            <p class="text-gray-700">{{ journal.tags.join(', ') }}</p>

            <UIcon name="material-symbols-light:nest-clock-farsight-analog-outline" class="text-gray-400" />
            <p class="text-gray-400">Last Edited:</p>
            <p class="text-gray-700">{{ new Date(journal.updatedAt).toDateString() }}</p>
        </div>

        <UDivider orientation="horizontal" class="my-4" />

        <p>{{ journal.body }}</p>

    </div>
</template>