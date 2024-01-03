interface ApiResponse<T> {
  code: number;
  message: string;
  detail?: string;
  data: T;
  failure?: string;
}

export interface UploadS3ResponseData {
  presignedUrl: string;
  encodeFileName: string;
  dataUrl: string;
}

export type UploadS3Response = ApiResponse<UploadS3ResponseData>;
