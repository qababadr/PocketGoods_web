<script setup lang="ts">
const emits = defineEmits(['onClick']);
</script>
<template>
    <v-container @click="emits('onClick')" style="width: 140px; height: 120px; cursor: pointer;">
        <img src="../Assets/pocket-goods-logo.png" alt="Pocket Goods"
            style="width: 100%;height: 100%;object-fit: contain;" />
    </v-container>
</template>
