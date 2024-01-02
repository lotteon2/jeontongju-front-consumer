import { useEffect, useState } from "react";
import style from "@/app/page.module.css";
import Image from "next/image";

interface IAddr {
  address: string;
  zonecode: string;
}
type Props = {
  addressDetail: string;
  zonecode: string;
  address: string;
  setAddressDetail: (value: string) => void;
  setZonecode: (value: string) => void;
  setAddress: (value: string) => void;
};
export default function AddressSearch({
  addressDetail,
  zonecode,
  address,
  setAddressDetail,
  setZonecode,
  setAddress,
}: Props) {
  const onClickAddr = () => {
    if (typeof window !== "undefined" && window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete(data: IAddr) {
          setZonecode(data.zonecode);
          setAddress(data.address);
          document.getElementById("addrDetail")?.focus();
        },
      }).open();
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  });

  return (
    <div className={style.addressSearch}>
      <div className={style.searchAddress}>
        <input
          className={style.input}
          type="text"
          readOnly
          onClick={onClickAddr}
          value={address}
          placeholder="주소 검색"
        />
        <button className={style.searchButton} onClick={onClickAddr}>
          <Image
            alt="search"
            width={32}
            height={32}
            src="https://static.lotteon.com/p/common/foCommon/assets/img/icon_search_black.svg"
          />
        </button>
      </div>
      <input className={style.input} type="text" readOnly value={zonecode} />
      <input
        className={style.input}
        type="text"
        value={addressDetail}
        onChange={(e) => setAddressDetail(e.target.value)}
        placeholder="상세 주소"
      />
    </div>
  );
}
