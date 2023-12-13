"use Client";

import consumerAPI from "@/apis/consumer/consumerAPIService";

export default function MainPage() {
  console.log(consumerAPI.getMyInfo());
  return <div>MYPAGE</div>;
}
