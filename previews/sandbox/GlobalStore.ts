import { ProductPreview, stringAvatar, User } from "@src/Core";
import { defineStore } from "pinia";
import { delay, productPreviews, mockUser } from "./helper";

type GlobalStoreState = {
    isDialogOpen: boolean;
    isProcessing: boolean;
    theme: "lightTheme" | "darkTheme";
    isDarkTheme: boolean;
    inWishlist: boolean;
    suggestedProducts: ProductPreview[];
    searchQuery: string;
    authenticatedUser: User;
};

export const useGlobalStore = defineStore("GlobalStore", {
    state: (): GlobalStoreState => {
        return {
            isDialogOpen: false,
            isProcessing: false,
            theme: "lightTheme",
            isDarkTheme: false,
            inWishlist: false,
            suggestedProducts: [],
            searchQuery: "",
            authenticatedUser: mockUser,
        };
    },
    getters: {
        userInitials(): string {
            return stringAvatar(
                this.authenticatedUser.name
            ).toLocaleUpperCase();
        },
    },
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
        toggleWishlist() {
            this.inWishlist = !this.inWishlist;
        },
        setSearchQuery(query: string) {
            this.searchQuery = query;
        },
        async searchSuggestions() {
            this.isProcessing = true;

            await delay(1500);

            this.suggestedProducts = productPreviews.filter((product) =>
                product.title
                    .toLocaleLowerCase()
                    .includes(this.searchQuery.toLocaleLowerCase())
            );

            this.isProcessing = false;
        },
    },
});
