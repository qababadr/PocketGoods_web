import { AuthenticationRepository } from "@src/AuthenticationFeature/Domain/Repository/AuthenticationRepository";
import { ApiService, toUser, User, UserDTO } from "@src/Core";
import { injectable } from "inversify";
import { LoginResponseDTO } from "../DTO/LoginResponseDTO";

@injectable()
export class AuthenticationRepositoryImpl implements AuthenticationRepository {
    async login(email: string, password: string): Promise<User> {
        const response = await ApiService.post<LoginResponseDTO>({
            url: "login",
            data: {
                email,
                password,
            },
        });
        return toUser(response.user);
    }
    async register(
        fullname: string,
        email: string,
        password: string,
        passwordConfirmation: string
    ): Promise<string> {
        return await ApiService.put<string>({
            url: "register",
            data: {
                name: fullname,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
            },
        });
    }
    async getAuthenticatedUser(): Promise<User> {
        const response = await ApiService.get<UserDTO>({
            url: "user/is-authenticated",
        });
        return toUser(response);
    }
    async logout(): Promise<boolean> {
        return await ApiService.get<boolean>({
            url: "logout",
        });
    }
}
