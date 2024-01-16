import Swal from "sweetalert2";
import Firework from "../(mainLayout)/_component/PangPang/PangPang";

interface AlertParams {
  title: string;
  text: string;
  submitBtnText?: string;
}

export const SuccessAlert = async (params: AlertParams) => {
  // Firework();
  const result = await Swal.fire({
    title: params.title,
    text: params.text,
    iconHtml:
      '<a><img src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger" width="110px" height="110px"></a>',
    confirmButtonColor: "#DC2626", // confrim 버튼 색깔 지정
    cancelButtonColor: "#808080", // cancel 버튼 색깔 지정
    confirmButtonText: params.submitBtnText || "삭제하기", // confirm 버튼 텍스트 지정
    cancelButtonText: "취소", // cancel 버튼 텍스트 지정
    reverseButtons: true, // 버튼 순서 거꾸로
    background: "#FFFFFF",
    color: "#212B36",
  });

  return result;
};
