<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Constants } from '../Util/constants';
import Logo from './Logo.vue';
import LottiePlayer from './LottiePlayer.vue';
import AnimatedIllustration from '@src/CoreUI/Assets/animated_background.json';

const router = useRouter();
</script>
<template>
    <div class="header-container elevation-12" width="w-100">
        <section>
            <div class="typewriter big-caret animated-text-width">
                {{ Constants.welcomeText }}
            </div>
        </section>
        <LottiePlayer :animationData="AnimatedIllustration" class="lottiePlayer" />
        <v-row no-gutters>
            <v-col cols="8">
                <v-row align="center" class="py-2">
                    <div>
                        <Logo @click="router.push({ name: Constants.SCREENS.HomeScreen })" />
                    </div>
                    <slot name="search-input" />
                </v-row>
            </v-col>
            <v-col cols="4" class="pr-10 mt-10">
                <slot name="toolbar" />
            </v-col>
        </v-row>
    </div>
</template>
<style scoped>
.header-container {
    height: 75vh;
    color: white;
    display: flex;
    background: #060121 url('../Assets/blob-bg.svg') no-repeat center center;
    background-size: cover;
}

.lottiePlayer {
    position: absolute;
    width: 700px;
    right: -50px;
    top: 60px;
    height: auto;
    z-index: 0;
    pointer-events: none;
}

@keyframes grow {
    0% {
        max-height: var(--lineHeight);
    }

    100% {
        max-height: calc(var(--lineHeight) * var(--lines));
    }
}

@keyframes carriageReturn {
    0% {
        top: 0;
    }

    100% {
        top: calc(var(--lineHeight) * var(--lines));
    }
}

@keyframes type {
    0% {
        width: 100%;
    }

    100% {
        width: 0%;
    }
}

@keyframes caret {
    0% {
        color: var(--bgColor);
    }

    100% {
        width: white;
    }
}

.typewriter {
    --bgColor: #060121;
    --lines: 500;
    --lineHeight: 3rem;
    --timePerLine: 2s;
    --widthCh: 22;
    --width: calc(var(--widthCh) * 1vw);
    --time: calc(var(--lines) * var(--timePerLine));
    animation: grow var(--time) steps(var(--lines));
    animation-fill-mode: forwards;
    background: var(--bgColor);
    line-height: var(--lineHeight);
    max-width: var(--lineHeight);
    overflow: hidden;
    position: relative;
    width: var(--width);
}

.typewriter::before {
    content: "";
    animation: type var(--timePerLine) linear infinite,
        carriageReturn var(--time) steps(var(--lines), var(--lines)),
        caret 0.5s steps(2) infinite;
    background: var(--bgColor);
    bottom: 0;
    height: 3rem;
    position: absolute;
    right: 0;
}

section {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    left: 0;
    padding: 1rem;
    position: absolute;
    top: 140px;
    width: 100%;
    columns: white;
    font-size: x-large;
}

.animated-text-width {
    --widthCh: 60;
    --timePerLine: 6s;
}

/* Large Screen */
@media (min-width: 1200px) {
    .lottiePlayer {
        width: 700px;
        right: -50px;
        top: 60px;
    }

    section {
        font-size: x-large;
    }
}

/* Medium screen */
@media (max-width: 1199px) and (min-width: 768px) {
    .lottiePlayer {
        width: 550px;
        right: -20px;
        top: 190px;
    }

    section {
        font-size: large;
    }

    .typewriter {
        --width: calc(var(--widthCh) * 0.8vw);
    }
}

/* Small screen */
@media (max-width: 767px) and (min-width: 480px) {
    .lottiePlayer {
        display: none;
    }

    section {
        font-size: large;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .typewriter {
        display: inline-block;
        text-align: center;
        margin: 0 auto;
        text-align: center;
    }
}

/* Extra Small screen */
@media (max-width: 470px) {
    .lottiePlayer {
        display: none;
    }

    section {
        font-size: large;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .typewriter {
        display: inline-block;
        text-align: center;
        margin: 0 auto;
        text-align: center;
    }
}
</style>
