import { authAxiosInstance, unAuthAxiosInstance } from "../common"
import { CheckEmailParams, CheckEmailResponse, SignUpParams, SignUpResponse } from "./consumerAPIservice.types";

const consumerAPI = {
    signUp: async (params: SignUpParams) => {
        const { data } = await authAxiosInstance.post<SignUpResponse>('/consumer-service/api/sign-up', params);
        return data;
    },
    checkEmail: async (params: CheckEmailParams) => {
        const { data } = await unAuthAxiosInstance.post<CheckEmailResponse>('/consumer-service/api/sign-up/email/auth', params);
        return data;
    }
}
export default consumerAPI;