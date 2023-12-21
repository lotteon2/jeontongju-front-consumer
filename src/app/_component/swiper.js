import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";
console.log("HI");
export default function SwiperJS() {
  console.log("HI");
  console.log(document.getElementsByClassName(".swiper-container"));
  new Swiper(".swiper-container", {
    // Optional parameters
    direction: "vertical",
    loop: true,
    slidesPerView: "auto",
    autoplay: {
      delay: 2000,
    },
  });

  console.log("here");
}
