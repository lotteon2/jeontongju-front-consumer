"use client";
import adultValidImg from "/public/adultValid.png";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import style from "@/app/(loginLayout)/init/signup/signup.module.css";
import { ChangeEventHandler, useState } from "react";
import Image from "next/image";
import authAPI from "@/apis/authentication/authenticationAPIService";
import Script from "next/script";

export default function SignUp() {
  const [isCheckedEmail, setIsCheckedEmail] = useState<boolean>(false);
  const [isClickedCheckEmail, setIsClickedCheckEmail] =
    useState<boolean>(false);
  const [isAbleToMerge, setIsAbleToMerge] = useState<boolean>(false);
  const [authCode, setAuthcode] = useState<string>("");

  const [code, setCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [imp_uid, setImpUid] = useState<string>("");
  const [isMerge, setIsMerge] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");

  const checkEmail = async () => {
    try {
      const data = await authAPI.checkEmail({ email });
      if (data.code === 200) {
        setAuthcode(data.data.authCode);
        console.log("이메일 발송 완료");
        setIsClickedCheckEmail(true);
        if (data.failure === "DUPLICATED-EMAIL") {
          setIsAbleToMerge(true);
        }
      }
    } catch (error) {
      console.error("이메일 메일 발송 실패");
    }
  };

  const checkAuthcode = async () => {
    if (code === authCode) setIsCheckedEmail(true);
    else {
      setIsCheckedEmail(false);
    }
  };

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e: any) => {
    setEmail(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e: any) => {
    setPassword(e.target.value);
  };

  const onChangeCheckPassword: ChangeEventHandler<HTMLInputElement> = (
    e: any
  ) => {
    setCheckPassword(e.target.value);
  };

  const onChangeCode: ChangeEventHandler<HTMLInputElement> = (e: any) => {
    setCode(e.target.value);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await authAPI.signUp({
        email,
        password,
        imp_uid,
        isMerge,
      });
      if (data.code === 200) {
        console.log("회원가입 성공");
      } else {
        setMessage("아이디와 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("회원가입 실패");
      setMessage("아이디와 비밀번호가 일치하지 않습니다.");
    }
  };

  const callback = (response: any) => {
    const { success, error_msg: errorMsg, imp_uid: responseImpUid } = response;

    if (success) {
      console.log(response);
      setImpUid(responseImpUid);
      //   Toast(true, "성인인증이 완료되었습니다");
    } else {
      //   Toast(false, errorMsg)
    }
  };

  const handleAdultValid = async () => {
    if (!window.IMP) return;
    console.log(window);
    const { IMP } = window;
    IMP.init(process.env.NEXT_PUBLIC_INICIS);
    const data = {
      pg: "inicis_unified",
      popup: true,
    };

    IMP.certification(data, callback);
  };

  return (
    <>
      <div>
        <Script
          src="https://code.jquery.com/jquery-1.12.4.min.js"
          strategy="beforeInteractive"
          async
        />
        <Script
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
          strategy="beforeInteractive"
          async
        />
        <form onSubmit={onSubmit}>
          <div className={style.modalBody}>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="email">
                이메일
              </label>
              <input
                id="email"
                className={style.input}
                value={email}
                onChange={onChangeEmail}
                type="text"
                placeholder=""
              />
              <button type="button" disabled={!email} onClick={checkEmail}>
                {isCheckedEmail ? "인증완료" : "인증하기"}
              </button>
            </div>
            {authCode && (
              <div className={style.inputDiv}>
                <label className={style.inputLabel}>유효 코드</label>
                <input
                  id="code"
                  className={style.input}
                  value={code}
                  onChange={onChangeCode}
                  type="text"
                  placeholder=""
                />
                <button type="button" disabled={!email} onClick={checkAuthcode}>
                  {isCheckedEmail ? "인증완료" : "인증하기"}
                </button>
              </div>
            )}
            {isAbleToMerge && (
              <>
                <input
                  type="radio"
                  value="true"
                  checked={isMerge === true}
                  name="isMerge"
                  onChange={(e) => setIsMerge(e.target.value === "true")}
                >
                  공개
                </input>
                <input
                  type="radio"
                  value="false"
                  checked={isMerge === false}
                  name="isMerge"
                  onChange={(e) => setIsMerge(e.target.value === "true")}
                >
                  비공개
                </input>
              </>
            )}
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="password">
                비밀번호
              </label>
              <input
                id="password"
                className={style.input}
                value={password}
                onChange={onChangePassword}
                type="password"
                placeholder="비밀번호를 입력해주세요"
              />
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="checkPassword">
                비밀번호 확인
              </label>
              <input
                id="checkPassword"
                className={style.input}
                value={checkPassword}
                onChange={onChangeCheckPassword}
                type="password"
                placeholder="비밀번호를 한 번 더 입력해주세요"
              />
            </div>
          </div>
          <div className={style.message}>{message}</div>
          <Image
            alt="adultValidImg"
            width={0}
            height={0}
            src={adultValidImg}
            preview={false}
            style={{ cursor: "pointer", width: "100%", height: "auto" }}
            onClick={handleAdultValid}
          />
          <div className={style.modalFooter}>
            <button
              className={style.actionButton}
              disabled={
                !isCheckedEmail ||
                (!email && password !== checkPassword) ||
                !imp_uid
              }
            >
              회원가입하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
