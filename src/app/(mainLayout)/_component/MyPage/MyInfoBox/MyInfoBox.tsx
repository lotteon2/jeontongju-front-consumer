import consumerAPI from "@/apis/consumer/consumerAPIService";
import { GetMyInfoResponseData } from "@/apis/consumer/consumerAPIservice.types";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "@/app/(mainLayout)/_component/MyPage/MyInfoBox/MyInfoBox.module.css";
import { useRouter } from "next/navigation";

export default function MyInfoBox() {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const [myInfo, setMyInfo] = useState<GetMyInfoResponseData>();

  const getMyInfo = async () => {
    const { data } = await consumerAPI.getMyInfo();
    setMyInfo(data);
  };

  useEffect(() => {
    getMyInfo();
    setMounted(true);
  }, []);

  return (
    <div className={style.myInfoBox}>
      <div className={style.infoHeader}>
        <div>
          <Image
            src={myInfo?.profileImageUrl}
            alt="img"
            width="100"
            height="100"
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div>
          <div className={style.name}>{myInfo?.name}</div>
          <div>{myInfo?.email}</div>
          <div>{myInfo?.phoneNumber}</div>
          <div
            className={style.membership}
            onClick={() =>
              router.push(
                myInfo?.isRegularPayments
                  ? "/membership/list"
                  : "/membership/buy"
              )
            }
          >
            {myInfo?.isRegularPayments ? "양반" : "나그네"}
          </div>
        </div>
      </div>
      <div className={style.infoFooter}>
        <div
          className={style.infoDiv}
          onClick={() => router.push("/point/list")}
        >
          <div className={style.infoTitle}>포인트</div>
          <div className={style.infoDesc}>{myInfo?.point}</div>
        </div>
        <div className={style.infoDiv}>
          <div className={style.infoTitle}>쿠폰</div>
          <div className={style.infoDesc}>쿠폰 받으러 가기</div>
        </div>
        <div
          className={style.infoDiv}
          onClick={() => router.push("/credit/list")}
        >
          <div className={style.infoTitle}>크레딧</div>
          <div className={style.infoDesc}>{myInfo?.credit}</div>
        </div>
      </div>
    </div>
  );
}
