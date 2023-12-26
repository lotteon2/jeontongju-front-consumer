"use client";
import loadingImg from "/public/loading.gif";
import Link from "next/link";
import style from "@/app/(mainLayout)/_component/MyPage/MyOrderBox/MyOrderBox.module.css";
import Image from "next/image";
import { GetMyOrderListResponseData } from "@/apis/order/orderAPIService.types";
import { useRouter } from "next/navigation";
import orderAPI from "@/apis/order/orderAPIService";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  ORDER_STATE,
  ORDER_STATUS,
  translateOrderState,
} from "@/constants/OrderStatusEnum";

export default function MyOrderBox({
  params,
}: {
  params: GetMyOrderListResponseData;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(params);

  //TODO : alert
  const handleCancelOrderByProductOrderId = async (productOrderId: number) => {
    try {
      setIsLoading(true);
      const data = await orderAPI.cancelMyOrderByProductOrderId(productOrderId);
      if (data.code === 200) {
        toast("결제 취소에 성공했어요.");
      }
    } catch (error) {
      toast("결제 취소에 실패했어요");
    } finally {
      setIsLoading(false);
    }
  };

  //TODO : alert
  const handleCancelOrderByOrdersId = async (ordersId: string) => {
    try {
      setIsLoading(true);
      const data = await orderAPI.cancelMyOrderByOrderId(ordersId);
      if (data.code === 200) {
        toast("주문 취소에 성공했어요.");
      }
    } catch (error) {
      toast("주문 취소에 실패했어요");
    } finally {
      setIsLoading(false);
    }
  };

  //TODO : alert
  const handleConfirmOrderByProductOrderId = async (productOrderId: number) => {
    try {
      setIsLoading(true);
      const data = await orderAPI.confirmMyOrderByOrderId(productOrderId);
      if (data.code === 200) {
        toast("주문 확정에 성공했어요.");
      }
    } catch (error) {
      toast("주문 확정에 실패했어요");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isLoading ? (
        <div className={style.orderBox}>
          <div className={style.orderBoxHeader}>
            <div>{params.order?.orderDate.slice(0, 10)}</div>
            <div className={style.orderBoxHeaderRight}>
              <div>
                {params.order?.isAbleToCancel && (
                  <div
                    className={style.orderStatusBox}
                    onClick={() =>
                      handleCancelOrderByOrdersId(params.order?.ordersId)
                    }
                  >
                    주문 전체 취소하기
                  </div>
                )}
              </div>
              <div>{params.order?.orderStatus}</div>
              <Link
                href={{
                  pathname: `/orderdetail/${params.order.ordersId}`,
                  query: {
                    order: encodeURIComponent(JSON.stringify(params)),
                  },
                }}
              >
                상세 보기
              </Link>
            </div>
          </div>
          {params.product?.map((item) => (
            <div className={style.orderBoxBody} key={item.productOrderId}>
              <Link href={`/product/${item.productId}`}>
                <Image
                  src={item.productThumbnailImageUrl}
                  alt="img"
                  width={0}
                  height={0}
                  className={style.orderBoxImg}
                />
              </Link>
              <div className={style.orderDetail}>
                <div className={style.orderStatusContainer}>
                  <strong>
                    {translateOrderState(item.productOrderStatus)}
                  </strong>
                  <div
                    className={style.orderStatusBox}
                    onClick={() =>
                      handleCancelOrderByProductOrderId(item.productOrderId)
                    }
                  >
                    {item.productOrderStatus === ORDER_STATE.ORDER &&
                      "취소하기"}
                  </div>
                </div>
                <div
                  className={style.orderStatusBox}
                  onClick={() =>
                    handleConfirmOrderByProductOrderId(item.productOrderId)
                  }
                >
                  {item.productOrderStatus === ORDER_STATE.COMPLETED &&
                    "주문 확정하기"}
                </div>
                <div>
                  {item.productPrice} 원 X {item.productCount}
                </div>
                <Link href={`/product/${item.productId}`}>
                  {item.productName}
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Image
          src={loadingImg}
          width={0}
          height={0}
          alt="loading"
          style={{ cursor: "pointer", width: "50%", height: "50%" }}
        />
      )}
    </>
  );
}
