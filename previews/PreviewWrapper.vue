<template>
    <component :is="component" v-bind="props" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    component: any
    props?: Record<string, any>
}>()
</script>