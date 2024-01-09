import authAPI from "@/apis/authentication/authenticationAPIService";
import { Alert } from "@/app/_component/Alert";
import { useMyInfoStore } from "@/app/store/myInfo/myInfo";
import { toast } from "react-toastify";
import style from "@/app/(mainLayout)/mypage/myinfo/myinfo.module.css";

export default function Withdraw() {
  const name = useMyInfoStore((state) => state.name);

  const handleWithDrawal = async () => {
    try {
      const data = await authAPI.withdrawal();
      if (data.code === 200) {
        toast("회원 탈퇴가 완료되었어요.");
        localStorage.removeItem("accessToken");
        router.replace("/init/signin");
      }
    } catch (error) {}
  };

  const handleWithDrawalAlert = async () => {
    try {
      Alert({
        title: "정말로 탈퇴하시겠어요? 🥲",
        text: "탈퇴시 철회할 수 없어요.",
        submitBtnText: "정말 탈퇴하기",
      }).then((res) => {
        if (res.isConfirmed) handleWithDrawal();
      });
    } catch (err) {
      toast("탈퇴에 실패했어요.");
    }
  };

  return (
    <div className={style.withDraw}>
      <div>
        <h2>{name}님, 탈퇴하기 전에 확인해주세요. </h2>
        <article>
          <h3>멤버십 안내</h3>
          <ul>멤버십 가입 기간과 상관없이 환불되지 않아요.</ul>
          <ul>멤버십은 양도할 수 없어요.</ul>
        </article>
        <article>
          <h3>개인 정보 및 재가입 안내</h3>
          <ul> 이미 탈퇴한 아이디는 재가입 및 복구할 수 없어요.</ul>
          <ul>
            개인정보보호법 제21조(개인정보의 파기)에 따라 수집 목적이 완료된
            회원의 개인정보는 지체 없이 복구 및 재생할 수 없도록 파기하게
            되어있어요.
          </ul>
          <ul>
            이에 탈퇴한 회원의 개인정보 및 서비스 이용 기록 등은 즉시 파기되며
            복구 불가해요.
          </ul>
          <ul>새로운 아이디로 가입하여 서비스를 이용해주세요.</ul>
        </article>
        <div className={style.withDrawButton} onClick={handleWithDrawalAlert}>그럼에도 불구하고 탈퇴하기</div>
      </div>
    </div>
  );
}
