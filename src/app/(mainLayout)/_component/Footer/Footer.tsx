"use client";
import logoImg from "/public/logo.png";
import Image from "next/image";
import style from "@/app/(mainLayout)/_component/Footer/Footer.module.css";
export default function Footer() {
  return (
    <div className={style.companyInfo}>
      <h2 className={style.logoArea}>
        <Image
          src={logoImg}
          layout="fixed"
          width={0}
          height={0}
          alt="logo"
          className={style.logoImg}
          priority
        />
      </h2>
      <div className={style.infoWrapper}>
        <div className={style.company}>
          <h3>전통주점</h3>
          <ul>
            <li>대표이사:</li>
            <li>주소 : 서울특별시 송파구 올림픽로 300 롯데월드타워 26층</li>
            <li>사업자등록번호 : 529-85-00774(롯데쇼핑(주) e커머스사업부)</li>
            <li>호스팅 서비스사업자 : 롯데쇼핑(주) e커머스사업부</li>
          </ul>
        </div>
        <div className={style.customer}>
          <h3>고객센터</h3>
          <div>
            <p>전화번호: 1899-7000(유료)</p>
            <p>Email: mailto:lotteon@lotte.net</p>
          </div>
        </div>
      </div>
    </div>
  );
}
