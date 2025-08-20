<script setup lang="ts">
import { useSnackbarControllerStore } from './SnackbarController';

const snackbarController = useSnackbarControllerStore(); 
</script>
<template>
    <v-snackbar v-model="snackbarController.isVisible" :timeout="snackbarController.autoHideDuration"
        :color="snackbarController.severity" :elevation="snackbarController.elevation"
        :vertical="snackbarController.vertical" :location="snackbarController.position">
        <component :is="snackbarController.content" v-bind="snackbarController.contentProps">
            <template v-slot:actions>
                <v-btn color="white" variant="text" @click="snackbarController.hide()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </component>
    </v-snackbar>
</template>
