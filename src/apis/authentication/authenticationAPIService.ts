import {
  authAxiosInstance,
  getCookieForRefresh,
  unAuthAxiosInstance,
} from "../common";
import {
  AdultCheckAfterLoginResponse,
  CheckEmailParams,
  CheckEmailResponse,
  CheckMyEmailResponse,
  CheckMyPasswordIsAuthResponse,
  SignInParams,
  SignInResponse,
  SignUpParams,
  SignUpResponse,
  UpdateMyPasswordAfterLoginResponse,
  UpdateMyPasswordBeforeLoginResponse,
  UpdateMyPasswordParams,
  WithDrawalResponse,
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
      `/authentication-service/api/access-token`,
      { cookie: getCookieForRefresh() }
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
      "/authentication-service/api/email/auth",
      {
        email,
        memberRole: "ROLE_CONSUMER",
      }
    );
    return data;
  },
  /* 로그인 전 비밀번호 재설정 */
  updateMyPasswordBeforeLogin: async (params: UpdateMyPasswordParams) => {
    const { data } =
      await unAuthAxiosInstance.patch<UpdateMyPasswordBeforeLoginResponse>(
        "/authentication-service/api/password",
        { ...params, memberRole: "ROLE_CONSUMER" }
      );
    return data;
  },
  withdrawal: async () => {
    const { data } = await authAxiosInstance.delete<WithDrawalResponse>(
      `/authentication-service/api/consumers`
    );
    return data;
  },
  checkMyPasswordIsAuth: async (password: string) => {
    const { data } =
      await authAxiosInstance.post<CheckMyPasswordIsAuthResponse>(
        `/authentication-service/api/password/auth`,
        { originalPassword: password }
      );
    return data;
  },
  updateMyPasswordAfterLogin: async (newPassword: string) => {
    const { data } =
      await authAxiosInstance.patch<UpdateMyPasswordAfterLoginResponse>(
        `/authentication-service/api/password/change`,
        { newPassword }
      );
    return data;
  },
  adultCheckAfterLogin: async (impUid: string) => {
    const { data } =
      await authAxiosInstance.patch<AdultCheckAfterLoginResponse>(
        `/authentication-service/api/consumers/adult-certification`,
        { impUid }
      );
    return data;
  },
};
export default authAPI;
