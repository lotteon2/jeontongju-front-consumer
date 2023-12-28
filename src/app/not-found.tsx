import { NextPage } from "next";
import Header from "./(mainLayout)/_component/Header/Header";

const NotFound: NextPage = () => {
  return (
    <div>
      <Header />
      <div>이 페이지는 존재하지 않아요. 다른 페이지를 검색해보세요.</div>
    </div>
  );
};

export default NotFound;
