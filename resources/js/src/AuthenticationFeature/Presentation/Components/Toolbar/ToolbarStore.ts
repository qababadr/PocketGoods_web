import { defineStore } from "pinia";
import { FormType } from "./FormType";
import { AuthenticationUseCases } from "@src/AuthenticationFeature/Domain/UseCase";
import { container, ServiceIdentifier } from "@src/Core";

type ToolbarStoreState = {
    readonly isModalVisible: boolean;
    readonly formType: FormType;
    readonly wishlistCount: number;
    readonly shouldAnimate: boolean;
    readonly isDarkTheme: boolean;
};

export const useToolbarStore = defineStore("ToolbarStore", {
    state: (): ToolbarStoreState => {
        return {
            isModalVisible: false,
            formType: FormType.Login,
            wishlistCount: 0,
            shouldAnimate: false,
            isDarkTheme: false,
        };
    },
    getters: {
        isMenuOpen() {
            return false;
        },
        modalTitle(): string {
            return this.formType == FormType.Login ? "Login" : "Register";
        },
    },
    actions: {
        setIsDarkThemeFrom(string: string) {
            this.$patch({
                isDarkTheme: string === "lightTheme" ? false : true,
            });
        },
        openModal() {
            this.$patch({ isModalVisible: true });
        },
        closeModal() {
            this.$patch({ isModalVisible: false });
        },
        toggleFormType() {
            this.$patch({
                formType:
                    this.formType == FormType.Login
                        ? FormType.Register
                        : FormType.Login,
            });
            this.$patch({ shouldAnimate: true });
        },
        async logout(params: { onLoggedOut: () => void }) {
            const useCases = container.get<AuthenticationUseCases>(
                ServiceIdentifier.AuthenticationUseCases
            );

            try {
                await useCases.logout();
                params.onLoggedOut();
            } catch {
                return;
            }
        },
    },
});
