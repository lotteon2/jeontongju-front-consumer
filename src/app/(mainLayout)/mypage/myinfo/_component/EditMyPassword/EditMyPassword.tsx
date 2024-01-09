import authAPI from "@/apis/authentication/authenticationAPIService";
import { Button, Input } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import style from "@/app/(mainLayout)/mypage/myinfo/myinfo.module.css";
import ImageUploader from "@/app/_component/ImageUploader";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/_component/Loading/Loading";

export default function EditMyPassword() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [checkNewPassword, setCheckNewPassword] = useState<string>("");
  const [originalPassword, setOriginalPassword] = useState<string>("");
  const [isAbleToUpdatePassword, setIsAbleToPassword] =
    useState<boolean>(false);

  const { data: myInfo, isLoading } = useQuery({
    queryKey: ["consumer", "myinfo"],
    queryFn: () => consumerAPI.getMyInfoForStore(),
  });

  const checkIsAuth = async () => {
    try {
      const data = await authAPI.checkMyPasswordIsAuth(originalPassword);
      if (data.code === 200) {
        toast("본인 확인이 완료되었어요!");
        setIsAuth(true);
      }
    } catch (error) {
      toast("비밀번호가 일치하지않아요.");
    }
  };

  const handleChangePassword = (e) => {
    if (e.keycode === 13) {
      checkIsAuth();
      return;
    }
    setOriginalPassword(e.target.value);
  };

  const handleUpdatePassword = async () => {
    try {
      const data = await authAPI.updateMyPasswordAfterLogin(newPassword);
      if (data.code === 200) {
        toast("비밀번호가 변경되었어요.");
      }
    } catch (error) {
      toast("비밀번호 변경에 실패했어요.");
    }
  };

  const handlePasswordIsSame = () => {
    if (newPassword === checkNewPassword) {
      setIsAbleToPassword(true);
      toast("비밀번호가 일치해요.");
    } else toast("비밀번호가 일치하지 않아요.");
  };

  return (
    <>
      <div className={style.editMyInfo}>
        {(isAuth && !myInfo?.data.isSocial) || myInfo?.data.isSocial ? (
          <div>
            <div className={style.checkPasswordInput}>
              <div>새로운 비밀번호를 입력해주세요</div>
              <Input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새로운 비밀번호"
                type="password"
              />
            </div>
            <div className={style.checkPasswordInput}>
              <div>새로운 비밀번호를 한 번 더입력해주세요</div>
              <Input
                value={checkNewPassword}
                onChange={(e) => setCheckNewPassword(e.target.value)}
                placeholder="새로운 비밀번호 확인"
                type="password"
              />
              <Button
                onClick={handlePasswordIsSame}
                disabled={
                  newPassword.length === 0 ||
                  checkNewPassword.length === 0 ||
                  isAbleToUpdatePassword
                }
              >
                확인
              </Button>
            </div>
            <div>
              {isAbleToUpdatePassword && (
                <Button onClick={handleUpdatePassword}>
                  비밀번호 변경하기
                </Button>
              )}
            </div>
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
              <Button onClick={checkIsAuth}>확인</Button>
            </div>
          </div>
        )}
      </div>
      {isLoading && <Loading />}
    </>
  );
}
