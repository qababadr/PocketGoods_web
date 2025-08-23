import { User } from "@src/Core";

export interface AuthenticationRepository {
    login(email: string, password: string): Promise<User>;

    register(
        fullname: string,
        email: string,
        password: string,
        passwordConfirmation: string
    ): Promise<string>;

    getAuthenticatedUser(): Promise<User>;

    logout(): Promise<boolean>;
}
