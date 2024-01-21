import Image from "next/image";
import FiSrHeartSVG from "/public/fi-sr-heart.svg";
import FiSrHeartFullSVG from "/public/fi-sr-heart-fill.svg";

const renderHearts = (rate: number) => {
  const clampedRate = Math.max(0, Math.min(rate, 5));
  const hearts = [];
  for (let i = 1; i <= 5; i++) {
    const heartStatus = i <= clampedRate ? "filled" : "empty";

    // 하트를 추가
    hearts.push(
      <div
        key={i}
        className={`heart ${heartStatus}`}
        style={{ display: "inline-block", margin: "0 2px" }}
      >
        {heartStatus === "filled" ? (
          <Image
            src={FiSrHeartFullSVG}
            alt="Filled Heart"
            width={20}
            height={20}
          />
        ) : (
          <Image src={FiSrHeartSVG} alt="Empty Heart" width={20} height={20} />
        )}
      </div>
    );
  }
  return hearts;
};

export function RateCard({ name, rate }: { name: string; rate: number }) {
  return (
    <div>
      <div>{name}</div>
      <div>{renderHearts(rate)}</div>
    </div>
  );
}
