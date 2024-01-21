"use client";
import adultValidImg from "/public/adultValid.png";
import style from "@/app/(loginLayout)/init/signup/signup.module.css";
import { ChangeEventHandler, useState } from "react";
import Image from "next/image";
import authAPI from "@/apis/authentication/authenticationAPIService";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SignUp() {
  const router = useRouter();

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
        if (data.failure === "DUPLICATED_EMAIL") {
          toast("이미 있는 아이디에요.");
          setIsClickedCheckEmail(true);
        } else {
          if (data.data.isSocial) {
            toast("소셜 회원가입이 되어있으므로 계정 통합이 진행돼요!");
          }
          setAuthcode(data.data.authCode);
          toast("해당 메일로 코드가 발송되었어요");
          console.log("이메일 발송 완료");
          setIsClickedCheckEmail(true);
        }
      }
    } catch (error) {
      console.error("이메일 메일 발송 실패");
    }
  };

  const checkAuthcode = async () => {
    if (code === authCode) {
      toast("인증되었어요.");
      setIsCheckedEmail(true);
    } else {
      toast("인증코드를 다시 확인해주세요.");
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
        impUid: imp_uid,
        isMerge,
      });
      if (data.code === 200) {
        console.log("회원가입 성공");
        router.push("/init/signin");
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
      toast("성인 인증이 완료되었어요.");
    } else {
      toast("성인 인증에 실패했어요.");
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
      <div className={style.signUpContainer}>
        <Script src="https://code.jquery.com/jquery-1.12.4.min.js" async />
        <Script
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
          async
        />
        <form onSubmit={onSubmit}>
          <div className={style.modalBody}>
            <div className={style.inputWrapper}>
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
                  placeholder="이메일을 입력해주세요"
                />
              </div>
              <button
                className={style.inputButton}
                type="button"
                disabled={!email}
                onClick={checkEmail}
              >
                {isCheckedEmail ? "인증완료" : "인증하기"}
              </button>
            </div>
            {authCode && (
              <div className={style.inputWrapper}>
                <div className={style.inputDiv}>
                  <label className={style.inputLabel} htmlFor="code">
                    유효 코드
                  </label>
                  <input
                    id="code"
                    className={style.input}
                    value={code}
                    onChange={onChangeCode}
                    placeholder="유효코드를 입력해주세요"
                  />
                </div>
                <button
                  className={style.inputButton}
                  type="button"
                  disabled={!email}
                  onClick={checkAuthcode}
                >
                  {isCheckedEmail ? "인증완료" : "인증하기"}
                </button>
              </div>
            )}
            {isAbleToMerge && <></>}
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
            width={100}
            height={100}
            placeholder="blur"
            src={adultValidImg}
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
