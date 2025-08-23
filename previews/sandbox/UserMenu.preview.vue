<script setup lang="ts">
import UserMenu from '@src/AuthenticationFeature/Presentation/Components/UserMenu.vue';
import { useGlobalStore } from './GlobalStore';
const store = useGlobalStore()

function onToggleTheme(value: boolean | null) {
    if (value != null) {
        store.setIsDarkTheme(value)
    }
}

function onWishlistClick() {
    alert('navigating to wishlist manager')
}

function onLoggedOut() {
    alert('Logged out successfully')
}

</script>
<template>
    <v-row justify="end">
        <user-menu :wishlist-count="store.authenticatedUser.wishlist.length" :initials="store.userInitials"
            :is-dark-theme="store.isDarkTheme" @on-wishlist-click="onWishlistClick" @on-logged-out="onLoggedOut"
            @on-toggle-theme="onToggleTheme" @on-click="" />
    </v-row>
</template>
