<script setup lang="ts">
import ConfirmDialog from "@src/CoreUI/Components/ConfirmDialog.vue"
import { useGlobalStore } from "./GlobalStore";
import { delay } from "./helper";
const store = useGlobalStore()

async function simulateDelete() {
    store.setIsProcessing(true)
    await delay(1500)
    store.setIsProcessing(false)
    store.closeDialog()
}

</script>
<template>
    <div class="text-center">
        <v-btn @click="store.openDialog">Open confirm dialog</v-btn>
    </div>
    <ConfirmDialog :open="store.isDialogOpen" :isProcessing="store.isProcessing" @on-close="store.closeDialog"
        text="are you sure want to proceed?" action-button-label="Delete" @on-processing="simulateDelete" />
</template>
