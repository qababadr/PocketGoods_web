<script setup lang="ts">
import { testAttr } from '@src/Core';
import { useLoginStore } from './LoginStore';
import { useAuthStore } from '@src/AuthenticationFeature/Auth/AuthStore';

const auth = useAuthStore();
const store = useLoginStore();

const emit = defineEmits([
    'onLoggedIn',
    'onToggleFormType',
    'onHideModal'
]);

function login() {
    store.login({
        onLoggedIn(user) {
            auth.initializeFromUser(user)
            auth.reloadTheme()
            emit('onLoggedIn')
        },
        onError() {
            store.$patch({
                alertText: "No such user found with the given credentials. Please try again"
            })
        },
    });
}
</script>
<template>
    <v-form @submit.prevent="login">
        <v-container v-if="store.alertVisible">
            <v-alert :text="store.alertText" type="error" class="animate__animated animate__zoomIn animate__faster" />
        </v-container>
        <v-container>
            <div class="text-subtitle-1 text-medium-emphasis font-weight-bold">
                Email
            </div>

            <v-text-field v-bind="testAttr('email-field')" v-model="store.email" :rules="store.emailRules"
                density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline" variant="outlined"
                class="pb-5"></v-text-field>

            <div
                class="text-subtitle-1 font-weight-bold text-medium-emphasis d-flex align-center justify-space-between">
                Password
            </div>
            <v-text-field v-bind="testAttr('password-field')" v-model="store.password" :rules="store.passwordRules"
                :append-inner-icon="store.isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'
                    " :type="store.isPasswordVisible ? 'text' : 'password'" density="compact"
                placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="store.togglePasswordVisible()"></v-text-field>
        </v-container>
        <v-container class="d-flex flex-column text-center">
            <div>
                <v-btn variant="text" @click="emit('onToggleFormType')">
                    <span class="primary text-decoration-underline">Register now</span>
                </v-btn>
            </div>
        </v-container>
        <v-container>
            <v-divider />

            <div class="pt-5 d-flex flex-row justify-end">
                <v-btn color="secondary" @click="emit('onHideModal')">Close</v-btn>
                <v-btn v-bind="testAttr('login-button')" class="ml-2" type="submit" :loading="store.isLoading"
                    :disabled="store.isLoading">Login</v-btn>
            </div>
        </v-container>
    </v-form>
</template>
