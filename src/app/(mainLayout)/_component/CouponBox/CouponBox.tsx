import { GetMyCouponListResponseData } from "@/apis/coupon/couponAPIService.types";
import style from "@/app/(mainLayout)/_component/CouponBox/CouponBox.module.css";
import { translateCouponState } from "@/constants/CouponEnum";

export default function CouponBox({
  coupon,
}: {
  coupon: GetMyCouponListResponseData;
}) {
  return (
    <div className={style.couponBox}>
      <div className={style.couponName}>
        {translateCouponState(coupon.couponName)}
      </div>
      <div className={style.discountAmount}>{coupon.discountAmount}</div>
      <div>{coupon.minOrderPrice} 이상 구매시 사용 가능</div>
      <div className={style.expiredAt}>~{coupon.expiredAt.slice(0, 10)}</div>
    </div>
  );
}
