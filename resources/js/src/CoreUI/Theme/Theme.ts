export const lightTheme = {
    dark: false,
    colors: {
        primary: "#11bb96",
        "primary-variant": "#a7f3e2",
        "on-primary-variant": "#212121",
        secondary: "#8A8D93",
        "on-secondary": "#fff",
        success: "#2E7D32",
        info: "#0277BD",
        warning: "#FF8F00",
        error: "#FF4C51",
        "on-primary": "#FFFFFF",
        "on-success": "#FFFFFF",
        "on-warning": "#FFFFFF",
        background: "#FFFFFF",
        "on-background": "#3A3541",
        "on-surface": "#3A3541",
        "grey-50": "#FAFAFA",
        "grey-100": "#F5F5F5",
        "grey-200": "#EEEEEE",
        "grey-300": "#E0E0E0",
        "grey-400": "#BDBDBD",
        "grey-500": "#9E9E9E",
        "grey-600": "#757575",
        "grey-700": "#616161",
        "grey-800": "#424242",
        "grey-900": "#212121",
        surface: "#f7f7f7",
    },

    variables: {
        "border-color": "#3A3541",
        "medium-emphasis-opacity": 0.68,

        // Shadows
        "shadow-key-umbra-opacity": "rgba(var(--v-theme-on-surface), 0.08)",
        "shadow-key-penumbra-opacity": "rgba(var(--v-theme-on-surface), 0.12)",
        "shadow-key-ambient-opacity": "rgba(var(--v-theme-on-surface), 0.04)",
    },
};

export const darkTheme = {
    dark: true,
    colors: {
        primary: "#0ea282", // Kept your original primary
        "primary-variant": "#20c5a1", // Slightly brighter for better contrast
        "on-primary-variant": "#101010", // Even darker text over bright variant

        secondary: "#9ca0a8", // Slightly lighter secondary for contrast
        "on-secondary": "#ffffff",

        success: "#34c759", // Bright success green
        "on-success": "#000000",

        info: "#64b5f6", // Lighter info blue
        warning: "#ffa726", // More visible orange
        error: "#f44336", // Standard material error red
        "on-warning": "#000000",
        "on-primary": "#ffffff",

        background: "#1e1e2f", // Darker but softer background
        "on-background": "#f1f1f1", // High-contrast light text

        surface: "#27293d", // Slightly more contrast than background
        "on-surface": "#f1f1f1",

        "grey-50": "#1c1c2b",
        "grey-100": "#24243a",
        "grey-200": "#33344f",
        "grey-300": "#4a4c71",
        "grey-400": "#5c5f8a",
        "grey-500": "#6f73a3",
        "grey-600": "#8c91c0",
        "grey-700": "#a3a8d4",
        "grey-800": "#c0c3e4",
        "grey-900": "#dee0f5",
    },
    variables: {
        "border-color": "#3c3e52", // Muted dark border
        "medium-emphasis-opacity": 0.72,

        // Shadows
        "shadow-key-umbra-opacity": "rgba(0, 0, 0, 0.16)",
        "shadow-key-penumbra-opacity": "rgba(0, 0, 0, 0.12)",
        "shadow-key-ambient-opacity": "rgba(0, 0, 0, 0.08)",
    },
};
