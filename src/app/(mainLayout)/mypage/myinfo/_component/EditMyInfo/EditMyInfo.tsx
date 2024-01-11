import authAPI from "@/apis/authentication/authenticationAPIService";
import { Button, Input } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import style from "@/app/(mainLayout)/mypage/myinfo/myinfo.module.css";
import ImageUploader from "@/app/_component/ImageUploader";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/_component/Loading/Loading";

export default function EditMyInfo() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [originalPassword, setOriginalPassword] = useState<string>("");
  const [isLoadingUploadImg, setIsLoadingUploadImg] = useState<boolean>(false);
  const [isLoadingUpdatePassword, setIsLoadingUpdatePassword] =
    useState<boolean>(false);
  const { data: myInfo, isLoading } = useQuery({
    queryKey: ["consumer", "myinfo"],
    queryFn: () => consumerAPI.getMyInfoForStore(),
  });

  const checkIsAuth = async () => {
    try {
      setIsLoadingUpdatePassword(true);
      const data = await authAPI.checkMyPasswordIsAuth(originalPassword);
      if (data.code === 200) {
        toast("본인 확인이 완료되었어요!");
        setIsAuth(true);
      }
    } catch (error) {
      toast("비밀번호가 일치하지않아요.");
    } finally {
      setIsLoadingUpdatePassword(false);
    }
  };

  const handleChangePassword = (e) => {
    if (e.keycode === 13) {
      checkIsAuth();
      return;
    }
    setOriginalPassword(e.target.value);
  };

  const handleUpdateMyProfileImg = async () => {
    try {
      setIsLoadingUploadImg(true);
      const data = await consumerAPI.editMyProfileImg(imageUrl);
      if (data.code === 200) {
        toast("이미지가 업로드되었어요");
      }
    } catch (err) {
      toast("이미지가 업로드에 실패했어요");
    } finally {
      setIsLoadingUploadImg(false);
    }
  };

  return (
    <>
      <div className={style.editMyInfo}>
        {(isAuth && !myInfo?.data.isSocial) || myInfo?.data.isSocial ? (
          <div>
            <ImageUploader
              imageUrl={imageUrl || myInfo?.data.profileImageUrl}
              setImageUrl={setImageUrl}
            />
            <Button
              onClick={handleUpdateMyProfileImg}
              disabled={!imageUrl}
              loading={isLoadingUploadImg}
            >
              저장
            </Button>
          </div>
        ) : (
          <div>
            <div>기존 비밀번호를 입력해주세요</div>
            <div className={style.checkPasswordInput}>
              <Input
                value={originalPassword}
                onChange={handleChangePassword}
                placeholder="기존 비밀번호"
                type="password"
              />
              <Button
                onClick={checkIsAuth}
                disabled={!originalPassword}
                loading={isLoadingUpdatePassword}
              >
                확인
              </Button>
            </div>
          </div>
        )}
      </div>
      {isLoading && <Loading />}
    </>
  );
}
