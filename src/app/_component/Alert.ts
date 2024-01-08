import Swal from "sweetalert2";

interface AlertParams {
  title: string;
  text: string;
  submitBtnText?: string;
}

export const Alert = async (params: AlertParams) => {
  const result = await Swal.fire({
    title: params.title,
    text: params.text,
    iconHtml:
      '<a><img src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
    showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
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
