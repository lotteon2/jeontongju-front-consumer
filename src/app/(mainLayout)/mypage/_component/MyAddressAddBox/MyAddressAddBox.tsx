import { Dispatch, SetStateAction } from "react";
import style from "@/app/(mainLayout)/mypage/_component/MyAddressAddBox/MyAddressAddBox.module.css";
import AddressSearch from "@/app/_component/AddressSearch";
type Props = {
  recipientName: string;
  setRecipientName: Dispatch<SetStateAction<string>>;
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  isDefault: boolean;
  setIsDefault: Dispatch<SetStateAction<boolean>>;
  addAddress: () => Promise<void>;
  zonecode: string;
  setZonecode: Dispatch<SetStateAction<string>>;
  basicAddress: string;
  setBasicAddress: Dispatch<SetStateAction<string>>;
  addressDetail: string;
  setAddressDetail: Dispatch<SetStateAction<string>>;
};
export default function MyAddressAddBox({
  recipientName,
  setRecipientName,
  phoneNumber,
  setPhoneNumber,
  isDefault,
  setIsDefault,
  addAddress,
  zonecode,
  setZonecode,
  basicAddress,
  setBasicAddress,
  addressDetail,
  setAddressDetail,
}: Props) {
  return (
    <div className={style.myAddressBox}>
      <input
        className={style.input}
        placeholder="받는 사람"
        value={recipientName}
        onChange={(e) => setRecipientName(e.target.value)}
      />
      <input
        className={style.input}
        placeholder="휴대폰 번호"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <AddressSearch
        zonecode={zonecode}
        setZonecode={setZonecode}
        address={basicAddress}
        setAddress={setBasicAddress}
        addressDetail={addressDetail}
        setAddressDetail={setAddressDetail}
      />
      <div className={style.isDefault}>
        <input
          type="checkbox"
          id="isDefault"
          onChange={(e) => setIsDefault(e.target.checked ? true : false)}
          checked={isDefault}
        />
        <label id="isDefault">기본 배송지로 선택</label>
      </div>
      <div onClick={addAddress} className={style.addButton}>
        추가하기
      </div>
    </div>
  );
}
