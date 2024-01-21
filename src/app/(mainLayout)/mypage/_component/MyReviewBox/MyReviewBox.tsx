import {
  GetMyReviewListResponseData,
  Review,
} from "@/apis/review/reviewAPIService.types";
import Image from "next/image";
import style from "@/app/(mainLayout)/mypage/_component/MyReviewBox/MyReviewBox.module.css";
import { useRouter } from "next/navigation";

export default function MyReviewBox({
  params,
  refetch,
}: {
  params: GetMyReviewListResponseData | Review;
  refetch: () => void;
}) {
  const router = useRouter();
  return (
    <div
      className={style.myReviewBox}
      onClick={() => router.push(`/product/${params.productId}`)}
    >
      <div>
        <Image
          src={params.productThumbnailImage}
          alt="img"
          width={1000}
          height={1000}
          priority
          style={{
            cursor: "pointer",
            width: "8rem",
            height: "8rem",
            borderRadius: "12px",
          }}
        />
      </div>
      <div>
        {params.reviewPhotoImageUrl && (
          <Image
            src={params.reviewPhotoImageUrl}
            alt="img"
            width={100}
            height={100}
            priority
            style={{
              cursor: "pointer",
              width: "5rem",
              height: "5rem",
              borderRadius: "8px",
            }}
          />
        )}

        <div>
          <div>{params.reviewContents}</div>
          <div className={style.createdAt}>
            작성일 | {params.createdAt?.slice(0, 10)}
          </div>
        </div>
      </div>
    </div>
  );
}
