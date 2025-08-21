import { createApp } from 'vue'
import PreviewApp from './PreviewApp.vue'
import { createPinia } from 'pinia'
import { loadFonts } from '../resources/js/src/CoreUI/Theme/Webfontloader'
import { vuetify } from '../resources/js/src/CoreUI/Theme'
import { createRouter, createWebHistory } from 'vue-router'

export const previewRouter = createRouter({
    history: createWebHistory(''),
    routes: [],
    scrollBehavior(to, _from, savedPosition) {
        if (to.hash) {
            return { el: to.hash, behavior: 'smooth' }
        }
        if (savedPosition) {
            return savedPosition
        }
        return { top: 0, behavior: 'smooth' }
    },
})

const app = createApp(PreviewApp)
const pinia = createPinia()

loadFonts().then(() => {
    app.use(pinia).use(vuetify).use(previewRouter).mount('#app')
})
