import style from "@/app/(mainLayout)/_component/MemberShipBox/membershipBox.module.css";
import Link from "next/link";
const MemberShipBox = () => {
  return (
    <Link href="/membership">
      <div className={style.memberShipBox}>
        구매 전, 먼저 <strong>양반 혜택</strong>을 확인해보세요
      </div>
    </Link>
  );
};
export default MemberShipBox;
