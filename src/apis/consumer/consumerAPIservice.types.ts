interface ApiResponse<T> {
  code: number;
  message: string;
  detail?: string;
  data: T;
  failure?: string;
}

export type GetMyInfoResponseData = {
  email: string;
  name: string;
  phoneNumber: string;
  profileImageUrl: string;
};

export type GetMyInfoResponse = ApiResponse<GetMyInfoResponseData>;
