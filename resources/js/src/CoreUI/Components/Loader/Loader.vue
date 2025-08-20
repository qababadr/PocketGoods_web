<script setup lang="ts">
import { Constants } from '@src/CoreUI/Util/constants';
import { useLoaderStore } from './LoaderStore';

const loaderStore = useLoaderStore();
</script>
<template>
    <v-dialog v-model="loaderStore.isLoading" max-width="190" persistent>
        <v-sheet>
            <div class="d-flex flex-column align-center pa-10">
                <v-progress-circular color="primary" indeterminate class="pb-10"></v-progress-circular>
                <v-icon class="pt-6" icon="$logoSmall" />
                <span class="text-subtitle-1 text-primary font-weight-bold pt-3">
                    {{ Constants.APP_NAME }}
                </span>
            </div>
        </v-sheet>
    </v-dialog>
</template>
