<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import lottie, { AnimationItem } from 'lottie-web';

interface Props {
    animationData: object;
}

const props = defineProps<Props>();
const lottieContainer = ref<HTMLElement | null>(null);
let animation: AnimationItem | null = null;

onMounted(() => {
    if (lottieContainer.value) {
        animation = lottie.loadAnimation({
            container: lottieContainer.value,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: props.animationData
        });
    }
});

onBeforeUnmount(() => {
    animation?.destroy();
});

</script>
<template>
    <div ref="lottieContainer" class="lottie-container" />
</template>
<style scoped>
.lottie-container {
    width: 100%;
    height: 100%;
    pointer-events: none;
}
</style>
