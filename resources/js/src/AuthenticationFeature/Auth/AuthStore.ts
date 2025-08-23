import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import {
    Constants,
    container,
    ServiceIdentifier,
    stringAvatar,
    User,
    WishlistItem,
} from "@src/Core";
import { AuthenticationUseCases } from "../Domain/UseCase";

type AuthStoreState = {
    authenticatedUser: User | null;
    theme: string;
};

const initialState = {
    authenticatedUser: null,
    theme: "lightTheme",
};

export const useAuthStore = defineStore("AuthStore", {
    state: (): AuthStoreState => {
        const storedState = useStorage(
            Constants.AUTH_STORAGE_KEY,
            initialState,
            localStorage,
            { mergeDefaults: true }
        );
        return storedState.value;
    },
    getters: {
        isAuthenticated(): boolean {
            return this.authenticatedUser !== null;
        },
        userInitials(): string {
            if (this.authenticatedUser == null) return "";
            return stringAvatar(this.authenticatedUser.name.toUpperCase());
        },
        inWishlist: (state: AuthStoreState) => (productId: number) => {
            return (
                state.authenticatedUser?.wishlist.find(
                    (item: WishlistItem) => item.productId === productId
                ) !== undefined
            );
        },
    },
    actions: {
        deleteFromWishlist(productId: number) {
            if (!this.authenticatedUser) return;

            const updatedWishlist = this.authenticatedUser.wishlist.filter(
                (item) => item.productId !== productId
            );

            this.$patch({
                authenticatedUser: {
                    ...this.authenticatedUser,
                    wishlist: updatedWishlist,
                },
            });
        },
        addWishlistItem(productId: number, insertedWishlistItemId: number) {
            if (!this.authenticatedUser) return;

            const updatedWishlist = [
                ...(this.authenticatedUser.wishlist ?? []),
                new WishlistItem(insertedWishlistItemId, productId),
            ];
            this.$patch({
                authenticatedUser: {
                    ...this.authenticatedUser,
                    wishlist: updatedWishlist,
                },
            });
        },
        async check(): Promise<void> {
            const useCases = container.get<AuthenticationUseCases>(
                ServiceIdentifier.AuthenticationUseCases
            );

            try {
                const user = await useCases.getAuthenticatedUser();

                this.$patch({ authenticatedUser: user });
            } catch {
                this.clear();
            }
        },
        clear() {
            this.$patch({ authenticatedUser: null });
            localStorage.removeItem(Constants.AUTH_STORAGE_KEY);
        },
        initializeFromUser(user: User) {
            this.$patch({ authenticatedUser: user });
        },
        reloadTheme() {
            this.$patch({
                theme: this.theme === "darkTheme" ? "lightTheme" : "darkTheme",
            });
        },
        toggleTheme(isDarkTheme: boolean) {
            this.$patch({
                theme: isDarkTheme ? "lightTheme" : "darkTheme",
            });
        },
    },
});
