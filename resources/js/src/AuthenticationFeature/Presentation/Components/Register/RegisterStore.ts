import { AuthenticationUseCases } from "@src/AuthenticationFeature/Domain/UseCase";
import { ApiError, Constants, container, ServiceIdentifier } from "@src/Core";
import { defineStore } from "pinia";

type RegisterStoreState = {
    readonly firstAndLastName: string;
    readonly email: string;
    readonly password: string;
    readonly confirmPassword: string;
    readonly passwordVisible: boolean;
    readonly confirmPasswordVisible: boolean;
    readonly shouldValidate: boolean;
    readonly isLoading: boolean;
    readonly alertVisible: boolean;
    readonly alertType: "success" | "error";
    readonly alertText: string;
};

export const useRegisterStore = defineStore("RegisterStore", {
    state: (): RegisterStoreState => {
        return {
            firstAndLastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            passwordVisible: false,
            confirmPasswordVisible: false,
            shouldValidate: false,
            isLoading: false,
            alertVisible: false,
            alertType: "error",
            alertText: "",
        };
    },
    getters: {
        firstAndLastNameRules(): ((v: string) => boolean | string)[] {
            return [
                (firstAndLastName: string) =>
                    firstAndLastName.length >= 5 ||
                    "First and Last Name are required (at least 5 characters)",
            ];
        },
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
                (password: string) => !!password || "Password is required",
                (password: string) =>
                    Constants.REGEX.PASSWORD.test(password) ||
                    "Please provide a valid password (at least one symbol, one uppercase and 8 characters in total at least)",
            ];
        },
        confirmPasswordRules(): ((v: string) => boolean | string)[] {
            return [
                (password: string) =>
                    !!password || "Password confirmation is required",
                () =>
                    this.confirmPassword === this.password ||
                    "Passwords do not match",
            ];
        },
        isFormValid(): boolean {
            return (
                this.firstAndLastNameRules.every(
                    (rule) => rule(this.firstAndLastName) === true
                ) &&
                this.emailRules.every((rule) => rule(this.email) === true) &&
                this.passwordRules.every(
                    (rule) => rule(this.password) === true
                ) &&
                this.confirmPasswordRules.every(
                    (rule) => rule(this.confirmPassword) === true
                )
            );
        },
    },
    actions: {
        togglePasswordVisible() {
            this.setPasswordVisible(!this.passwordVisible);
        },
        toggleConfirmPasswordVisible() {
            this.setConfirmPasswordVisible(!this.confirmPasswordVisible);
        },
        setPasswordVisible(visible: boolean) {
            this.$patch({ passwordVisible: visible });
        },
        setConfirmPasswordVisible(visible: boolean) {
            this.$patch({ confirmPasswordVisible: visible });
        },
        reset() {
            this.$patch({
                firstAndLastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                passwordVisible: false,
                confirmPasswordVisible: false,
                shouldValidate: false,
            });
        },
        async register(params: {
            onRegistered: (username: string) => void;
            onError: () => void;
        }) {
            if (this.isFormValid) {
                this.$patch({ isLoading: true });

                const useCases = container.get<AuthenticationUseCases>(
                    ServiceIdentifier.AuthenticationUseCases
                );

                const { onRegistered, onError } = params;

                try {
                    await useCases.register(
                        this.firstAndLastName,
                        this.email,
                        this.password,
                        this.confirmPassword
                    );

                    onRegistered(this.firstAndLastName);

                    this.reset();
                } catch (error) {
                    if (error instanceof ApiError) {
                        onError();
                    }
                } finally {
                    this.$patch({ isLoading: true, alertVisible: true });
                }
            }
        },
    },
});
