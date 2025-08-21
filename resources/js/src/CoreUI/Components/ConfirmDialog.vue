<script setup lang="ts">
interface Props {
    open: boolean;
    text: string;
    actionButtonLabel: string;
    isProcessing: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits(["onClose", "onProcessing"]);
</script>
<template>
    <v-row justify="center">
        <v-dialog v-model="props.open" transition="dialog-bottom-transition" width="500">
            <v-card>
                <v-toolbar dark color="warning">
                    <v-toolbar-title>Confirmation</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn variant="text" @click="emits('onClose')" color="white">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-container>
                    <div>
                        <span class="text-body-1">
                            {{ props.text }}
                        </span>
                    </div>
                    <v-form @submit.prevent="emits('onProcessing')">
                        <v-container>
                            <v-divider></v-divider>
                            <div class="pt-5 d-flex flex-row justify-end">
                                <v-btn color="secondary" @click="emits('onClose')">
                                    Close
                                </v-btn>
                                <v-btn type="submit" :loading="props.isProcessing" :disabled="props.isProcessing"
                                    class="ml-2" @click="emits('onProcessing')">
                                    {{ props.actionButtonLabel }}
                                </v-btn>
                            </div>
                        </v-container>
                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>
    </v-row>
</template>
