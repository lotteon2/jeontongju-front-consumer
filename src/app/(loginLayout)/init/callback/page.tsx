"use client";
import loadingImg from "/public/loading.gif";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Callback = () => {
  const params = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    localStorage.setItem("accessToken", "Bearer " + params?.get("code"));
    localStorage.setItem("refreshToken", "Bearer " + params?.get("refresh"));
    router.replace("/");
  }, []);

  return (
    <>
      <Image
        src={loadingImg}
        width={0}
        height={0}
        alt="loading"
        style={{ cursor: "pointer", width: "50%", height: "50%" }}
      />
    </>
  );
};
export default Callback;
