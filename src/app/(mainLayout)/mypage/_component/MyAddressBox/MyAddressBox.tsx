import wishAPI from "@/apis/wishCart/wishAPIService";
import { GetMyCartListResponseData } from "@/apis/wishCart/wishAPIService.types";
import Image from "next/image";
import { toast } from "react-toastify";
import style from "@/app/(mainLayout)/mypage/_component/MyCartBox/MyCartBox.module.css";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import { GetMyAddressListResponseData } from "@/apis/consumer/consumerAPIservice.types";

export default function MyAddressBox({
  item,
  refetch,
}: {
  item: GetMyAddressListResponseData;
  refetch: any;
}) {
  const handleDeleteAddress = async () => {
    try {
      const data = await consumerAPI.deleteMyAddressByAddressId(item.addressId);
      if (data.code === 200) {
        toast("주소지가 삭제 되었어요.");
        refetch();
      }
    } catch (error) {}
  };

  return (
    <div className={style.myAddressBox}>
      <h2>{item.recipientName}</h2>
      {item.isDefault && <div>기본 배송지</div>}
      <div className={style.myAddressBox}>
        <div>
          <div className={style.productName}>{item.zonecode}</div>
          <div className={style.productName}>{item.basicAddress}</div>
          <div>{item.addressDetail}</div>
        </div>
        <div>{item.recipientPhoneNumber}</div>
      </div>
      <div>
        <div onClick={handleDeleteAddress}>수정</div>
        <div onClick={handleDeleteAddress}>지우기</div>
      </div>
    </div>
  );
}
