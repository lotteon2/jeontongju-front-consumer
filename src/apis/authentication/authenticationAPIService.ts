import { authAxiosInstance, unAuthAxiosInstance } from "../common";
import {
  CheckEmailParams,
  CheckEmailResponse,
  CheckMyEmailResponse,
  SignInParams,
  SignInResponse,
  SignUpParams,
  SignUpResponse,
  UpdateMyPasswordBeforeLoginResponse,
  UpdateMyPasswordParams,
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
    const { data } = await unAuthAxiosInstance.post<SignUpResponse>(
      "/authentication-service/api/consumers/sign-up",
      params
    );
    return data;
  },
  checkEmail: async (params: CheckEmailParams) => {
    const { data } = await unAuthAxiosInstance.post<CheckEmailResponse>(
      "/authentication-service/api/sign-up/email/auth",
      { ...params, memberRole: "ROLE_CONSUMER" }
    );
    return data;
  },
  /* 로그인 전 비밀번호 찾기시 이메일 인증 단계 */
  checkMyEmail: async (email: string) => {
    const { data } = await unAuthAxiosInstance.post<CheckMyEmailResponse>(
      "/authentication-service/api/password",
      {
        email,
      }
    );
    return data;
  },
  /* 로그인 전 비밀번호 재설정 */
  updateMyPasswordBeforeLogin: async (params: UpdateMyPasswordParams) => {
    const { data } =
      await unAuthAxiosInstance.patch<UpdateMyPasswordBeforeLoginResponse>(
        "/password",
        { ...params, memberRole: "ROLE_CONSUMER" }
      );
    return data;
  },
};
export default authAPI;
