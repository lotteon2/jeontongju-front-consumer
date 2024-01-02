"use client";
import LoadingImg from "/public/loading.gif";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import Image from "next/image";
import { GetMyAddressListResponseData } from "@/apis/consumer/consumerAPIservice.types";
import { useEffect, useState } from "react";
import MyAddressBox from "../_component/MyAddressBox/MyAddressBox";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function MyAddress() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data, refetch } = useQuery({
    queryKey: ["address", "list"],
    queryFn: () => consumerAPI.getMyAddressList(),
  });

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

  useEffect(() => {
    getMyAddressList();
  }, []);

  return (
    <div>
      {!isLoading ? (
        data?.data?.length > 0 ? (
          <div>
            {data?.data.map((it) => (
              <MyAddressBox key={it.addressId} item={it} />
            ))}
          </div>
        ) : (
          <div>주소가 없어요</div>
        )
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
