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

export interface SignUpParams {
  email: string;
  password: string;
  impUid: string;
  isMerge: boolean;
}

export interface CheckEmailParams {
  email: string;
}

export type SignInResponseData = {
  accessToken: string;
  refreshToken: string;
};

export type CheckEmailResponseData = {
  authCode: string;
  isSocial: boolean;
};

export interface UpdateMyPasswordParams {
  email: string;
  newPassword: string;
}

export type CheckEmailResponse = ApiResponse<CheckEmailResponseData>;

export type SignInResponse = ApiResponse<SignInResponseData>;
export type SignUpResponse = ApiResponse<string>;
export type CheckMyEmailResponse = ApiResponse<{ authCode: string }>;
export type UpdateMyPasswordBeforeLoginResponse = ApiResponse<string>;
export type WithDrawalResponse = ApiResponse<string>;
export type CheckMyPasswordIsAuthResponse = ApiResponse<string>;
export type UpdateMyPasswordAfterLoginResponse = ApiResponse<string>;
export type AdultCheckAfterLoginResponse = ApiResponse<string>;
