interface ApiResponse<T> {
  code: number;
  message: string;
  detail?: string;
  data: T;
  failure?: string;
}

export interface Page<T> {
  content: T;
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export type GetProductDetailByProductIdResponseData = {
  productId: string;
  productName: string;
  productDescription: string;
  productThumbnailImageUrl: string;
  productAlcoholDegree: number;
  productCapacity: number;
  breweryName: string;
  breweryZonecode: number;
  breweryAddress: string;
  breweryAddressDetails: string;
  manufacturer: string;
  productPrice: number;
  capacityToPriceRatio: number;
  registeredQuantity: number;
  productDetailsImageUrl: string;
  categoryId: number;
  sellerId: number;
  storeName: string;
  storeImageUrl: string;
  taste: {
    sour: number;
    sweet: number;
    scent: number;
    carbonation: number;
    body: number;
  };
  rawMaterial: ["RICE"];
  food: ["PIZZA", "CHICKEN"];
  concept: ["TRIP"];
  isSoldOut: boolean;
  isLikes: boolean;
};

export type GetPopularProductsBySellerIdResponseData = {
  productId: string;
  productName: string;
  productDescription: string;
  productThumbnailImageUrl: string;
  productPrice: number;
  capacityToPriceRatio: number;
  isLikes: boolean;
  isSoldOut: boolean;
};

export type GetProductDetailByProductIdResponse =
  ApiResponse<GetProductDetailByProductIdResponseData>;

export type GetPopularProductsBySellerIdResponse = ApiResponse<
  GetPopularProductsBySellerIdResponseData[]
>;

export type GetAllProductsBySellerIdResponse = ApiResponse<
  Page<GetPopularProductsBySellerIdResponseData[]>
>;
