import consumerAPI from "@/apis/consumer/consumerAPIService";
import { GetMyInfoResponseData } from "@/apis/consumer/consumerAPIservice.types";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "@/app/(mainLayout)/_component/MyPage/MyInfoBox/MyInfoBox.module.css";

export default function MyInfoBox() {
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
        </div>
      </div>
    </div>
  );
}
