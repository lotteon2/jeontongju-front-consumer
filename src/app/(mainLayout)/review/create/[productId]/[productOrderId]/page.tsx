"use client";
import LoadingImg from "/public/loading.gif";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GetProductDetailByProductIdResponseData } from "@/apis/search/searchAPIService.types";
import searchAPI from "@/apis/search/searchAPIService";
import { toast } from "react-toastify";
import reviewAPI from "@/apis/review/reviewAPIService";
import style from "@/app/(mainLayout)/review/create/[productId]/[productOrderId]/page.module.css";
import ImageUploader from "@/app/_component/ImageUploader";

type Props = {
  params: { productId: string; productOrderId: string };
};

export default function CreateReviewPage({ params }: Props) {
  const { productId, productOrderId } = params;
  const [product, setProduct] =
    useState<GetProductDetailByProductIdResponseData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reviewContents, setReviewContents] = useState<string>("");
  const [reviewPhotoImageUrl, setReviewPhotoImageUrl] = useState<string>("");
  const [concept, setConcept] = useState<string[]>(["TRIP"]);

  const getProductDetail = async () => {
    try {
      setIsLoading(true);
      const data = await searchAPI.getProductDetailByProductId(productId);
      if (data.code === 200) {
        setProduct(data.data);
      }
    } catch (error) {
      toast("잘못된 접근이에요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddReview = async () => {
    try {
      const data = await reviewAPI.addReview({
        productId,
        productOrderId: Number(productOrderId),
        reviewContents,
        reviewPhotoImageUrl,
        concept,
      });
      if (data.code === 200) {
        toast("구매 후기 등록에 성공했어요.");
      }
    } catch (error) {
      toast("구매 후기 등록에 실패했어요");
    }
  };

  const isDisableToAddReview = () => {
    if (!reviewContents || !reviewPhotoImageUrl || !concept) return true;
    return false;
  };

  useEffect(() => {
    getProductDetail();
  }, [productId]);

  return (
    <div className={style.addReviewPage}>
      {!isLoading ? (
        <>
          <div className={style.productName}>{product?.productName}</div>
          <div>{product?.productDescription}</div>
          <textarea
            className={style.input}
            value={reviewContents}
            onChange={(e) => setReviewContents(e.target.value)}
            placeholder="리뷰내용"
          />
          <ImageUploader
            imageUrl={reviewPhotoImageUrl}
            setImageUrl={setReviewPhotoImageUrl}
          />
          <button
            className={style.button}
            onClick={handleAddReview}
            disabled={isDisableToAddReview()}
          >
            저장
          </button>
        </>
      ) : (
        <Image
          src={LoadingImg}
          alt="loading"
          width={0}
          height={0}
          style={{ cursor: "pointer", width: "80%", height: "80%" }}
        />
      )}
    </div>
  );
}
