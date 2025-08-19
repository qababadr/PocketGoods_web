import axios, { AxiosResponse } from "axios";
import { Constants } from "../constants";
import { ApiResponse } from "./ApiResponse";
import { ApiError } from "./ApiError";

interface ApiServiceProps {
    url: string;
    data?: any;
}

export class ApiService {
    private static readonly axiosInstance = axios.create({
        baseURL: Constants.Base_URL,
        withCredentials: true,
        withXSRFToken: true,
    });

    static async get<DTO>(params: ApiServiceProps): Promise<DTO> {
        try {
            const response: AxiosResponse<ApiResponse<DTO>> =
                await this.axiosInstance.get(params.url);
            return response.data.data;
        } catch (error: any) {
            throw new ApiError(error);
        }
    }

    static async rawGet<DTO>(params: ApiServiceProps): Promise<DTO> {
        try {
            const response: AxiosResponse<DTO> = await this.axiosInstance.get(
                params.url
            );
            return response.data;
        } catch (error: any) {
            throw new ApiError(error);
        }
    }

    static async post<DTO>(params: ApiServiceProps): Promise<DTO> {
        try {
            const response: AxiosResponse<ApiResponse<DTO>> =
                await this.axiosInstance.post(params.url, params.data);
            return response.data.data;
        } catch (error: any) {
            throw new ApiError(error);
        }
    }

    static async rawPost<DTO>(params: ApiServiceProps): Promise<DTO> {
        try {
            const response: AxiosResponse<DTO> = await this.axiosInstance.post(
                params.url,
                params.data
            );
            return response.data;
        } catch (error: any) {
            throw new ApiError(error);
        }
    }

    static async put<DTO>(params: ApiServiceProps): Promise<DTO> {
        try {
            const response: AxiosResponse<ApiResponse<DTO>> =
                await this.axiosInstance.put(params.url, params.data);
            return response.data.data;
        } catch (error: any) {
            throw new ApiError(error);
        }
    }
}
