import React, { useState, useRef, useCallback, useEffect } from "react";
import storageAPI from "@/apis/storage/storageAPIService";
import { toast } from "react-toastify";
import Image from "next/image";

type Props = {
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
};

const ImageUploader = ({ imageUrl, setImageUrl }: Props) => {
  const [imgSrc, setImgSrc] = useState<string>(imageUrl);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const uploadImgBtn = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChangeFile = async (event: any) => {
    event.preventDefault();
    const reader = new FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);
    try {
      const data = await storageAPI.uploadImage(event.target.files[0].name);
      console.log(data);
      if (data.code === 200) {
        setImageUrl(data.data.dataUrl);
        fetch(data.data.presignedUrl, {
          method: "PUT",
          headers: {
            Accept: "image/png",
            "Content-Type": "image/png",
          },
          body: reader.result,
        })
          .then((res) => {
            setImgSrc(data.data.dataUrl);
            return res.text();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      toast("이미지 업로드에 실패했어요");
    }
  };

  return (
    <button
      onClick={uploadImgBtn}
      type="button"
      style={{
        background: "none",
        width: "100%",
        height: "10rem",
        border: "none",
      }}
    >
      <input
        className="w-full h-full"
        type="file"
        name="image"
        accept="image/*"
        ref={inputRef}
        id="imgFile"
        onChange={handleChangeFile}
        style={{ display: "none" }}
      />
      {imgSrc ? (
        <Image
          style={{ width: "10rem", height: "10rem" }}
          src={imgSrc}
          alt="이미지"
        />
      ) : (
        <div>이미지를 등록해주세요</div>
      )}
    </button>
  );
};

export default ImageUploader;
