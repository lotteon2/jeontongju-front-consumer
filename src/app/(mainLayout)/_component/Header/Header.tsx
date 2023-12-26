import style from "@/app/(mainLayout)/_component/Header/Header.module.css";
import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <div className={style.header}>
      <div className={style.topnav}>
        <Link href={"/"} className={style.active}>
          Home
        </Link>
        <Link href={"/"}>전체 상품</Link>
        <Link href={"/shorts"}>쇼츠</Link>
        <Link href={"/seller/list"}>셀러</Link>
        <Link href={"/auction/list"}>경매</Link>
        <div className={style.searchBar}>
          <input
            type="text"
            placeholder="전통주점은 전상품 무료배송"
            className={style.input}
          />
          <Image
            alt="search"
            width={32}
            height={32}
            src="https://static.lotteon.com/p/common/foCommon/assets/img/icon_search_black.svg"
          />
        </div>
      </div>
      <div className={style.headerBottom}>
        <Link href={"/init/signin"}>로그인</Link>
        <Link href={"/init/signup"}>로그인</Link>
        <Link href={"/mypage"}>마이페이지</Link>
        <Link href={"/init/logout"}>로그아웃</Link>
      </div>
    </div>
  );
}
