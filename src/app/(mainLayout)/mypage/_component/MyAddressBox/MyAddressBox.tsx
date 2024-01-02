import FiSrCoffee from "/public/fi-sr-coffee.svg";
import FiSrPencil from "/public/fi-sr-pencil.svg";
import { GetMyCartListResponseData } from "@/apis/wishCart/wishAPIService.types";
import Image from "next/image";
import { toast } from "react-toastify";
import style from "@/app/(mainLayout)/mypage/_component/MyAddressBox/MyAddressBox.module.css";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import { GetMyAddressListResponseData } from "@/apis/consumer/consumerAPIservice.types";

export default function MyAddressBox({
  item,
  refetch,
}: {
  item: GetMyAddressListResponseData;
  refetch: any;
}) {
  // TODO : alert
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
      <div className={style.addressButtons}>
        <Image
          alt="수정"
          width={0}
          height={0}
          src={FiSrPencil}
          style={{
            cursor: "pointer",
            width: "1rem",
            height: "1rem",
            position: "relative",
          }}
          onClick={handleDeleteAddress}
        />
        <Image
          alt="삭제"
          width={0}
          height={0}
          src={FiSrCoffee}
          style={{
            cursor: "pointer",
            width: "1rem",
            height: "1rem",
            position: "relative",
          }}
          onClick={handleDeleteAddress}
        />
      </div>
      <h2>{item.recipientName}</h2>
      {item.isDefault && <div className={style.isDefault}>기본 배송지</div>}
      <div className={style.desc}>
        <div>{item.zonecode}</div>
        <div>{item.basicAddress}</div>
        <div>{item.addressDetail}</div>
        <div>{item.recipientPhoneNumber}</div>
      </div>
    </div>
  );
}
