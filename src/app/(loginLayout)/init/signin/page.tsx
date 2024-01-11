"use client";
import KaKaoImg from "/public/kakao_login_medium_wide.png";
import googleImg from "/public/google_login.png";
import { ChangeEventHandler, useEffect, useState } from "react";
import style from "@/app/(loginLayout)/init/signin/signin.module.css";
import authAPI from "@/apis/authentication/authenticationAPIService";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await authAPI.signIn({ email, password });
      if (data.code === 200) {
        localStorage.setItem("accessToken", data.data.accessToken);
        router.replace("/");
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
    window.location.href = `${process.env.NEXT_PUBLIC_API_END_POINT}/authentication-service/oauth2/authorization/kakao`;
  };

  const handleGoogleLogin = (e: any) => {
    e.preventDefault();
    console.log(e);
    window.location.href = `${process.env.NEXT_PUBLIC_API_END_POINT}/authentication-service/oauth2/authorization/google`;
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("accessToken")) {
        router.replace("/");
      }
    }
  }, []);

  return (
    <>
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
              style={{ cursor: "pointer", width: "100%", height: "50px" }}
              onClick={handleKakaoLogin}
            />
            <Image
              alt="google"
              width={0}
              height={0}
              src={googleImg}
              style={{ cursor: "pointer", width: "100%", height: "50px" }}
              onClick={handleGoogleLogin}
            />
          </div>
        </form>
        <div>
          <Link href="/init/findMyPassword">비밀번호 찾기</Link> |
          <Link href="/init/signup"> 계정 만들기</Link>
        </div>
      </div>
    </>
  );
}
