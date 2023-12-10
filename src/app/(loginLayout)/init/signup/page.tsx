"use client";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import style from '@/app/(loginLayout)/init/signup/signup.module.css'
import { ChangeEventHandler, useState } from "react";

export default function SignUp() {
    const [isCheckedEmail, setIsCheckedEmail] = useState<boolean>(false);
    const [isClickedCheckEmail, setIsClickedCheckEmail] = useState<boolean>(false);
    const [authCode, setAuthcode] = useState<string>(null);

    const [code, setCode] = useState<string>(null);
    const [email, setEmail] = useState<string>(null);
    const [password, setPassword] = useState<string>(null);
    const [imp_uid, setImpUid] = useState<string>(null);
    const [isMerge, setIsMerge] = useState<boolean>(false);

    const [message, setMessage] = useState<string>(null);


    const checkEmail = async () => {
        try {
            const data = await consumerAPI.checkEmail({ email });
            if (data.code === 200) {
                setAuthcode(data.data.authCode)
                console.log('이메일 발송 완료')
                setIsClickedCheckEmail(true);
            }
        } catch (error) {
            console.error('이메일 메일 발송 실패')
        }
    }

    const checkAuthcode = async () => {
        if (code === authCode) setIsCheckedEmail(true);
        else {
            setIsCheckedEmail(false);
        }
    }

    const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => { setEmail(e.target.value) };

    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    };

    const onChangeCode: ChangeEventHandler<HTMLInputElement> = (e) => {
        setCode(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await consumerAPI.signUp({ email, password, imp_uid, isMerge });
            if (data.code === 200) {
                console.log('회원가입 성공')
            }
            else {
                setMessage('아이디와 비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('회원가입 실패')
            setMessage('아이디와 비밀번호가 일치하지 않습니다.');
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className={style.modalBody}>
                    <div className={style.inputDiv}>
                        <label className={style.inputLabel} htmlFor="email">이메일</label>
                        <input id="email" className={style.input} value={email} onChange={onChangeEmail} type="text" placeholder="" />
                        <button type="button" disabled={!email} onClick={checkEmail}>{isCheckedEmail ? '인증완료' : '인증하기'}</button>
                    </div>
                    {
                        isCheckedEmail && <div className={style.inputDiv}>
                            <label className={style.inputLabel} htmlFor="email">유효 코드</label>
                            <input id="email" className={style.input} value={code} onChange={onChangeCode} type="text" placeholder="" />
                            <button disabled={!email} onClick={checkAuthcode}>{isCheckedEmail ? '인증완료' : '인증하기'}</button>
                        </div>
                    }

                    <div className={style.inputDiv}>
                        <label className={style.inputLabel} htmlFor="password">비밀번호</label>
                        <input id="password" className={style.input} value={password} onChange={onChangePassword} type="password" placeholder="" />
                    </div>
                </div>
                <div className={style.message}>{message}</div>
                <div className={style.modalFooter}>
                    <button className={style.actionButton} disabled={!email && !password && !imp_uid}>회원가입하기</button>
                </div>
            </form>
        </div>
    )
}