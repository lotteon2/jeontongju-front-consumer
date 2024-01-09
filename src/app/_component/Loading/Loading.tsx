import loadingImg from "/public/loading.gif";
import Image from "next/image";
import style from "@/app/_component/Loading/Loading.module.css";

export default function Loading() {
  return (
    <div className={style.loading}>
      <Image
        src={loadingImg}
        width={0}
        height={0}
        alt="loading"
        style={{ width: "50%", height: "50%" }}
      />
    </div>
  );
}
