import Link from "next/link";
import style from "@/app/(mainLayout)/_component/MyPage/MyOrderBox/MyOrderBox.module.css";
import Image from "next/image";

export default function MyOrderBox() {
  return (
    <div className={style.orderBox}>
      <div className={style.orderBoxHeader}>
        <div>2023.11.20</div>
        <div>주문취소</div>
      </div>
      <div className={style.orderBoxBody}>
        <div>
          <Image
            src="https://i.namu.wiki/i/wtVDagqTzZ1Zm4slYrtRiZHlBFYBvs8R33IriNuIbUpeGQ7QTMEFK--6iQalNSMPRdkPHFe8rlXb89yI996i5EtOD4VTcvfTijzG_qnFTXIR8ZkdeSj3axvqc9BgGPV-Ndex9pwWMMqTGnEEUHkmvw.webp"
            alt="img"
            width={0}
            height={0}
            className={style.orderBoxImg}
          />
        </div>
        <div className={style.orderDetail}>
          <div>
            <strong>구매확정 | 2023.11.21 배송 완료</strong>
          </div>
          <div>12,000원</div>
          <Link href={`product/12`}>복순이가 복순복순</Link>
        </div>
      </div>
    </div>
  );
}
