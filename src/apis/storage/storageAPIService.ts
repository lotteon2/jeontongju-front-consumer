import { authAxiosInstance } from "../common";
import { UploadS3Response } from "./storageAPIservice.types";

const storageAPI = {
  uploadImage: async (fileName: string) => {
    const { data } = await authAxiosInstance.post<UploadS3Response>(
      `/file/${fileName}`
    );
    return data;
  },
};
export default storageAPI;
