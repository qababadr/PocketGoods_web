import { defineStore } from "pinia";

type GlobalStoreState = {
    isDialogOpen: boolean;
    isProcessing: boolean;
    theme: "lightTheme" | "darkTheme";
    isDarkTheme: boolean;
};

export const useGlobalStore = defineStore("GlobalStore", {
    state: (): GlobalStoreState => {
        return {
            isDialogOpen: false,
            isProcessing: false,
            theme: "lightTheme",
            isDarkTheme: false,
        };
    },
    getters: {},
    actions: {
        openDialog() {
            this.isDialogOpen = true;
        },
        closeDialog() {
            this.isDialogOpen = false;
        },
        setIsProcessing(isProcessing: boolean) {
            this.isProcessing = isProcessing;
        },
        setIsDarkTheme(isDarkTheme: boolean) {
            this.isDarkTheme = isDarkTheme;
            this.theme = isDarkTheme ? "darkTheme" : "lightTheme";
        },
    },
});
