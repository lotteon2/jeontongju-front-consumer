import { unAuthAxiosInstance } from "../common";
import { SignInParams, SignInResponse } from "./authenticationAPIService.types";

const authAPI = {
    signIn: async (params: SignInParams) => {
        const { data } = await unAuthAxiosInstance.post<SignInResponse>(`/authentication-service/api/sign-in`, params);
        return data;
    }
}
export default authAPI;