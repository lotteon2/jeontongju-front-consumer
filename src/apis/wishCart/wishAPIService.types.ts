interface ApiResponse<T> {
  code: number;
  message: string;
  detail?: string;
  data: T;
  failure?: string;
}

export type AddDeleteWishResponse = ApiResponse<string>;
export type DeleteAllWishResponse = ApiResponse<string>;
