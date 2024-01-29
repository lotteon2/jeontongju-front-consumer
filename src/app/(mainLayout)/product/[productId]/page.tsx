"use client";
import AdultCaution from "/public/adultCaution.png";
import LoadingImg from "/public/loading.gif";
import NotFoundImg from "/public/jeontongju_notfound.png";
import searchAPI from "@/apis/search/searchAPIService";
import Image from "next/image";
import style from "@/app/(mainLayout)/product/[productId]/product.module.css";
import MemberShipBox from "../../_component/MemberShipBox/MemberShipBox";
import QualityInput from "../../_component/QualityInput/QualityInput";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetProductDetailByProductIdResponseData } from "@/apis/search/searchAPIService.types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import wishAPI from "@/apis/wishCart/wishAPIService";
import ProductReviewContainer from "../_component/ProductReviewContainer/ProductReviewContainer";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import SnackCard from "@/app/_component/SnackCard/SnackCard";
import RawMaterialCard from "@/app/_component/RawMaterialCard/RawMaterialCard";
import ConceptCard from "@/app/_component/ConceptCard/ConceptCard";
import { getMyCartList } from "../../mypage/_lib/getMyCartList";
import { useGetMyInfiniteCartList } from "../../mypage/_lib/useGetMyInfiniteCartList";
import { RateCard } from "@/app/_component/RateCard/RateCard";

type Props = {
  params: { productId: string };
};

