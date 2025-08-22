<script setup lang="ts">
import { ProductPreview } from '@src/Core';
import { computed, ref } from 'vue';

type Props = {
    product: ProductPreview
    isAuthenticated: boolean
    inWishlist: boolean
}

const props = withDefaults(
    defineProps<Props>(),
    { isAuthenticated: false, inWishlist: false }
)

const emit = defineEmits(['onViewProduct', 'onToggleWishlist'])

const visible = ref(false)
const actionMenuClass = ref('product-menu-action')
const visibleActionMenuClass = ref('visible-menu')
const hiddenActionMenuClass = ref('hidden-menu')

const wishlistIconColor = computed(() => {
    return props.inWishlist ? 'red' : 'secondary'
})

const wishlistButtonIcon = computed(() => {
    return props.inWishlist ? 'mdi-heart' : 'mdi-heart-outline'
})

</script>
<template>
    <v-card class="mx-auto product-card" width="400" color="surface" elevation="8">
        <div style="cursor: pointer;position: relative;" @mouseenter="visible = true" @mouseleave="visible = false">
            <v-img cover height="345" :src="props.product.thumbnail ?? undefined" />
            <div v-if="props.isAuthenticated"
                :class="[actionMenuClass, visible ? visibleActionMenuClass : hiddenActionMenuClass]">
                <v-btn variant="elevated" color="bg-surface" density="comfortable" @click="emit('onToggleWishlist')"
                    icon>
                    <v-icon :color="wishlistIconColor" :icon="wishlistButtonIcon" />
                </v-btn>
            </div>
        </div>
        <v-card-item>
            <v-card-title>
                <div class="d-flex justify-center">
                    {{ props.product.title }}
                </div>
            </v-card-title>
        </v-card-item>
        <v-card-subtitle class="text-align-center pt-1 pb-1">
            <div class="d-flex justify-center">
                <span class="me-1 font-weight-bold">${{ props.product.price }}</span>
            </div>
        </v-card-subtitle>
        <v-card-text>
            <div class="toggle-show-wrapper">
                <v-btn class="toggle-show" @click="emit('onViewProduct')">Learn more</v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>
<style scoped>
.product-menu-action {
    position: absolute;
    top: 10px;
    right: 10px;
    opacity: 0;
    transform: translateX(50px);
    transition: all 0.3s ease-out;
    z-index: 2;
}

.visible-menu {
    opacity: 1;
    transform: translateX(0);
}

.hidden-menu {
    opacity: 0;
    transform: translateX(50px);
}

.toggle-show-wrapper {
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
}

.product-card:hover .toggle-show-wrapper {
    opacity: 1;
    transform: translateX(0);
    margin-right: 8px;
}

.toggle-show {
    transition: all 0.3s ease;
}
</style>