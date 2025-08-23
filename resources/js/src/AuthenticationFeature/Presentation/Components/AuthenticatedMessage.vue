<script setup lang="ts">
type Props = {
    username: string
}

const props = defineProps<Props>();

</script>
<template>
    <span class="text-subtitle-1">
        Welcome back
    </span>
    <strong>{{ ` ${props.username}` }}</strong>
</template>
