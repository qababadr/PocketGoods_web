<script setup lang="ts">
import ThemeSwitch from '@src/CoreUI/Components/ThemeSwitch.vue';
import { mergeProps } from 'vue';

type Props = {
    initials: string
    wishlistCount: number
    isDarkTheme: boolean
}

const emit = defineEmits<{
    (e: 'onToggleTheme', value: boolean | null): void,
    (e: 'onClick'): void;
    (e: 'onWishlistClick'): void;
    (e: 'onLoggedOut'): void;
}>();

const props = defineProps<Props>()

</script>
<template>
    <v-menu>
        <template v-slot:activator="{ props: menu }">
            <v-tooltip location="top">
                <template v-slot:activator="{ props: tooltip }">
                    <v-btn icon v-bind="mergeProps(menu, tooltip)" @click="emit('onClick')">
                        <v-avatar color="primary-variant">
                            <span class="text-body-2 text-on-primary-variant font-weight-bold">
                                {{ props.initials }}
                            </span>
                        </v-avatar>
                    </v-btn>
                </template>
                <span>Account settings</span>
            </v-tooltip>
        </template>
        <v-card min-width="300">
            <v-list>
                <v-list-item link prepend-icon="mdi-book-heart" title="My wishlist" @click="emit('onWishlistClick')">
                    <template v-slot:append>
                        <v-badge color="error" :content="props.wishlistCount" inline></v-badge>
                    </template>
                </v-list-item>

                <v-list-item link prepend-icon="mdi-palette" title="Switch theme">
                    <template v-slot:append>
                        <theme-switch :isDarkTheme="props.isDarkTheme"
                            @onToggleTheme="(value: boolean | null) => emit('onToggleTheme', value)" />
                    </template>
                </v-list-item>
                <v-list-item link @click="emit('onLoggedOut')" prepend-icon="mdi-logout-variant" title="Logout" />
            </v-list>
        </v-card>
    </v-menu>
</template>