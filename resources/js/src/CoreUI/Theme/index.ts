import "@mdi/font/css/materialdesignicons.css";
import { createVuetify, IconAliases } from "vuetify";
import { defaults } from "./Defaults";
import "vuetify/styles";
import { darkTheme, lightTheme } from "./Theme";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import logoSmall from "../Assets/logo-small.svg";
import { aliases as defaultAliases, mdi } from "vuetify/iconsets/mdi";

const aliases: IconAliases = {
    ...defaultAliases,
    logoSmall,
};

export const vuetify = createVuetify({
    components,
    directives,
    defaults,
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: { mdi },
    },
    theme: {
        defaultTheme: "light",
        themes: {
            lightTheme,
            darkTheme,
        },
    },
});
