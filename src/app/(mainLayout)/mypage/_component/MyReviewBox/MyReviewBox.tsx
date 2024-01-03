import { GetMyReviewListResponseData } from "@/apis/review/reviewAPIService.types";
import Image from "next/image";
import style from "@/app/(mainLayout)/mypage/_component/MyReviewBox/MyReviewBox.module.css";

export default function MyReviewBox({
  params,
  refetch,
}: {
  params: GetMyReviewListResponseData;
  refetch: () => void;
}) {
  return (
    <div className={style.myReviewBox}>
      <div>
        <Image
          src={params.productThumbnailImage}
          alt="img"
          width={0}
          height={0}
          style={{ cursor: "pointer", width: "5rem", height: "5rem" }}
        />
      </div>
      <div>
        <Image
          src={params.reviewPhotoImageUrl}
          alt="img"
          width={0}
          height={0}
          style={{ cursor: "pointer", width: "5rem", height: "5rem" }}
        />
        <div>{params.reviewContents}</div>
      </div>
    </div>
  );
}
