interface ApiResponse<T> {
    code: number;
    message: string;
    detail?: string;
    data: T;
    failure?: string;
}

export interface SignInParams {
    email: string;
    password: string;
}

export type SignInResponseData = {
    accessToken: string;
};

export type SignInResponse = ApiResponse<SignInResponseData>;