"use client";
import loadingImg from "/public/loading.gif";
import Link from "next/link";
import style from "@/app/(mainLayout)/mypage/_component/MyOrderBox/MyOrderBox.module.css";
import Image from "next/image";
import { GetMyOrderListResponseData } from "@/apis/order/orderAPIService.types";
import { useRouter } from "next/navigation";
import orderAPI from "@/apis/order/orderAPIService";
import { toast } from "react-toastify";
import { useState } from "react";
import { ORDER_STATE, translateOrderState } from "@/constants/OrderStatusEnum";
import { Alert } from "@/app/_component/Alert";

export default function MyOrderBox({
  params,
  refetch,
}: {
  params: GetMyOrderListResponseData;
  refetch: () => void;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCancelOrderByProductOrderIdAlert = async (
    productOrderId: number
  ) => {
    try {
      Alert({
        title: "정말로 결제를 취소하시겠어요?",
        text: "취소시 철회할 수 없어요.",
        submitBtnText: "취소하기",
      }).then((res) => {
        if (res.isConfirmed) handleCancelOrderByProductOrderId(productOrderId);
      });
    } catch (err) {
      toast("결제 취소에 실패했어요.");
    }
  };

  const handleCancelOrderByProductOrderId = async (productOrderId: number) => {
    try {
      setIsLoading(true);
      const data = await orderAPI.cancelMyOrderByProductOrderId(productOrderId);
      if (data.code === 200) {
        toast("결제 취소에 성공했어요.");
        refetch();
      }
    } catch (error) {
      toast("결제 취소에 실패했어요");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelOrderByOrdersIdAlert = async (ordersId: string) => {
    try {
      Alert({
        title: "정말로 주문을 취소하시겠어요?",
        text: "취소시 철회할 수 없어요.",
        submitBtnText: "취소하기",
      }).then((res) => {
        if (res.isConfirmed) handleCancelOrderByOrdersId(ordersId);
      });
    } catch (err) {
      toast("주문 취소에 실패했어요.");
    }
  };

  const handleCancelOrderByOrdersId = async (ordersId: string) => {
    try {
      setIsLoading(true);
      const data = await orderAPI.cancelMyOrderByOrderId(ordersId);
      if (data.code === 200) {
        toast("주문 취소에 성공했어요.");
        refetch();
      }
    } catch (error) {
      toast("주문 취소에 실패했어요");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmOrderByProductOrderIdAlert = async (
    productOrderId: number
  ) => {
    try {
      Alert({
        title: "정말로 주문을 확정하시겠어요?",
        text: "확정시 철회할 수 없어요.",
        submitBtnText: "확정하기",
      }).then((res) => {
        if (res.isConfirmed) handleConfirmOrderByProductOrderId(productOrderId);
      });
    } catch (err) {
      toast("주문 확정에 실패했어요.");
    }
  };

  const handleConfirmOrderByProductOrderId = async (productOrderId: number) => {
    try {
      setIsLoading(true);
      const data = await orderAPI.confirmMyOrderByOrderId(productOrderId);
      if (data.code === 200) {
        toast("주문 확정에 성공했어요.");
        refetch();
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
                      handleCancelOrderByOrdersIdAlert(params.order?.ordersId)
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
                  style={{
                    cursor: item.isAuction ? 'none': 'pointer'
                  }}
                />
              </Link>
              <div className={style.orderDetail}>
                <div className={style.orderStatusContainer}>
                  <strong>
                    {translateOrderState(item.productOrderStatus)}
                  </strong>

                  {!item.isAuction &&
                    item.productOrderStatus === ORDER_STATE.ORDER && (
                      <div
                        className={style.orderStatusBox}
                        onClick={() =>
                          handleCancelOrderByProductOrderIdAlert(
                            item.productOrderId
                          )
                        }
                      >
                        취소하기
                      </div>
                    )}
                  {item.isReviewAllowed && (
                    <div
                      className={style.orderStatusBox}
                      onClick={() =>
                        router.push(
                          `/review/create/${item.productId}/${item.productOrderId}`
                        )
                      }
                    >
                      리뷰 적기
                    </div>
                  )}
                </div>
                {item.isConfirmAllowed &&
                  item.productOrderStatus === ORDER_STATE.COMPLETED && (
                    <div
                      className={style.orderStatusBox}
                      onClick={() =>
                        handleConfirmOrderByProductOrderIdAlert(
                          item.productOrderId
                        )
                      }
                    >
                      주문 확정하기
                    </div>
                  )}
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
