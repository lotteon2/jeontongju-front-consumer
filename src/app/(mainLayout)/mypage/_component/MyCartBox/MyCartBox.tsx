import wishAPI from "@/apis/wishCart/wishAPIService";
import { GetMyCartListResponseData } from "@/apis/wishCart/wishAPIService.types";
import Image from "next/image";
import { toast } from "react-toastify";
import style from "@/app/(mainLayout)/mypage/_component/MyCartBox/MyCartBox.module.css";

export default function MyCartBox({
  item,
  refetch,
}: {
  item: GetMyCartListResponseData;
  refetch: any;
}) {
  const handleDeleteCartItem = async () => {
    try {
      const data = await wishAPI.deleteCartItem(item.productId);
      if (data.code === 200) {
        toast("장바구니에서 삭제 되었어요.");
        refetch();
      }
    } catch (error) {}
  };

  return (
    <div className={style.myCartBox}>
      <div className={style.myCartBody}>
        <div style={{ width: "10rem", height: "10rem", position: "relative" }}>
          <Image
            src={item.productThumbnailImageUrl}
            alt="img"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div>
          <div className={style.productName}>{item.productName}</div>
          <div>{item.productPrice}</div>
        </div>
      </div>
      <div>
        <div>{item.amount}</div>
        <div onClick={handleDeleteCartItem}>지우기</div>
      </div>
    </div>
  );
}
