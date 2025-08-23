<script setup lang="ts">
import { testAttr } from '@src/Core';
import { useToolbarStore } from './ToolbarStore';
import { FormType } from './FormType';
import { SnackbarSeverity, useSnackbarControllerStore } from '@src/CoreUI/Components';
import AuthenticatedMessage from '../AuthenticatedMessage.vue';
import UserMenu from '../UserMenu.vue';
import Message from '@src/CoreUI/Components/Message.vue';
import { useRouter } from 'vue-router';
import { Constants } from '@src/CoreUI/Util/constants';
import { useAuthStore } from '@src/AuthenticationFeature/Auth/AuthStore';

const toolbarStore = useToolbarStore()
const snackbarController = useSnackbarControllerStore()
const router = useRouter()
const auth = useAuthStore()

function showAuthenticatedFeedback() {
    snackbarController
        .setSeverity(SnackbarSeverity.Success)
        .setContentProps({
            username: auth.authenticatedUser?.name ?? ''
        })
        .setContent(AuthenticatedMessage)
        .show()
}

function onLoggedOut() {
    toolbarStore.logout({
        onLoggedOut() {
            auth.clear()
            navigate(Constants.SCREENS.HomeScreen)
            snackbarController
                .setSeverity(SnackbarSeverity.Success)
                .setContentProps({
                    text: 'You have logged out successfully'
                })
                .setContent(Message)
                .show()
        },
    })
}

function navigate(screenName: string) {
    try {
        router.push({ name: screenName })
    } catch {
        return
    }
}

function onToggleTheme(isDarkTheme: boolean | null) {
    if (isDarkTheme != null) {
        toolbarStore.$patch({ isDarkTheme: isDarkTheme })
        auth.toggleTheme(isDarkTheme)
    }
}

async function checkAuthenticatedUser() {
    await auth.check()
}

</script>
<template>
    <v-row just="end" v-if="auth.isAuthenticated" align="center" class="pr-2">
        <user-menu :wishlist-count="auth.authenticatedUser?.wishlist?.length ?? 0" :initials="auth.userInitials"
            :is-dark-theme="toolbarStore.isDarkTheme"
            @on-wishlist-click="navigate(Constants.SCREENS.WishlistManagerScreen)" @on-logged-out="onLoggedOut"
            @on-toggle-theme="onToggleTheme" @on-click="checkAuthenticatedUser" />
    </v-row>
    <v-row just="end" v-else>
        <v-btn v-bind="testAttr('login-modal-button')" append-icon="mdi-login" variant="text" color="white"
            @click="toolbarStore.openModal()">
            Login
        </v-btn>
    </v-row>
    <v-row justify="center">
        <v-dialog v-model="toolbarStore.isModalVisible" transition="dialog-bottom-transition" width="500">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>{{ toolbarStore.modalTitle }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn variant="text" @click="toolbarStore.closeModal()">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <div v-if="toolbarStore.formType === FormType.Login" :class="{
                    'animate__animated animate__flipInX':
                        toolbarStore.shouldAnimate,
                }">
                    <LoginForm @on-logged-in="showAuthenticatedFeedback()" @on-hide-modal="toolbarStore.closeModal()"
                        @on-toggle-form-type="toolbarStore.toggleFormType()" />
                </div>
                <div v-else :class="{
                    'animate__animated animate__zoomIn':
                        toolbarStore.shouldAnimate,
                }">
                    <RegisterForm @on-hide-modal="toolbarStore.closeModal()"
                        @on-toggle-formType="toolbarStore.toggleFormType()" />
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
    transition: transform 0.2s ease-in-out;
}
</style>