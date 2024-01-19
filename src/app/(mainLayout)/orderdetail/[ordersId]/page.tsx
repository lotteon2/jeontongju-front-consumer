"use client";
import Image from "next/image";
import style from "@/app/(mainLayout)/orderdetail/[ordersId]/orderDetail.module.css";
import LoadingImg from "/public/loading.gif";
import NotFoundImg from "/public/jeontongju_notfound.png";
import { GetMyOrderListResponseData } from "@/apis/order/orderAPIService.types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useMyInfoStore } from "@/app/store/myInfo/myInfo";
import { translateOrderState } from "@/constants/OrderStatusEnum";

export default function OrderDetail() {
  const params = useSearchParams();
  const orderParam = params.get("order");
  const [order, setOrder] = useState<GetMyOrderListResponseData | null>(null);
  const [img, setImg] = useState<string>(LoadingImg);

  const [isRegularPayment] = useMyInfoStore((state) => [
    state.isRegularPayment,
  ]);
  useEffect(() => {
    if (orderParam) {
      try {
        console.log("orderParam", orderParam);
        console.log("order deocde", decodeURIComponent(orderParam));
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
            <div>
              {order.order.isAuction ? `AU_` : `PR_`}
              {order.order?.ordersId}
            </div>
            <div>{order.order?.orderDate.slice(0, 10)}</div>
          </div>
          <div className={style.detailSection}>
            <div className={style.products}>
              {order.product?.map((product) => (
                <div key={product.productOrderId}>
                  <div>
                    <strong>
                      {translateOrderState(product.productOrderStatus)}
                    </strong>
                  </div>
                  <div>
                    {product.productPrice.toLocaleString()} 원 X
                    {product.productCount}
                  </div>
                  <div>
                    {!product.isAuction ? (
                      <Link href={`/product/${product.productId}`}>
                        {product.productName}
                      </Link>
                    ) : (
                      product.productName
                    )}
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
                  <strong>전체 금액</strong>
                  <span>{order.payment.totalPrice.toLocaleString()} 원</span>
                </div>
                <div className={style.infoDiv}>
                  <strong>배송비</strong>
                  <div>전통주점은 항상 무료 배송</div>
                </div>
                <div className={style.infoDiv}>
                  <strong>쿠폰 할인 </strong>
                  <span>
                    {order.payment.minusCouponAmount.toLocaleString()}
                  </span>
                </div>
                <div className={style.infoDiv}>
                  <strong>포인트 할인 </strong>
                  <span>{order.payment.minusPointAmount.toLocaleString()}</span>
                </div>
                <div className={style.infoDiv}>
                  <strong>실제 결제 금액 </strong>
                  <span> {order.payment.realPrice.toLocaleString()} 원</span>
                </div>
              </div>
            </div>
          </div>
          {order.payment.realPrice > 0 && !order.product[0].isAuction && (
            <div className={style.detailSection}>
              <div>
                <div className={style.detailHeader}>포인트 혜택</div>
              </div>
              <div className={style.infoCont}>
                <div className={style.infoDiv}>
                  <strong>구매 확정시 적립</strong>
                  <span>
                    {(isRegularPayment
                      ? Math.floor(order.payment.realPrice * 0.03)
                      : Math.floor(order.payment.realPrice * 0.01)
                    ).toLocaleString()}
                    원
                  </span>
                </div>
                <div className={style.infoDiv}>
                  <strong>리뷰 적립</strong>
                  <span>글: 300원 / 사진: 500원</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Image
          src={img}
          alt="jeontongju-notfound"
          width={0}
          height={0}
          style={{ cursor: "pointer", width: "100%", height: "100%" }}
        />
      )}
    </>
  );
}
