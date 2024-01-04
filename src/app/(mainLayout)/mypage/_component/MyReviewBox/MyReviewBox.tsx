import { GetMyReviewListResponseData } from "@/apis/review/reviewAPIService.types";
import Image from "next/image";
import style from "@/app/(mainLayout)/mypage/_component/MyReviewBox/MyReviewBox.module.css";
import { useRouter } from "next/navigation";

export default function MyReviewBox({
  params,
  refetch,
}: {
  params: GetMyReviewListResponseData;
  refetch: () => void;
}) {
  const router = useRouter();
  return (
    <div
      className={style.myReviewBox}
      onClick={() => router.push(`/review/${params.reviewId}`)}
    >
      <div>
        <Image
          src={params.productThumbnailImage}
          alt="img"
          width={0}
          height={0}
          style={{
            cursor: "pointer",
            width: "8rem",
            height: "8rem",
            borderRadius: "12px",
          }}
        />
      </div>
      <div>
        <Image
          src={params.reviewPhotoImageUrl}
          alt="img"
          width={0}
          height={0}
          style={{
            cursor: "pointer",
            width: "5rem",
            height: "5rem",
            borderRadius: "8px",
          }}
        />
        <div>{params.reviewContents}</div>
      </div>
    </div>
  );
}
