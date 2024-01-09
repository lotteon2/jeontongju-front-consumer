"use client"
import style from './TopButton.module.css'
// import FiSrAngleUp from "/public/fi-sr-angle-up.svg";

export default function TopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={style.scrollContainer}>
      <button className={style.top} onClick={scrollToTop} type="button">
        top
        {/* <Image
          src={FiSrAngleUp}
          width={0}
          height={0}
          alt="top"
          style={{ cursor: "pointer", width: "3rem", height: "3rem" }}
        /> */}
      </button>
    </div>
  );
}
