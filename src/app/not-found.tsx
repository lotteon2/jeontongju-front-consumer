"use client";
import { useRouter } from "next/navigation";
import not_found from "/public/not_found.mp4";
import { NextPage } from "next";

const NotFound: NextPage = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      style={{ width: "70vw", margin: "0 auto" }}
    >
      <video
        src={not_found}
        autoPlay={true}
        muted={true}
        loop={true}
        width={0}
        height={0}
        style={{
          width: "100%",
          height: "80%",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      />
    </div>
  );
};

export default NotFound;
