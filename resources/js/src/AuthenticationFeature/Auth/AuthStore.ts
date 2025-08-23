import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import {
    Constants,
    container,
    ServiceIdentifier,
    stringAvatar,
    User,
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
    },
    actions: {
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
