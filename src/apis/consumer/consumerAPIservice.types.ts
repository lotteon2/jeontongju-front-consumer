interface ApiResponse<T> {
    code: number;
    message: string;
    detail?: string;
    data: T;
    failure?: string;
}

export interface SignUpParams {
    email: string;
    password: string;
    imp_uid: string;
    isMerge: boolean;
}

export interface CheckEmailParams {
    email: string;
}

export type CheckEmailResponseData = {
    authCode: string;
}

export type SignUpResponse = ApiResponse<string>;

export type CheckEmailResponse = ApiResponse<CheckEmailResponseData>;