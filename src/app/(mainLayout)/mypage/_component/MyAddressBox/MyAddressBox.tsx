"use client";
import FiSrCoffee from "/public/fi-sr-coffee.svg";
import FiSrPencil from "/public/fi-sr-pencil.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import style from "@/app/(mainLayout)/mypage/_component/MyAddressBox/MyAddressBox.module.css";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import { GetMyAddressListResponseData } from "@/apis/consumer/consumerAPIservice.types";
import { useState } from "react";
import AddressSearch from "@/app/_component/AddressSearch";
import { Alert } from "@/app/_component/Alert";

export default function MyAddressBox({
  item,
  refetch,
}: {
  item: GetMyAddressListResponseData;
  refetch: any;
}) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [recipientName, setRecipientName] = useState<string>(
    item.recipientName
  );
  const [basicAddress, setBasicAddress] = useState<string>(item.basicAddress);
  const [addressDetail, setAddressDetail] = useState<string>(
    item.addressDetail
  );
  const [zonecode, setZonecode] = useState<string>(item.zonecode);
  const [phoneNumber, setPhoneNumber] = useState<string>(
    item.recipientPhoneNumber
  );
  const [isDefault, setIsDefault] = useState<boolean>(item.isDefault);

  const handleDeleteAddress = async () => {
    try {
      const data = await consumerAPI.deleteMyAddressByAddressId(item.addressId);
      if (data.code === 200) {
        toast("주소지가 삭제 되었어요.");
        refetch();
      }
    } catch (error) {}
  };

  const handleDeleteAddressAlert = async () => {
    try {
      Alert({
        title: "정말로 주소지를 삭제하시겠어요?",
        text: "삭제시 철회할 수 없어요.",
        submitBtnText: "삭제하기",
      }).then((res) => {
        if (res.isConfirmed) handleDeleteAddress();
      });
    } catch (err) {
      toast("주소지 삭제에 실패했어요.");
    }
  };

  const handleEditAddress = async () => {
    try {
      const data = await consumerAPI.editMyAddress(item.addressId, {
        isDefault,
        recipientPhoneNumber: phoneNumber,
        recipientName,
        zonecode,
        addressDetail,
        basicAddress,
      });
      if (data.code === 200) {
        toast("주소지가 수정 되었어요.");
        setIsEdit(false);
        refetch();
      }
    } catch (err) {}
  };

  return (
    <div className={style.myAddressBox}>
      {!isEdit ? (
        <div className={style.addressButtons}>
          <Image
            alt="수정"
            width={20}
            height={20}
            src={FiSrPencil}
            style={{
              cursor: "pointer",
              width: "1rem",
              height: "1rem",
              position: "relative",
            }}
            onClick={() => setIsEdit(true)}
          />
          <Image
            alt="삭제"
            width={10}
            height={10}
            src={FiSrCoffee}
            style={{
              cursor: "pointer",
              width: "1rem",
              height: "1rem",
              position: "relative",
            }}
            onClick={handleDeleteAddressAlert}
          />
        </div>
      ) : (
        <div className={style.addressButtons} onClick={handleEditAddress}>
          저장
        </div>
      )}

      {isEdit ? (
        <>
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
        </>
      ) : (
        <>
          <h2>{item.recipientName}</h2>
          {item.isDefault && <div className={style.isDefault}>기본 배송지</div>}
          <div className={style.desc}>
            <div>{item.zonecode}</div>
            <div>{item.basicAddress}</div>
            <div>{item.addressDetail}</div>
            <div>{item.recipientPhoneNumber}</div>
          </div>
        </>
      )}
    </div>
  );
}
