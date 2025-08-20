import { defineStore } from "pinia";

type LoaderStoreState = {
    isLoading: boolean;
};

export const useLoaderStore = defineStore("LoaderStore", {
    state: (): LoaderStoreState => {
        return {
            isLoading: false,
        };
    },
    getters: {},
    actions: {
        setIsLoading(isLoading: boolean) {
            this.isLoading = isLoading;
        },
    },
});
