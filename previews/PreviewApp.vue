<script setup lang="ts">
import { ref } from 'vue';
import { markRaw } from 'vue';
import PreviewWrapper from './PreviewWrapper.vue';
import { useGlobalStore } from './sandbox/GlobalStore';

type PreviewItem = {
    name: string;
    component: any;
};


const modules = import.meta.glob('./sandbox/*.preview.vue', { eager: true });

const previews: PreviewItem[] = Object.entries(modules)
    .map(([path, mod]) => {
        const fileName = path.split('/').pop()!;
        const name = fileName
            .replace('.preview.vue', '')
            .replace(/([A-Z])/g, ' $1')
            .trim();

        const component = (mod as { default: any }).default;
        if (!component) return null;

        return { name, component: markRaw(component) };
    })
    .filter(Boolean) as PreviewItem[];

const selected = ref(previews[0] ?? null);
const globalStore = useGlobalStore();
</script>

<template>
    <v-app>
        <v-theme-provider :theme="globalStore.theme" with-background>
            <div style="display: flex; height: 100vh;">
                <aside :style="{
                    width: '220px',
                    background: globalStore.isDarkTheme ? '#1e1e1e' : '#f5f5f5',
                    color: globalStore.isDarkTheme ? '#eee' : '#000',
                    borderRight: '1px solid',
                    borderColor: globalStore.isDarkTheme ? '#333' : '#ddd',
                    padding: '1rem',
                    height: '100vh',
                    overflowY: 'auto',
                    boxSizing: 'border-box',
                }">
                    <h3 style="margin-bottom: 1rem;">Components</h3>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li v-for="preview in previews" :key="preview.name" @click="selected = preview" :style="{
                            padding: '0.5rem 1rem',
                            marginBottom: '0.25rem',
                            cursor: 'pointer',
                            borderRadius: '6px',
                            background:
                                selected?.name === preview.name
                                    ? globalStore.isDarkTheme
                                        ? '#333'
                                        : '#e0e0e0'
                                    : 'transparent',
                            color: globalStore.isDarkTheme ? '#eee' : '#000',
                        }">
                            {{ preview.name }}
                        </li>
                    </ul>
                </aside>


                <main style="flex: 1; padding: 2rem;">
                    <PreviewWrapper v-if="selected?.component" :component="selected.component" />
                </main>
            </div>
        </v-theme-provider>
    </v-app>
</template>
