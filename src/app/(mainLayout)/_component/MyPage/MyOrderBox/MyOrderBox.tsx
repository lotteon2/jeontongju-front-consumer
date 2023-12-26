"use client";
import Link from "next/link";
import style from "@/app/(mainLayout)/_component/MyPage/MyOrderBox/MyOrderBox.module.css";
import Image from "next/image";
import { GetMyOrderListResponseData } from "@/apis/order/orderAPIService.types";
import { useRouter } from "next/navigation";
import orderAPI from "@/apis/order/orderAPIService";
import { toast } from "react-toastify";

export default function MyOrderBox({
  params,
}: {
  params: GetMyOrderListResponseData;
}) {
  const router = useRouter();
  console.log(params);

  //TODO : alert
  const handleCancelOrderByProductOrderId = async (productOrderId: number) => {
    try {
      const data = await orderAPI.cancelMyOrderByProductOrderId(productOrderId);
      if (data.code === 200) {
        toast("결제 취소에 성공했어요.");
      }
    } catch (error) {
      toast("결제 취소에 실패했어요");
    }
  };
  return (
    <div className={style.orderBox}>
      <div className={style.orderBoxHeader}>
        <div>{params.order?.orderDate.slice(0, 10)}</div>
        <div className={style.orderBoxHeaderRight}>
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
              <strong>{item.productOrderStatus}</strong>
              <div
                className={style.orderStatusBox}
                onClick={() =>
                  handleCancelOrderByProductOrderId(item.productOrderId)
                }
              >
                {item.productOrderStatus === "ORDER" && "취소하기"}
              </div>
            </div>
            <div>
              {item.productPrice} 원 X {item.productCount}
            </div>
            <Link href={`/product/${item.productId}`}>{item.productName}</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
