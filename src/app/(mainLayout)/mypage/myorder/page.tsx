import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { Page } from "@/constants/PageResponseType";
import { GetMyWishListResponseData } from "@/apis/wishCart/wishAPIService.types";
import { getMyWishList } from "../_lib/getMyWishList";
import ProductContainer from "../../_component/ProductContainer/ProductContainer";
export default function MyOrderPage() {
  return (
    <div>
      <div>나의 주문 내역</div>
    </div>
  );
}
