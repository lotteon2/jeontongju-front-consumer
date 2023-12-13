"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Callback = () => {
  const params = useSearchParams();
  const router = useRouter();
  // const { query } = router;
  // const { code } = query;
  console.log(params?.get("code"));
  localStorage.setItem("accessToken", params?.get("code"));
  router.push("/main");

  return <>CALLBACK {params?.get("code")}</>;
};
export default Callback;
