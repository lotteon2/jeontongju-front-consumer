import orderAPI from "@/apis/order/orderAPIService";
import MyOrderBox from "./MyOrderBox/MyOrderBox";

async function getOrderList() {
  const { data } = await orderAPI.getMyOrderList(0, 10, false);
  return {
    data,
  };
}

export default async function MyOrderList() {
  const { data } = await getOrderList();
  console.log(data);
  return (
    <div>
      <MyOrderBox />
    </div>
  );
}
