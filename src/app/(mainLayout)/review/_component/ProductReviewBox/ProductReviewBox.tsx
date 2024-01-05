import { Review } from "@/apis/review/reviewAPIService.types";
import Image from "next/image";
import style from "@/app/(mainLayout)/review/_component/ProductReviewBox/ProductReview.module.css";
export default function ProductReviewBox({
  params,
  refetch,
}: {
  params: Review;
  refetch: () => void;
}) {
  return (
    <div className={style.ProductReviewBox}>
      <div>
        <div>
          <Image
            src={params.productThumbnailImage}
            alt="img"
            width={0}
            height={0}
            style={{ width: "3rem", height: "3rem", borderRadius: "50%" }}
          />
          <div>{params.name}</div>
        </div>
        <div>{params.createdAt.slice(0, 10)}</div>
        <div>{params.reviewContents}</div>
      </div>
      <div>
        <Image
          src={params.reviewPhotoImageUrl || params.productThumbnailImage}
          alt="img"
          width={0}
          height={0}
          style={{ width: "5rem", height: "5rem", borderRadius: "8px" }}
        />
      </div>
    </divcl>
  );
}
