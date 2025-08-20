<script setup lang="ts">
type Props = {
    text: string
}

const props = defineProps<Props>();

</script>
<template>
    <span class="text-body-2">{{ props.text }}</span>
</template>
