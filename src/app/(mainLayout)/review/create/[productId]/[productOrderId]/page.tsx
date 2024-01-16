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
import { useRouter } from "next/navigation";
import { CONCEPT, ConceptOptions } from "@/constants/ConceptEnum";
import { Button, Select } from "antd";

type Props = {
  params: { productId: string; productOrderId: string };
};

export default function CreateReviewPage({ params }: Props) {
  const router = useRouter();
  const { productId, productOrderId } = params;
  const [product, setProduct] =
    useState<GetProductDetailByProductIdResponseData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
  const [reviewContents, setReviewContents] = useState<string>("");
  const [reviewPhotoImageUrl, setReviewPhotoImageUrl] = useState<string>("");
  const [concepts, setConcepts] = useState<(keyof typeof CONCEPT)[]>([]);

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
      setIsAddLoading(true);
      const data = await reviewAPI.addReview({
        productId,
        productOrderId: Number(productOrderId),
        reviewContents,
        reviewPhotoImageUrl,
        concept: concepts,
      });
      if (data.code === 200) {
        if(data.failure === "NOT_ORDER_CONFIRM"){
          toast("주문 확정을 먼저 진행해주세요.")
          return;
        }
        toast("구매 후기 등록에 성공했어요.");
        router.replace("/mypage");
      }
    } catch (error) {
      toast("구매 후기 등록에 실패했어요");
    } finally {
      setIsLoading(false);
    }
  };

  const isDisableToAddReview = () => {
    if (!reviewContents || !concepts) return true;
    return false;
  };

  useEffect(() => {
    getProductDetail();
  }, [productId]);

  return (
    <div className={style.addReviewPage}>
      <div> ❗️ 리뷰 작성시 삭제, 수정이 되지 않아요.</div>
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
          <div>🍶 다른 고객분들을 위해 사진을 첨부해주세요.</div>
          <div>사진 리뷰는 500원, 글 리뷰는 300원이 적립되어요.</div>
          <ImageUploader
            imageUrl={reviewPhotoImageUrl}
            setImageUrl={setReviewPhotoImageUrl}
          />
          <div>
            👥 다른 고객분들을 위해 이 술과 잘 어울리는 컨셉을 선택해주세요.
          </div>
          <Select
            mode="multiple"
            placeholder="잘 어울리는 컨셉"
            options={ConceptOptions}
            onChange={setConcepts}
            style={{ width: "100%" }}
            value={concepts}
            allowClear
          />
          <Button
            className={style.button}
            onClick={handleAddReview}
            disabled={isDisableToAddReview()}
            loading={isAddLoading}
          >
            저장
          </Button>
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
