import MemberShipPointImg from "/public/membership_point.gif";
import MemberShipDeliveryImg from "/public/membership_delivery.gif";
import Image from "next/image";
import style from "@/app/(mainLayout)/membership/membership.module.css";
export default function MemberShip() {
  return (
    <div className={style.membership}>
      <div className={style.membershipHeader}>
        전통주점만의 양반 혜택
        <div className={style.membershipHeaderDesc}>
          월 3,900원으로 양반이 되어보세요!
        </div>
        <button className={style.button}>양반으로 인연 맺기</button>
      </div>
      <div>
        <section className={style.benefitSection}>
          <div className={style.benefitSection__delivery}>
            <h2>전통주점은 모두 무료배송</h2>
            <p></p>
            <Image
              src={MemberShipDeliveryImg}
              alt="delivery"
              width={0}
              height={0}
              style={{ cursor: "pointer", width: "30%", height: "30%" }}
            ></Image>
          </div>
          <div className={style.benefitSection__gift}>
            <h2>양반 전용 이달의 쿠폰팩</h2>
            <p>매달 10,000원의 쿠폰 지급</p>
            <Image
              src="//image8.coupangcdn.com/image/coupang/loyalty/sign-up/home/web/goldbox-benfit-pc@2x.png"
              alt="gift"
              width={0}
              height={0}
              style={{ cursor: "pointer", width: "30%", height: "30%" }}
            ></Image>
          </div>
          <div className={style.benefitSection__point}>
            <h2>양반 전용 포인트 추가 적립</h2>
            <p>나그네 1% / 양반 3%</p>
            <Image
              src={MemberShipPointImg}
              alt="gift"
              width={0}
              height={0}
              style={{ cursor: "pointer", width: "30%", height: "30%" }}
            ></Image>
          </div>
        </section>
      </div>
    </div>
  );
}
