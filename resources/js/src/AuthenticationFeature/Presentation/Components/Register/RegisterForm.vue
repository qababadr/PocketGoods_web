<script setup lang="ts">
import { useRegisterStore } from './RegisterStore';

const store = useRegisterStore()

const emits = defineEmits([
    'onToggleFormType',
    'onHideModal'
])

function register() {
    store.register({
        onRegistered(username: string) {
            store.$patch({
                alertType: 'success',
                alertText: `We are glad to have you with us ${username}`
            })
        },
        onError() {
            store.$patch({
                alertType: 'error',
                alertText: `Ops...! an error occurred while registering please try again`
            })
        },
    })
}

</script>
<template>
    <v-form @submit.prevent="register">
        <v-container v-if="store.alertVisible">
            <v-alert :text="store.alertText" :type="store.alertType"
                class="animate__animated animate__zoomIn animate__faster" />
        </v-container>
        <v-container>
            <div class="text-subtitle-1 text-medium-emphasis font-weight-bold">
                First and Last name
            </div>

            <v-text-field v-model="store.firstAndLastName" :rules="store.firstAndLastNameRules" density="compact"
                placeholder="First and Last name" prepend-inner-icon="mdi-tag-outline" variant="outlined" class="pb-5"
                required></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis font-weight-bold">
                Email
            </div>

            <v-text-field v-model="store.email" :rules="store.emailRules" density="compact" placeholder="Email"
                prepend-inner-icon="mdi-email-outline" variant="outlined" class="pb-5" required></v-text-field>

            <div
                class="text-subtitle-1 font-weight-bold text-medium-emphasis d-flex align-center justify-space-between">
                Password
            </div>
            <v-text-field v-model="store.password" :append-inner-icon="store.passwordVisible ? 'mdi-eye-off' : 'mdi-eye'
                " :type="store.passwordVisible ? 'text' : 'password'" :rules="store.passwordRules" class="pb-5"
                density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
                variant="outlined" @click:append-inner="store.togglePasswordVisible()" required></v-text-field>

            <div
                class="text-subtitle-1 font-weight-bold text-medium-emphasis d-flex align-center justify-space-between">
                Confirm password
            </div>
            <v-text-field v-model="store.confirmPassword" :append-inner-icon="store.confirmPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'
                " :type="store.confirmPasswordVisible ? 'text' : 'password'" :rules="store.confirmPasswordRules"
                density="compact" placeholder="Confirm password" prepend-inner-icon="mdi-lock-outline"
                variant="outlined" @click:append-inner="store.toggleConfirmPasswordVisible()" required></v-text-field>
        </v-container>
        <v-container class="d-flex flex-column text-center">
            <div>
                <v-btn variant="text" @click="emits('onToggleFormType')">
                    <span class="primary text-decoration-underline">Already registered?</span>
                </v-btn>
            </div>
        </v-container>
        <v-container>
            <v-divider></v-divider>
            <div class="pt-5 d-flex flex-row justify-end">
                <v-btn color="secondary" @click="emits('onHideModal')">Close</v-btn>
                <v-btn class="ml-2" type="submit" :loading="store.isLoading"
                    :disabled="store.isLoading">Register</v-btn>
            </div>
        </v-container>
    </v-form>
</template>
