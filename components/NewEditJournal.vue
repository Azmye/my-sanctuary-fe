<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const { data: tags } = await useFetch('/api/tag')

const toast = useToast()

const emit = defineEmits(['cancel', 'created'])

const schema = z.object({
    title: z.string(),
    body: z.string(),
    tags: z.string().array()
})

type Schema = z.output<typeof schema>

const state = reactive({
    title: '',
    body: '',
    tags: []
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    // Do something with data

    const { data } = event
    const { message } = await $fetch('/api/journal', {
        method: 'POST',
        body: {
            title: data.title,
            body: data.body,
            tags: data.tags
        }
    })

    toast.add({ title: message })

    emit('created')

}

</script>

<template>
    <h1 class="text-xl font-semibold">Create New Journal</h1>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

        <UFormGroup label="Title" name="title">
            <UInput v-model="state.title" />
        </UFormGroup>

        <UFormGroup label="Body" name="body">
            <UTextarea v-model="state.body" />
        </UFormGroup>

        <UFormGroup label="Tags">
            <div class="flex flex-wrap gap-2">
                <UCheckbox v-for="(tag, index) of tags" :key="index" v-model="state.tags" :label="tag" :value="tag"
                    :id="`tag-${index}`" />
            </div>
        </UFormGroup>

        <div class="flex gap-2">
            <UButton type="submit">
                Submit
            </UButton>
            <UButton @click="emit('cancel')" variant="ghost" color="gray">
                Cancel
            </UButton>
        </div>
    </UForm>
</template>
