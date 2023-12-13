"use client";
import { ChangeEventHandler, useState } from "react";
import style from "./findMyPassword.module.css";
import authAPI from "@/apis/authentication/authenticationAPIService";
export default function FindMyPassword() {
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
      const data = await authAPI.checkMyEmail(email);
      if (data.code === 200) {
        setAuthcode(data.data.authCode);
      }
    } catch (err) {
      console.error(err);
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
        // navigate("/init/login");
      }
    }
  };

  return (
    <div>
      <div>
        <div className={style.modalBody}>
          <div className={style.inputDiv}>
            <label className={style.inputLabel} htmlFor="email">
              회원가입 당시 사용했던 이메일을 입력해주세요
            </label>
            <input
              id="email"
              className={style.input}
              value={email}
              onChange={onChangeEmail}
              type="text"
              placeholder=""
            />
            <button disabled={!email} onClick={onSubmitEmail}></button>
          </div>
          {authCode && (
            <>
              <span>이메일로 새로 생성된 비밀번호를 발송했어요.</span>
              <label className={style.inputLabel} htmlFor="email">
                유효코드
              </label>
              <input
                id="inputAuthCode"
                className={style.input}
                value={inputAuthCode}
                onChange={onChangeInputAuthCode}
                type="text"
                placeholder=""
              />
              <button
                disabled={authUser !== false && authCode !== null}
                onClick={onSubmitAuthCode}
                type="button"
              />
            </>
          )}
        </div>
        {authCode && authUser && (
          <>
            <span>새로운 비밀번호를 입력해주세요.</span>
            <label className={style.inputLabel} htmlFor="email">
              새로운 비밀번호
            </label>
            <input
              id="newPassword"
              className={style.input}
              value={newPassword}
              onChange={onChangeNewPassword}
              type="text"
              placeholder=""
            />
            <button
              disabled={!newPassword}
              onClick={onSubmitNewPassword}
              type="button"
            />
          </>
        )}
      </div>
    </div>
  );
}
