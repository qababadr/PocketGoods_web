<script setup lang="ts">
import { Product } from '@src/Core';

type Props = {
    product?: Product | undefined
}

const props = defineProps<Props>();

const emit = defineEmits(['onProductClick', 'onDeleteClick'])


</script>
<template>
    <div>
        <v-row v-if="props.product">
            <v-cols cols="8">
                <div class="d-flex flex-row">
                    <div class="pe-2">
                        <v-img cover :src="props.product.media[0].preview" class="border rounded responsive-img" />
                    </div>
                    <div class="d-flex flex-column align-start">
                        <v-btn variant="text" @click="emit('onProductClick')" class="pa-0">
                            <span class="font-weight-bold text-subtitle-2">{{ props.product.title }}</span>
                        </v-btn>
                        <div>
                            <span class="font-weight-bold text-subtitle-2">{{ props.product.price }}</span>
                        </div>
                        <span v-if="props.product.inStock" class="text-success text-caption font-weight-bold">
                            {{ props.product.quantity }} Left in stock
                        </span>
                        <span v-else class="text-red-darken-2 text-caption font-weight-bold">
                            Out of stock
                        </span>
                    </div>
                </div>
            </v-cols>
            <v-col>
                <div class="text-end">
                    <v-btn size="small" icon color="error" @click="emit('onDeleteClick')">
                        <v-icon color="white">mdi-delete</v-icon>
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </div>
</template>
<style scoped>
.responsive-img {
    width: 100px;
    height: auto;
}

@media screen and (min-width: 600px) {
    .responsive-img {
        width: 25vw;
    }
}

@media screen and (min-width: 960px) {
    .responsive-img {
        width: 15vw;
    }
}

@media screen and (min-width: 1264px) {
    .responsive-img {
        width: 10vw;
    }
}
</style>
