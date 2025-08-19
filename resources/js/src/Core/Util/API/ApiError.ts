import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export class ApiError extends Error {
    readonly code?: string;
    readonly config?: InternalAxiosRequestConfig;
    readonly request?: any;
    readonly response?: AxiosResponse;

    constructor(error: AxiosError) {
        super();
        this.message = error.message;
        this.config = error.config;
        this.request = error.request;
        this.response = error.response;
    }

    get ApiError(): string | undefined {
        return this.response?.data?.error_message;
    }
}
