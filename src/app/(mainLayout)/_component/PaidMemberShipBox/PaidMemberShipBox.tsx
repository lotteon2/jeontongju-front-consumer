import { GetMyMembershipResponseData } from "@/apis/consumer/consumerAPIservice.types";
import style from "@/app/(mainLayout)/_component/PaidMemberShipBox/PaidMemberShipBox.module.css";
export default function PaidMemberShipBox({
  params,
}: {
  params: GetMyMembershipResponseData;
}) {
  return (
    <div className={style.paidMembershipBox}>
      <div>
        {params.startDate.slice(0, 10)} ~ {params.endDate.slice(0, 10)}
      </div>
      <div>{params.paymentAmount}</div>
      <div>{params.paymentMethod === "KAKAO" ? "카카오" : "?"}</div>
    </div>
  );
}
