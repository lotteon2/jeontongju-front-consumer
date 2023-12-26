import { GetSellerListResponseData } from "@/apis/seller/sellerAPIService.types";
import Image from "next/image";
import style from "@/app/(mainLayout)/seller/_component/sellerList.module.css";
import { useRouter } from "next/navigation";

export default function Seller({
  seller,
}: {
  seller: GetSellerListResponseData;
}) {
  const router = useRouter();
  return (
    <div
      className={style.sellerBox}
      onClick={() => router.push(`/seller/${seller.sellerId}`)}
    >
      <Image
        alt="seller"
        src={
          seller.storeImageUrl ||
          "https://img.freepik.com/free-photo/concrete-background-cement-texture-with-blank-space_53876-129755.jpg"
        }
        width={100}
        height={100}
        style={{ borderRadius: "12px" }}
      />
      <div className={style.storeName}>{seller.storeName}</div>
      <div className={style.storeDescription}>
        {seller.storeDescription.length > 20
          ? seller.storeDescription.slice(0, 18) + "..."
          : seller.storeDescription}
      </div>
    </div>
  );
}
