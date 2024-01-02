import { Dispatch, SetStateAction } from "react";
import style from "@/app/(mainLayout)/mypage/_component/MyAddressAddBox/MyAddressAddBox.module.css";
type Props = {
  recipientName: string;
  setRecipientName: Dispatch<SetStateAction<string>>;
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  isDefault: boolean;
  setIsDefault: Dispatch<SetStateAction<boolean>>;
  addAddress: () => Promise<void>;
};
export default function MyAddressAddBox({
  recipientName,
  setRecipientName,
  phoneNumber,
  setPhoneNumber,
  isDefault,
  setIsDefault,
  addAddress,
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
      <div>
        <label id="isDefault">기본 배송지로 선택</label>
        <input
          type="checkbox"
          id="isDefault"
          onChange={(e) => setIsDefault(e.target.checked ? true : false)}
          checked={isDefault}
        />
      </div>
      <div onClick={addAddress}>저장</div>
    </div>
  );
}
