import UserDefaultImg from "/public/UserDefault.png";
import FiSrHeartSVG from "/public/fi-sr-heart.svg";
import FiSrHeartFullSVG from "/public/fi-sr-heart-fill.svg";
import { Review } from "@/apis/review/reviewAPIService.types";
import Image from "next/image";
import style from "@/app/(mainLayout)/review/_component/ProductReviewBox/ProductReviewBox.module.css";
import reviewAPI from "@/apis/review/reviewAPIService";
import { toast } from "react-toastify";
export default function ProductReviewBox({
  params,
  refetch,
}: {
  params: Review;
  refetch: () => void;
}) {
  const handleLike = async () => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("accessToken")) {
        toast("로그인한 유저만 리뷰에 공감할 수 있어요.");
        return;
      }
    }
    try {
      const data = await reviewAPI.likeReview(params.reviewId);
      if (data.code === 200) {
        refetch();
      }
    } catch (err) {
      toast("리뷰 공감에 실패했어요");
    }
  };

  return (
    <div className={style.productReviewBox}>
      <div>
        <div className={style.userBox}>
          <div>
            <Image
              src={params.profileImageUrl || UserDefaultImg}
              alt="img"
              width={0}
              height={0}
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "50%",
              }}
            />
          </div>

          <div>
            <div>{params.name}</div>
            <div className={style.date}>{params.createdAt.slice(0, 10)}</div>
          </div>
        </div>
        <div>{params.reviewContents}</div>
      </div>
      <div>
        <div onClick={handleLike} className={style.heartBox}>
          <Image
            alt="bell"
            width={0}
            height={0}
            src={params.isSympathy ? FiSrHeartFullSVG : FiSrHeartSVG}
            style={{
              cursor: localStorage.getItem("accessToken") ? "pointer" : "none",
              width: "1rem",
              height: "1rem",
              position: "relative",
            }}
          />
          <div>{params.reviewSympathyCount}</div>
        </div>

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
