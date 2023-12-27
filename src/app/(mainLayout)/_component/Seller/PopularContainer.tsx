import style from "@/app/(mainLayout)/seller/[sellerId]/seller.module.css";
import ProductContainer from "../ProductContainer/ProductContainer";
import { GetPopularProductsBySellerIdResponseData } from "@/apis/search/searchAPIService.types";
export default function PopularProducts({
  popularProducts,
  popularReviewProducts,
}: {
  popularProducts?: GetPopularProductsBySellerIdResponseData[];
  popularReviewProducts?: GetPopularProductsBySellerIdResponseData[];
}) {
  return (
    <div>
      <h2>다들 구매하고 있어요! 인기 상품</h2>
      <div className={style.products}>
        {popularProducts?.map(
          (product: GetPopularProductsBySellerIdResponseData) => (
            <ProductContainer
              productName={product.productName}
              productId={product.productId}
              productImg={product.productThumbnailImageUrl}
              price={product.productPrice}
              capacityToPriceRatio={product.capacityToPriceRatio}
              key={product.productId}
              isLikes={product.isLikes}
            />
          )
        )}
      </div>
      <h2>구매 후기가 팡팡! 리뷰 인기 상품</h2>
      <div className={style.products}>
        {popularReviewProducts?.map(
          (product: GetPopularProductsBySellerIdResponseData) => (
            <ProductContainer
              productName={product.productName}
              productId={product.productId}
              productImg={product.productThumbnailImageUrl}
              price={product.productPrice}
              capacityToPriceRatio={product.capacityToPriceRatio}
              key={product.productId}
              isLikes={product.isLikes}
            />
          )
        )}
      </div>
    </div>
  );
}
