"use client";
import loadingImg from "/public/loading.gif";
import Image from "next/image";
import { ChangeEventHandler, useState } from "react";
import style from "@/app/(loginLayout)/init/findMyPassword/findMyPassword.module.css";
import authAPI from "@/apis/authentication/authenticationAPIService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function FindMyPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [authCode, setAuthcode] = useState<string>("");
  const [inputAuthCode, setInputAuthCode] = useState<string>("");
  const [authUser, setAuthUser] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const onChangeNewPassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewPassword(e.target.value);
  };

  const onChangeInputAuthCode: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputAuthCode(e.target.value);
  };

  const onSubmitEmail = async () => {
    try {
      setIsLoading(true);
      const data = await authAPI.checkMyEmail(email);
      if (data.code === 200) {
        setAuthcode(data.data.authCode);
      } else {
        toast("존재하지 않는 회원이에요");
      }
    } catch (err) {
      console.error(err);
      toast("존재하지 않는 회원이에요");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitAuthCode = () => {
    if (inputAuthCode === authCode) {
      setAuthUser(true);
    } else {
      setAuthUser(false);
    }
  };

  const onSubmitNewPassword = async () => {
    if (!passwordRegex.test(newPassword)) {
      console.error(
        "영문, 숫자, 특수문자를 모두 포함하여 8자이상 16자 이내로 입력해주세요."
      );
    } else {
      const params = {
        email,
        newPassword,
      };
      const result = await authAPI.updateMyPasswordBeforeLogin(params);
      if (result.code === 200) {
        console.log(true, "비밀번호가 변경되었어요.");
        router.replace("/init/signin");
      }
    }
  };

  return !isLoading ? (
    <div className={style.findMyPasswordContainer}>
      <div className={style.inputWrapper}>
        <div className={style.inputDiv}>
          <label className={style.inputLabel} htmlFor="email">
            이메일을 입력해주세요
          </label>
          <input
            id="email"
            className={style.input}
            value={email}
            onChange={onChangeEmail}
            type="text"
            placeholder="이메일"
          />
        </div>
        <button
          className={style.inputButton}
          type="button"
          disabled={!email}
          onClick={onSubmitEmail}
        >
          발송
        </button>
      </div>
      {authCode && (
        <>
          <span>이메일로 새로 생성된 비밀번호를 발송했어요.</span>
          <div className={style.inputWrapper}>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="inputAuthCode">
                유효코드
              </label>
              <input
                id="inputAuthCode"
                className={style.input}
                value={inputAuthCode}
                onChange={onChangeInputAuthCode}
                type="text"
                placeholder="유효코드"
              />
            </div>
            <button
              className={style.inputButton}
              disabled={authUser !== false && authCode !== null}
              onClick={onSubmitAuthCode}
              type="button"
            >
              인증
            </button>
          </div>
        </>
      )}
      {authCode && authUser && (
        <>
          <span>새로운 비밀번호를 입력해주세요.</span>
          <div className={style.inputWrapper}>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="newPassword">
                새로운 비밀번호
              </label>
              <input
                id="newPassword"
                className={style.input}
                value={newPassword}
                onChange={onChangeNewPassword}
                type="password"
                placeholder="새로운 비밀번호"
              />
            </div>
            <button
              className={style.inputButton}
              disabled={!newPassword}
              onClick={onSubmitNewPassword}
              type="button"
            />
          </div>
        </>
      )}
    </div>
  ) : (
    <Image
      src={loadingImg}
      width={1000}
      height={1000}
      alt="loading"
      style={{ width: "50%", height: "50%", margin: "auto" }}
    />
  );
}
