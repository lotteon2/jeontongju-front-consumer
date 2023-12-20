"use client";
import Image from "next/image";
import style from "@/app/(mainLayout)/orderdetail/[ordersId]/orderDetail.module.css";
import LoadingImg from "/public/loading.gif";
import NotFoundImg from "/public/jeontongju_notfound.png";
import { GetMyOrderListResponseData } from "@/apis/order/orderAPIService.types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderDetail() {
  const params = useSearchParams();
  const orderParam = params.get("order");
  const [order, setOrder] = useState<GetMyOrderListResponseData | null>(null);
  const [img, setImg] = useState<string>(LoadingImg);

  useEffect(() => {
    if (orderParam) {
      try {
        const decodedOrder = decodeURIComponent(orderParam);
        const parsedOrder = JSON.parse(decodedOrder);
        console.log(parsedOrder);
        setOrder(parsedOrder);
      } catch (error) {
        console.error("Error parsing order parameter:", error);
        setImg(NotFoundImg);
      }
    } else {
      setImg(NotFoundImg);
    }
  }, [orderParam]);

  return (
    <>
      {order ? (
        <div className={style.orderDetailPage}>
          주문 상세 내역
          <div className={style.orderHeader}>
            <div>{order.order?.ordersId}</div>
            <div>{order.order?.orderDate.slice(0, 10)}</div>
          </div>
          <div className={style.detailSection}>
            <div className={style.products}>
              {order.product?.map((product) => (
                <div key={product.productOrderId}>
                  <div>
                    <strong>{product.productOrderStatus}</strong>
                  </div>
                  <div>
                    {product.productPrice} 원 X {product.productCount}
                  </div>
                  <div>
                    <Link href={`/product/${product.productId}`}>
                      {product.productName}
                    </Link>
                  </div>
                  <div>
                    <Link href={`/seller/${product.sellerId}`}>
                      {product.sellerName}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={style.detailSection}>
            <div>
              <div>
                <div className={style.detailHeader}>배송지정보</div>
              </div>
              <div className={style.infoCont}>
                <div className={style.infoDiv}>
                  <strong>수령인</strong>
                  <span>{order.delivery.recipientName}</span>
                </div>
                <div className={style.infoDiv}>
                  <strong>연락처</strong>
                  <div>{order.delivery.recipientPhoneNumber}</div>
                </div>
                <div className={style.infoDiv}>
                  <strong>배송지</strong>
                  <span> {order.delivery.zonecode}</span>
                  {order.delivery.basicAddress}
                  {order.delivery.addressDetail}
                </div>
              </div>
            </div>
          </div>
          <div className={style.detailSection}>
            <div>
              <div>
                <div className={style.detailHeader}>주문금액</div>
              </div>
              <div className={style.infoCont}>
                <div className={style.infoDiv}>
                  <strong>상품 금액</strong>
                  <span>{order.payment.realPrice}</span>
                </div>
                <div className={style.infoDiv}>
                  <strong>배송비</strong>
                  <div>전통주점은 항상 무료 배송</div>
                </div>
                <div className={style.infoDiv}>
                  <strong>쿠폰 할인 </strong>
                  <span> {order.payment.minusCouponAmount}</span>
                </div>
                <div className={style.infoDiv}>
                  <strong>포인트 할인 </strong>
                  <span> {order.payment.minusCouponAmount}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={style.detailSection}>
            <div>
              <div className={style.detailHeader}>포인트 혜택</div>
            </div>
            <div className={style.infoCont}>
              <div className={style.infoDiv}>
                <strong>구매 확정시 적립</strong>
                <span>{order.payment.realPrice * 0.3}</span>
              </div>
              <div className={style.infoDiv}>
                <strong>리뷰 적립</strong>
                <span>500원</span>
              </div>
            </div>
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