import { GetSellerInfoResponseData } from "@/apis/seller/sellerAPIService.types";
import Image from "next/image";
import style from "@/app/(mainLayout)/seller/[sellerId]/seller.module.css";

export default function SellerInfo({
  sellerInfo,
}: {
  sellerInfo: GetSellerInfoResponseData;
}) {
  return (
    <div className={style.sellerInfo}>
      <div className={style.sellerInfoContainer}>
        <div className={style.sellerInfoMiniHead}>주모 정보</div>
        <div className={style.sellerInfoDiv}>
          <div className={style.sellerInfoTitle}>셀러 이름</div>
          <div className={style.sellerInfoDesc}>{sellerInfo?.storeName}</div>
        </div>
        <div className={style.sellerInfoDiv}>
          <div className={style.sellerInfoTitle}>샵 설명</div>
          <div className={style.sellerInfoDesc}>
            {sellerInfo?.storeDescription}
          </div>
        </div>
        <div className={style.sellerInfoDiv}>
          <div className={style.sellerInfoTitle}>샵 대표 번호</div>
          <div className={style.sellerInfoDesc}>
            {sellerInfo?.storePhoneNumber}
          </div>
        </div>
      </div>
      <div className={style.sellerInfoContainer}>
        <div className={style.sellerInfoMiniHead}>배송 정보</div>
        <div className={style.sellerInfoDiv}>
          <div className={style.sellerInfoTitle}>배송방법 </div>
          <div className={style.sellerInfoDesc}>순차배송</div>
        </div>
        <div className={style.sellerInfoDiv}>
          <div className={style.sellerInfoTitle}>배송기간</div>
          <div className={style.sellerInfoDesc}>
            주문 및 결제 완료 후, 2-3일 이내 도착 (- 도서 산간 지역 등은 하루가
            더 소요될 수 있어요.)
          </div>
        </div>
        <div className={style.sellerInfoDiv}>
          <div className={style.sellerInfoTitle}>배송비</div>
          <div className={style.sellerInfoDesc}>
            전통주점은 전상품 무료배송이에요!
          </div>
        </div>
      </div>
      <div className={style.sellerInfoContainer}>
        <div className={style.sellerInfoMiniHead}>배송 정보</div>
        <div className={style.sellerInfoDiv}>
          <div>교환 / 반품 안내</div>
          <div>전통주라는 상품 특성상 교환, 반품이 불가해요.</div>
        </div>
      </div>
    </div>
  );
}
