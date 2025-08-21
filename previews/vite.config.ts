import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vuetify from "vite-plugin-vuetify";
import ViteSvgLoader from "vite-svg-loader";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    root: "previews",
    server: {
        hmr: {
            host: "localhost",
        },
    },
    build: {
        target: "esnext",
        manifest: true,
        rollupOptions: {
            input: "/main.ts",
            external: ["fsevents"],
        },
        chunkSizeWarningLimit: 1000,
        lib: {
            entry: "/main.ts", // Adjust if needed
            fileName: "bundle", // Specify the file name for the JS bundle
            cssFileName: "styles", // Specify the CSS file name
            formats: ["es"],
        },
    },
    plugins: [
        vue(),
        vuetify({ autoImport: true }),
        ViteSvgLoader(),
        tsconfigPaths(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../resources"),
            "@src": path.resolve(__dirname, "../resources/js/src"),
            "@js": path.resolve(__dirname, "../resources/js"),
            "@css": path.resolve(__dirname, "../resources/css"),
        },
    },
});
