<script setup lang="ts">
import Snackbar from "@src/CoreUI/Components/Snackbar/Snackbar.vue";
import Message from "@src/CoreUI/Components/Message.vue";
import { delay } from "./helper";
import { useSnackbarControllerStore } from "@src/CoreUI/Components/Snackbar/SnackbarController";
import { SnackbarSeverity } from "@src/CoreUI/Components/Snackbar/SnackbarSeverity";

const snackbarController = useSnackbarControllerStore()

function openSnackbar() {
    snackbarController
        .setSeverity(SnackbarSeverity.Success)
        .setContentProps({ text: "Message from snackbar" })
        .setContent(Message)
        .show();
}

</script>
<template>
    <div class="text-center">
        <v-btn @click="openSnackbar">Open Snackbar</v-btn>
    </div>
    <snackbar />
</template>
