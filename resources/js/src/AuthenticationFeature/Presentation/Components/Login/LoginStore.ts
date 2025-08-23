import { AuthenticationUseCases } from "@src/AuthenticationFeature/Domain/UseCase";
import {
    ApiError,
    Constants,
    container,
    ServiceIdentifier,
    User,
} from "@src/Core";
import { defineStore } from "pinia";

type LoginStoreState = {
    readonly email: string;
    readonly password: string;
    readonly isPasswordVisible: boolean;
    readonly isLoading: boolean;
    readonly alertText: string;
    readonly alertVisible: boolean;
};

export const useLoginStore = defineStore("LoginStore", {
    state: (): LoginStoreState => {
        return {
            email: "",
            password: "",
            isPasswordVisible: false,
            isLoading: false,
            alertText: "",
            alertVisible: false,
        };
    },
    getters: {
        emailRules(): ((v: string) => boolean | string)[] {
            return [
                (email: string) => !!email || "The email is required",
                (email: string) =>
                    Constants.REGEX.EMAIL.test(email) ||
                    "Please provide a valid email",
            ];
        },
        passwordRules(): ((v: string) => boolean | string)[] {
            return [
                (password: string) => !!password || "The password is required",
            ];
        },
        isValidForm(): boolean {
            return (
                this.emailRules.every((rule) => rule(this.email) === true) &&
                this.passwordRules.every((rule) => rule(this.password) === true)
            );
        },
    },
    actions: {
        togglePasswordVisible() {
            this.$patch({ isPasswordVisible: !this.isPasswordVisible });
        },
        async login(params: {
            onLoggedIn: (user: User) => void;
            onError: () => void;
        }) {
            if (this.isValidForm) {
                this.$patch({ isLoading: true });

                const useCases = container.get<AuthenticationUseCases>(
                    ServiceIdentifier.AuthenticationUseCases
                );
                const { onLoggedIn, onError } = params;

                try {
                    const authenticatedUser = await useCases.login(
                        this.email,
                        this.password
                    );

                    this.$reset();

                    onLoggedIn(authenticatedUser);
                } catch (error: any) {
                    if (error instanceof ApiError) {
                        onError();
                        this.$patch({ alertVisible: true });
                    }
                } finally {
                    this.$patch({ isLoading: false });
                }
            }
        },
    },
});
