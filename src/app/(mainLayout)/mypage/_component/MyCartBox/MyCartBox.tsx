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
      <div>
        <div>
          <Image src={item.productThumbnailImageUrl} alt="img" />
        </div>
        <div>
          <div>{item.name}</div>
        </div>
      </div>
      <div>
        <div>{item.amount}</div>
        <div onClick={handleDeleteCartItem}>지우기</div>
      </div>
    </div>
  );
}
