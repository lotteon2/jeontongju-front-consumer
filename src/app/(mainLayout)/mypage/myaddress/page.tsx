"use client";
import LoadingImg from "/public/loading.gif";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import Image from "next/image";
import { useEffect, useState } from "react";
import MyAddressBox from "../_component/MyAddressBox/MyAddressBox";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import MyAddressAddBox from "../_component/MyAddressAddBox/MyAddressAddBox";

export default function MyAddress() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data, refetch } = useQuery({
    queryKey: ["address", "list"],
    queryFn: () => consumerAPI.getMyAddressList(),
  });

  const [recipientName, setRecipientName] = useState<string>("");
  const [basicAddress, setBasicAddress] = useState<string>("");
  const [addressDetail, setAddressDetail] = useState<string>("");
  const [zonecode, setZonecode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isDefault, setIsDefault] = useState<boolean>(false);

  const getMyAddressList = async () => {
    try {
      setIsLoading(true);
      refetch();
    } catch (err) {
      toast("내 주소지 내역을 불러오는데 실패했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAddress = async () => {
    try {
      setIsLoading(true);
      const data = await consumerAPI.addMyAddress({
        isDefault,
        recipientPhoneNumber: phoneNumber,
        recipientName,
        zonecode,
        addressDetail,
        basicAddress,
      });
      if (data.code === 200) {
        toast("주소지가 추가되었어요.");
        refetch();
      }
    } catch (err) {
      toast("내 주소지를 추가하는데 실패했어요");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyAddressList();
  }, []);

  return (
    <div>
      {!isLoading ? (
        <div>
          {data?.data?.length > 0 ? (
            <div>
              {data?.data.map((it) => (
                <MyAddressBox key={it.addressId} item={it} />
              ))}
            </div>
          ) : (
            <div>주소가 없어요</div>
          )}
          <MyAddressAddBox
            setRecipientName={setRecipientName}
            recipientName={recipientName}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            isDefault={isDefault}
            setIsDefault={setIsDefault}
            addAddress={handleAddAddress}
            basicAddress={basicAddress}
            setBasicAddress={setBasicAddress}
            zonecode={zonecode}
            setZonecode={setZonecode}
            addressDetail={addressDetail}
            setAddressDetail={setAddressDetail}
          />
        </div>
      ) : (
        <Image
          src={LoadingImg}
          alt="jeontongju-notfound"
          width={0}
          height={0}
          style={{ cursor: "pointer", width: "80%", height: "80%" }}
        />
      )}
    </div>
  );
}
