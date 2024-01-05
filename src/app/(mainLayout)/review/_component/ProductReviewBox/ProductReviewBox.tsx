import { Review } from "@/apis/review/reviewAPIService.types";
import Image from "next/image";
import style from "@/app/(mainLayout)/review/_component/ProductReviewBox/ProductReviewBox.module.css";
export default function ProductReviewBox({
  params,
  refetch,
}: {
  params: Review;
  refetch: () => void;
}) {
  return (
    <div className={style.productReviewBox}>
      <div>
        <div className={style.userBox}>
          <Image
            src={params.profileImageUrl}
            alt="img"
            width={0}
            height={0}
            style={{ width: "3rem", height: "3rem", borderRadius: "50%" }}
          />
          <div>
            <div>{params.name}</div>
            <div className={style.date}>{params.createdAt.slice(0, 10)}</div>
          </div>
        </div>
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
    </div>
  );
}
