"use client";
import KaKaoImg from "/public/kakao_login_medium_wide.png";
import googleImg from "/public/google_login_medium_wide.png";
import { ChangeEventHandler, useState } from "react";
import style from "@/app/(loginLayout)/init/signin/signin.module.css";
import authAPI from "@/apis/authentication/authenticationAPIService";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await authAPI.signIn({ email, password });
      if (data.code === 200) {
        console.log("로그인 성공");
      } else {
        setMessage("아이디와 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 실패");
      setMessage("아이디와 비밀번호가 일치하지 않습니다.");
    }
  };

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const handleKakaoLogin = (e: any) => {
    e.preventDefault();
    console.log(e);
    console.log(window.kakao);
    if (window.Kakao) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
      console.log(window.Kakao.isInitialized());
      window.location.href =
        "https://jeontongju-dev.shop/authentication-service/oauth2/authorization/kakao";
    }
  };

  const handleGoogleLogin = (e: any) => {
    e.preventDefault();
    console.log(e);
    window.location.href =
      "https://accounts.google.com/o/oauth2/auth?" +
      "client_id=239926923495-3v7i8t922da18fc2ftjrgt29acp1asr5.apps.googleusercontent.com&" +
      "redirect_uri=https://jeontongju-dev.shop/authentication-service/login/oauth2/code/google&" +
      "response_type=token&" +
      "scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
  };

  return (
    <>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" async></Script>
      <div className={style.signInContainer}>
        <form onSubmit={onSubmit}>
          <div className={style.modalBody}>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="email">
                아이디
              </label>
              <input
                id="email"
                className={style.input}
                value={email}
                onChange={onChangeEmail}
                type="text"
                placeholder=""
              />
            </div>
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
                placeholder=""
              />
            </div>
          </div>
          <div className={style.message}>{message}</div>
          <div className={style.modalFooter}>
            <button
              className={style.actionButton}
              disabled={!email && !password}
            >
              로그인하기
            </button>
            <Image
              alt="kakao"
              width={0}
              height={0}
              src={KaKaoImg}
              style={{ cursor: "pointer", width: "100%", height: "auto" }}
              onClick={handleKakaoLogin}
            />
            <Image
              alt="kakao"
              width={0}
              height={0}
              src={googleImg}
              style={{ cursor: "pointer", width: "100%", height: "auto" }}
              onClick={handleGoogleLogin}
            />
          </div>
        </form>
        <div>
          <>
            <Link href="/init/findMyPassword">비밀번호 찾기</Link> |
          </>
          <>
            <Link href="/init/signup"> 계정 만들기</Link>
          </>
        </div>
      </div>
    </>
  );
}
