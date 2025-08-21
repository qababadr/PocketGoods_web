<script setup lang="ts">
import LottiePlayer from './LottiePlayer.vue';
import Animation from '../Assets/zero_purchase.json';
import { useRouter } from 'vue-router';
import { Constants } from '../Util/constants';

const router = useRouter();

</script>
<template>
    <div class="d-flex flex-column">
        <div class="d-flex justify-center">
            <LottiePlayer :animationData="Animation" class="lottiePlayer" />
        </div>
        <div class="d-flex flex-column align-center justify-center" style="min-height: 100vh;padding-top: 500px;">
            <div class="pb-6 text-center">
                <span class="text-h5 on-background">
                    🚧 Oops! You're not authorized.
                </span>
            </div>
            <div class="pb-6">
                <v-btn @click="router.push({ name: Constants.SCREENS.HomeScreen })" prepend-icon="mdi-home"
                    class="px-16">
                    Return Home
                </v-btn>
            </div>
        </div>
    </div>
</template>
<style scoped>
.lottiePlayer {
    position: absolute;
    width: 700px;
    height: auto;
}
</style>