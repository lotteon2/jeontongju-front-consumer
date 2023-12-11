"use Client";

import consumerAPI from "@/apis/consumer/consumerAPIService";

export default function MyPage() {
  console.log(consumerAPI.getMyInfo());
  return <div>MYPAGE</div>;
}
