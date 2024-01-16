import style from "@/app/(mainLayout)/_component/PointCreditBox/PointCreditBox.module.css";
import { Credit, Trade } from "@/apis/consumer/consumerAPIservice.types";
import { POINT } from "@/constants/PointEnum";

export default function PointCreditBox({ params }: { params: Trade | Credit }) {
  return (
    <div className={style.creditBox}>
      <div className={style.left}>
        {params.tradePoint.toLocaleString() || params.tradeCredit.toLocaleString()}냥
      </div>
      <div className={style.right}>
        <div>{POINT[params.tradePath]}</div>
        <div className={style.desc}>{params.tradeDate.slice(0, 10)}</div>
      </div>
    </div>
  );
}
