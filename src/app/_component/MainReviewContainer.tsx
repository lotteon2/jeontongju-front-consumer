import style from "@/app/page.module.css";
import { useRouter } from "next/navigation";

export default function MainReviewContainer() {
  const router = useRouter();

  return (
    <div className={style.mainShortsContainer}>
      <div className={style.mainShortsTop}>
        <h2>리뷰가 많이 달리는 상품들!</h2>
        <div
          className={style.goList}
          onClick={() => router.push("/shorts/list")}
        >
          더 많은 쇼츠 보러가기 {">"}
        </div>
      </div>

      <div className={style.shortsContainer}>
        {data?.map((short) => (
          <ShortsDetail
            params={{ id: short.shortsId }}
            shorts={short}
            key={short.shortsId}
            isMain={true}
          />
        ))}
      </div>
    </div>
  );
}
