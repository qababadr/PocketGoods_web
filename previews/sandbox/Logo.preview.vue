<script setup lang="ts">
import Logo from '@src/CoreUI/Components/Logo.vue';

function onClick() {
    alert('Logo clicked')
}

</script>
<template>
    <Logo @click="onClick" />
</template>
