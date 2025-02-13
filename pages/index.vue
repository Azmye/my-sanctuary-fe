<script setup lang="ts">
// Initialize a toast component for displaying notifications
const toast = useToast()

// Fetch the list of journals from the API and provide a refresh function
const { data: journals, refresh: refreshJournals } = await useFetch<Journal[]>('/api/journal')

const isNewJournalMode = ref(false)
const selectedjournal = ref<Journal | null>(null)

function selectJournal(newJournal: Journal | null) {
    selectedjournal.value = newJournal
}

// Fetch a single journal by its UUID and set it as the selected journal
async function getJournal(uuid: string) {
    const { data } = await useFetch<Journal>('/api/journal/' + uuid)

    if (data.value) {
        selectJournal(data.value)
    }

    return
}

function toggleNewJournalMode(cancel: boolean = false) {
    isNewJournalMode.value = cancel === true ? false : !isNewJournalMode.value
    if (isNewJournalMode.value) {
        selectedjournal.value = null // Clear selected journal when entering new journal mode
    }
}

// Handle the state after a new journal is created
function handleJournalFormState() {
    refreshJournals() // Refresh the list of journals
    toggleNewJournalMode(true) // Exit new journal mode
}

// Handle deleting a journal by its UUID
async function handleDeleteJournal(uuid: string) {
    const { data, error } = await useFetch<{ message: string }>('/api/journal/' + uuid, {
        method: 'DELETE',
    })

    if (error.value) {
        // Show an error toast if the deletion fails
        toast.add({ title: error.value.statusMessage, color: 'red' })
    }

    // Show a success toast with the deletion message
    toast.add({ title: data.value?.message })
    refreshJournals() // Refresh the list of journals after deletion
}

// Watch for changes in the journals list or new journal mode
watch([journals, isNewJournalMode], async ([newJournal, newJournalMode]) => {
    if (!newJournalMode && newJournal && newJournal?.length > 0) {
        // Automatically select the first journal if not in new journal mode
        selectJournal(newJournal[0])
    } else {
        // Clear the selected journal if no journals are available or in new journal mode
        selectJournal(null)
    }
}, {
    immediate: true // Run the watcher immediately on component mount
})
</script>

<template>
    <div class="flex h-screen">
        <!-- List of Journals -->
        <div class="border-r-2 w-4/12 h-full">
            <div class="p-4 flex justify-between items-center">
                <h1 class="text-3xl font-semibold">All Your Journals</h1>
                <UButton :disabled="isNewJournalMode" @click="toggleNewJournalMode">
                    Create New
                </UButton>
            </div>

            <div class="w-full px-4">
                <ul>
                    <!-- Loop through each journal and display it as a card -->
                    <li v-for="(journal, index) in journals" :key="journal.uuid" @click="getJournal(journal.uuid)">
                        <UCard as="button" :ui="{
                            background: journal?.uuid === selectedjournal?.uuid ? 'bg-gray-100' : 'bg-none',
                            base: 'w-full flex flex-col items-start mb-3',
                            body: {
                                padding: 'p-1'
                            }
                        }">
                            <h1 class="text-start mb-2 text-lg font-semibold">{{ journal.title }}</h1>
                            <div class="flex flex-col items-start space-y-2">
                                <div class="flex space-x-2">
                                    <UBadge color="gray" v-for="tag in journal.tags" :key="tag">{{ tag }}</UBadge>
                                </div>
                                <h5 class="m-0 text-sm text-gray-500">
                                    {{ new Date(journal.updatedAt).toLocaleDateString() }}
                                </h5>
                            </div>
                        </UCard>
                    </li>
                </ul>
            </div>
        </div>

        <div class="w-6/12 p-4 border-r-2">
            <!-- Show the NewEditJournal component when in new journal mode -->
            <template v-if="isNewJournalMode">
                <NewEditJournal @cancel="toggleNewJournalMode(true)" @created="handleJournalFormState" />
            </template>

            <!-- Show the JournalDetails component when a journal is selected -->
            <JournalDetails v-else-if="selectedjournal" :journal="selectedjournal" />

            <!-- Show a placeholder message if no journal is selected -->
            <template v-else>
                <p class="text-gray-500">Select a journal or create a new one.</p>
            </template>
        </div>

        <!--  Actions for the selected journal -->
        <div v-if="selectedjournal" class="p-4 space-y-2 w-2/12">
            <UButton @click="handleDeleteJournal(selectedjournal.uuid)" icon="material-symbols-light:edit-square"
                class="flex justify-start" size="lg" variant="outline" color="green" block>Edit</UButton>
            <UButton @click="handleDeleteJournal(selectedjournal.uuid)" icon="material-symbols:delete-forever"
                class="flex justify-start" size="lg" variant="outline" color="red" block>Delete</UButton>
        </div>
    </div>
</template>