<script setup lang="ts">
import { useSnackbarControllerStore } from './SnackbarController';

const snackbarController = useSnackbarControllerStore(); 
</script>
<template>
    <v-snackbar v-model="snackbarController.isVisible" :timeout="snackbarController.autoHideDuration"
        :color="snackbarController.severity" :elevation="snackbarController.elevation"
        :vertical="snackbarController.vertical" :location="snackbarController.position">
        <v-row class="align-center" no-gutters>
            <!-- Column 1: Content -->
            <v-col>
                <component :is="snackbarController.content" v-bind="snackbarController.contentProps" />
            </v-col>

            <!-- Column 2: Close button -->
            <v-col class="d-flex justify-end" cols="auto">
                <v-btn color="white" variant="text" @click="snackbarController.hide()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-snackbar>
</template>