export default function Page({ params }: Props) {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  const notify = (message: string) => toast(message);
  const { productId } = params;
  const [mounted, setMounted] = useState<boolean>(false);
  const [img, setImg] = useState<string>(LoadingImg);
  const [productData, setProductData] =
    useState<GetProductDetailByProductIdResponseData>(null);
  const { refetch } = useGetMyInfiniteCartList();

  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(
    productData ? productData.productPrice : 0
  );

  const handleClickCounter = (num: number) => {
    setQuantity((prev) => (prev as number) + num);
    setTotal((prev) => prev + productData.productPrice * num);
  };

  const handleBlurInput = (quantity: number) => {
    const newQuantity = quantity;
    setQuantity(newQuantity);
    setTotal(productData.productPrice * newQuantity);
  };

  const getProductData = async (productId: string) => {
    try {
      const data = await searchAPI.getProductDetailByProductId(
        productId as string
      );
      if (data.code === 200) {
        setProductData(data.data);
        setTotal(data.data.productPrice);
        setImg("");
      }
    } catch (err) {
      console.error(err);
      setImg(NotFoundImg);
      notify("없는 상품이에요.");
    }
  };

  const handleAddCart = async () => {
    if (!localStorage.getItem("accessToken")) {
      toast("로그인해주세요");
      router.push("/init/signin");
      return;
    }

    try {
      const data = await wishAPI.addCart(productId, quantity);
      if (data.code === 200) {
        refetch();
        toast("장바구니 담기에 성공했어요.");
      }
    } catch (err) {
      toast("장바구니 담기에 실패했어요.");
    }
  };

  useEffect(() => {
    getProductData(params.productId);
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && productData ? (
        <div>
          <div className={style.productTop}>
            <div className={style.thumbnail} style={{ position: "relative" }}>
              <Image
                src={productData.productThumbnailImageUrl}
                alt="productImg"
                priority
                width={1000}
                height={1000}
                placeholder="empty"
                className={style.detailImg}
                style={{
                  opacity:
                    productData.isSoldOut ||
                    !productData.isActivate ||
                    productData.isDeleted ||
                    (typeof window !== "undefined" &&
                      !localStorage.getItem("accessToken"))
                      ? 0.4
                      : 1,
                }}
              />
              {typeof window !== "undefined" &&
                !localStorage.getItem("accessToken") && (
                  <Image
                    alt="caution"
                    width={20}
                    height={20}
                    src={AdultCaution}
                    style={{
                      position: "absolute",
                      zIndex: "3",
                      right: 0,
                      top: 0,
                    }}
                  />
                )}

              {productData.isSoldOut && (
                <div className={style.soldOut}>품절</div>
              )}
              {!productData.isActivate && (
                <div className={style.soldOut}>비공개</div>
              )}
              {productData.isDeleted && (
                <div className={style.soldOut}>판매중단</div>
              )}
            </div>
            <div className={style.info}>
              <div className={style.title}>
                <div className={style.title}>{productData.productName}</div>
                {!productData.isSoldOut &&
                  productData.registeredQuantity < 10 && (
                    <div style={{ color: "red" }}>품절 임박</div>
                  )}
              </div>
              <div className={style.desc}>{productData.productDescription}</div>
              <div className={style.hr} />
              <div className={style.productPrice}>
                {productData.productPrice.toLocaleString()}원
              </div>
              <MemberShipBox />
              {!productData.isSoldOut &&
                productData.isActivate &&
                !productData.isDeleted && (
                  <div className={style.quantityBox}>
                    <QualityInput
                      quantity={quantity}
                      stock={productData.registeredQuantity}
                      onClick={handleClickCounter}
                      setQuantity={setQuantity}
                      onBlur={handleBlurInput}
                    />
                    <div>{total.toLocaleString()}원</div>
                  </div>
                )}
              {!productData.isSoldOut &&
              !productData.isDeleted &&
              productData.isActivate ? (
                <div className={style.btnGroup}>
                  <div className={style.button} onClick={handleAddCart}>
                    장바구니 담기
                  </div>
                  <Link
                    className={style.button}
                    href={{
                      pathname: "/payment",
                      query: {
                        realAmount: total,
                        totalAmount: total,
                        isCart: false,
                        products: JSON.stringify([
                          {
                            productId,
                            productThumbnailImageUrl:
                              productData.productThumbnailImageUrl,
                            productName: productData.productName,
                            productPrice: productData.productPrice,
                            productCount: quantity,
                          },
                        ]),
                      },
                    }}
                  >
                    바로 구매하기
                  </Link>
                </div>
              ) : (
                <div>품절된 상품이에요</div>
              )}

              <div className={style.hr} />
              <div>리뷰 작성시 3% 추가 적립</div>
              <Link
                href={`/seller/${productData.sellerId}`}
                className={style.sellerInfo}
              >
                <Image
                  src={productData.storeImageUrl}
                  alt="img"
                  placeholder="empty"
                  priority
                  className={style.storeImg}
                  width={10}
                  height={10}
                  style={{
                    borderRadius: "12px",
                    cursor: "pointer",
                    width: "3rem",
                    height: "auto",
                  }}
                />
                <div>판매자 | {productData.storeName}</div>
              </Link>
            </div>
          </div>
          <div className={style.hr}></div>
          <div className={style.menus}>
            <div
              className={selectedMenu === 0 ? style.selected : style.menu}
              onClick={() => setSelectedMenu(0)}
            >
              상품 상세
            </div>
            <div
              className={selectedMenu === 1 ? style.selected : style.menu}
              onClick={() => setSelectedMenu(1)}
            >
              리뷰
            </div>
            <div
              className={selectedMenu === 2 ? style.selected : style.menu}
              onClick={() => setSelectedMenu(2)}
            >
              교환 / 반품 안내
            </div>
          </div>
          <div className={style.details}>
            {selectedMenu === 0 ? (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={productData.productDetailsImageUrl}
                    alt="productDetailImg"
                    priority
                    width={1000}
                    height={1000}
                    style={{
                      cursor: "pointer",
                      width: "70%",
                      height: "100%",
                      margin: "0 auto",
                    }}
                  />
                </div>
                {productData.rawMaterial && (
                  <>
                    <h2>잘 어울리는 원료</h2>
                    <div className={style.snacks}>
                      {productData.rawMaterial.map((it, idx) => (
                        <RawMaterialCard key={idx} rawMaterial={it} />
                      ))}
                    </div>
                  </>
                )}
                {productData.food.length && (
                  <>
                    <h2>잘 어울리는 안주</h2>
                    <div className={style.snacks}>
                      {productData.food.map((it, idx) => (
                        <SnackCard key={idx} snack={it} />
                      ))}
                    </div>
                  </>
                )}
                {productData.concept.length > 0 && (
                  <>
                    <h2>잘 어울리는 컨셉</h2>
                    <div className={style.snacks}>
                      {productData.concept.map((it, idx) => (
                        <ConceptCard key={idx} concept={it} />
                      ))}
                    </div>
                  </>
                )}
                {productData.taste && (
                  <>
                    <h2>상품의 맛</h2>
                    <div>
                      <RateCard name="바디감" rate={productData.taste.body} />
                      <RateCard
                        name="탄산감"
                        rate={productData.taste.carbonation}
                      />
                      <RateCard name="신맛" rate={productData.taste.sour} />
                      <RateCard name="단맛" rate={productData.taste.sweet} />
                      <RateCard name="향" rate={productData.taste.scent} />
                    </div>
                  </>
                )}
              </>
            ) : selectedMenu === 1 ? (
              <ProductReviewContainer productId={productId} />
            ) : (
              <div>
                <h2>판매자정보</h2>
                <table>
                  <tr>
                    <td>업체명</td>
                    <td>{productData.storeName}</td>
                  </tr>
                  <tr>
                    <td>양조장</td>
                    <td>{productData.breweryName}</td>
                  </tr>
                  <tr>
                    <td>우편 번호</td>
                    <td>{productData.breweryZonecode}</td>
                  </tr>
                  <tr>
                    <td>사업장 소재지</td>
                    <td>{productData.breweryAddressDetails}</td>
                  </tr>
                  <tr>
                    <td>사업장 상세 소재지</td>
                    <td>
                      {productData.breweryAddress}
                      {productData.breweryAddressDetails}
                    </td>
                  </tr>
                </table>
                <div className={style.detailDesc}>
                  본 상품정보(상품상세정보, 상품기본정보 등)의 내용은 판매자가
                  직접 등록한 정보입니다. 전통주점은 중개시스템만 제공하며 그
                  등록 내용에 대하여 일체의 책임을 지지 않습니다.
                </div>
                <h2>교환 / 반품 안내</h2>
                <table>
                  <tr>
                    <td>교환/반품 비용</td>
                    <td>전통주 특성상 교환, 반품이 불가해요.</td>
                  </tr>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Image
          src={img}
          alt="jeontongju-notfound"
          width={0}
          height={0}
          style={{ cursor: "pointer", width: "80%", height: "80%" }}
        />
      )}
    </>
  );
}
