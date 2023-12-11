import { authAxiosInstance, unAuthAxiosInstance } from "../common";
import {
  CheckEmailParams,
  CheckEmailResponse,
  SignInParams,
  SignInResponse,
  SignUpParams,
  SignUpResponse,
} from "./authenticationAPIService.types";

const authAPI = {
  signIn: async (params: SignInParams) => {
    const { data } = await unAuthAxiosInstance.post<SignInResponse>(
      `/authentication-service/api/sign-in`,
      { ...params, memberRole: "ROLE_CONSUMER" }
    );
    return data;
  },
  refreshAuth: async () => {
    const { data } = await authAxiosInstance.put(
      `/authentication-service/api/access-token`
    );
    return data;
  },
  signUp: async (params: SignUpParams) => {
    const { data } = await authAxiosInstance.post<SignUpResponse>(
      "/authentication-service/api/consumers/sign-up",
      params
    );
    return data;
  },
  checkEmail: async (params: CheckEmailParams) => {
    const { data } = await unAuthAxiosInstance.post<CheckEmailResponse>(
      "/authentication-service/api/sign-up/email/auth",
      params
    );
    return data;
  },
};
export default authAPI;
