"use client";
import FiSrSellersSvg from "/public/fi-sr-sellers.svg";
import UserDefaultImg from "/public/UserDefault.png";
import LiveBeforeImg from "/public/live_before.mp4";
import { Client } from "stompjs";
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import { useEffect, useRef, useState } from "react";
import style from "@/app/(mainLayout)/auction/[auctionId]/auction.module.css";
import auctionAPI from "@/apis/auction/auctionAPIService";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useMyInfoStore } from "@/app/store/myInfo/myInfo";
import SEO from "@/app/_component/SEO";
import { Button, Input, Modal } from "antd";
import { useQuery } from "@tanstack/react-query";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import { SuccessAlert } from "@/app/_component/SuccessBid";
import { Particle } from "@/app/_component/pangpang/page";

type Props = {
  params: { auctionId: string };
};

type ChatData = {
  memberNickname: string;
  memberProfileImage: string;
  message: string;
};

export interface AuctionData {
  auctionProductList: {
    auctionProductId: string;
    auctionProductName: string;
    startingPrice: number;
    progress: "ING" | "BEFORE" | "AFTER";
  }[];
  askingPrice: number;
  bidHistoryList: MemberAuction[];
}

export type MemberAuction = {
  memberId: number;
  nickname: string;
  profileImage: string;
  auctionProductId: string;
  bidPrice: number;
};

export type BidResultUser = {
  consumerId: number;
  consumerName: string;
  productName: string;
  auctionProductId: string;
  lastBidPrice: number;
};

export type BidResult = {
  auctionId: string;
  bidResult: BidResultUser[];
};

const AuctionDetail = ({ params }: Props) => {
  const router = useRouter();
  const { auctionId } = params;
  const chatContainerRef = useRef<HTMLDivElement>();
  const [isDisableToBid, setIsDisableToBid] = useState(false);
  const [currentUserCount, setCurrentUserCount] = useState<number>(1);
  const { data: myInfo, isLoading } = useQuery({
    queryKey: ["consumer", "myinfo"],
    queryFn: () => consumerAPI.getMyInfoForStore(),
  });

  const [isLogin, memberId] = useMyInfoStore((state) => [
    state.isLogin,
    state.memberId,
  ]);
  const [message, setMessage] = useState<string>("");
  const stompClientRef = useRef({
    chat: null,
    bidInfo: null,
    room: null,
    bidResult: null,
  });

  const [stompClient, setStompClient] = useState<null | Client>(null);
  const [auctionName, setAuctionName] = useState<string>("");
  const [status, setStatus] = useState<"ING" | "BEFORE" | "AFTER">();
  const [auctionInfo, setAuctionInfo] = useState<AuctionData>();
  const [chat, setChat] = useState<ChatData[]>([]);
  const notify = (message: string) => toast(message);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("accessToken")) {
        toast("로그인한 유저만 접근할 수 있어요.");
        router.push("/init/signin");
      }
    }
  }, []);

  useEffect(() => {
    console.log(myInfo);
    if (typeof myInfo !== "undefined" && !myInfo?.data.isAddressDefault) {
      toast("기본 주소지를 설정해야 경매에 입장할 수 있어요.");
      router.push("/mypage/myaddress");
    }
  }, [myInfo]);

  useEffect(() => {
    return () => {
      console.log(stompClientRef);
      Object.values(stompClientRef.current).forEach((stompClient) => {
        if (stompClient) {
          stompClient.unsubscribe(`/sub/chat/${auctionId}`);
          stompClient.unsubscribe(`/sub/bid-result/${auctionId}`);
          stompClient.unsubscribe(`/sub/auction-numbers/${auctionId}`);
          stompClient.unsubscribe(`/sub/bid-info/${auctionId}`);
          // Unsubscribe from other channels if needed
          stompClient.disconnect(() => {
            console.log("disconnect 성공!!");
          });
        }
      });
    };
  }, []);

  const connectChatInfo = () => {
    console.log("auction");
    const serverURL = "https://api.jeontongju.shop/auction-service";
    let socket = new SockJS(`${serverURL}/chat`);
    const stompClient = Stomp.over(socket);
    stompClient.connect(
      {},
      (frame) => {
        stompClient.subscribe(`/sub/chat/${auctionId}`, (res) => {
          console.log("[CHAT] 구독으로 받은 메시지 입니다.", res.body);
          // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
          const chatData = JSON.parse(res.body);
          setChat((prev) => [...prev, chatData]);
          console.log(stompClient);
        });
        stompClientRef.current.chat = stompClient;
        setStompClient(stompClient);
      },
      (error) => {
        console.log("소켓 연결 실패", error);
      }
    );
  };

  const connectBidResultInfo = () => {
    const serverURL = "https://api.jeontongju.shop/auction-service";
    let socket = new SockJS(`${serverURL}/chat`);
    const stompClient = Stomp.over(socket);
    stompClient.connect(
      {},
      (frame) => {
        stompClient.subscribe(`/sub/bid-result/${auctionId}`, (res) => {
          console.log("[BID RESULT] 구독으로 받은 메시지 입니다.", res.body);
          const bidResult = JSON.parse(res.body);
          console.log("memberId", myInfo?.data?.memberId);
          console.log("memberId", memberId);
          console.log(
            bidResult.bidResult[bidResult.bidResult.length - 1].consumerId
          );
          console.log(stompClient);
          setStompClient(stompClient);
          if (
            Number(
              bidResult.bidResult[bidResult.bidResult.length - 1].consumerId
            ) === Number(myInfo?.data.memberId) ||
            Number(
              bidResult.bidResult[bidResult.bidResult.length - 1].consumerId
            ) === Number(memberId)
          ) {
            const mySuccessBid =
              bidResult.bidResult[bidResult.bidResult.length - 1];

            SuccessAlert({
              title: `🎉 ${mySuccessBid?.consumerName}님 경매 낙찰을 축하드려요!`,
              text: mySuccessBid?.productName,
              submitBtnText: "계속 참여하기",
            }).then((res) => {
              console.log(res);
            });

            const party = new Particle("particle", {
              number: 100,
              colors: ["#ffca76", "#ffb9b9", "#fff180", "#00AAFF"],
            });
            party.start();
          }
        });
        stompClientRef.current.bidResult = stompClient;
      },
      (error) => {
        console.log("소켓 연결 실패", error);
      }
    );
  };

  const connectRoomInfo = () => {
    const serverURL = "https://api.jeontongju.shop/auction-service";
    let socket = new SockJS(`${serverURL}/chat`);
    const stompClient = Stomp.over(socket);
    stompClient.connect(
      {},
      (frame) => {
        stompClient.subscribe(`/sub/auction-numbers/${auctionId}`, (res) => {
          setCurrentUserCount(Number(res.body));
        });
        stompClientRef.current.room = stompClient;
      },
      (error) => {
        console.log("소켓 연결 실패", error);
      }
    );
  };

  const connectBidInfo = () => {
    const serverURL = "https://api.jeontongju.shop/auction-service";
    let socket = new SockJS(`${serverURL}/chat`);
    const stompClient = Stomp.over(socket);
    stompClient.connect(
      {},
      (frame) => {
        stompClient.subscribe(`/sub/bid-info/${auctionId}`, (res) => {
          console.log("[BID] 구독으로 받은 메시지 입니다.", res.body);
          const auctionData = JSON.parse(res.body);
          setAuctionInfo((prev) => auctionData);
        });
        stompClientRef.current.bidInfo = stompClient;
      },
      (error) => {
        console.log("소켓 연결 실패", error);
      }
    );
  };

  const sendMessage = () => {
    if (!message) return;
    const msg = {
      memberId,
      message,
    };
    stompClient!.send(`/pub/chat/${auctionId}`, JSON.stringify(msg));
    setMessage("");
  };

  const enterAuctionRoom = async () => {
    try {
      const data = await auctionAPI.enterAuction(auctionId);
      if (data.code === 200) {
        console.log(data);
        if (data.failure === "INVALID_CONSUMER_CREDIT") {
          notify("크레딧이 부족해요!");
          router("/credit/list");
          return;
        }
        setAuctionName(data.data.broadcastResponse.auctionName);
        setStatus(data.data.broadcastResponse.status);
        setAuctionInfo((prev) => data.data.bidHistory);
        console.log(data);
        if (data.data.broadcastResponse.status === "ING") {
          connectChatInfo();
          connectBidInfo();
          connectBidResultInfo();
          connectRoomInfo();
        }
      }
    } catch (error) {
      notify("입장에 실패했어요");
      console.error(error);
    }
  };

  const bidAskingPrice = async () => {
    setIsDisableToBid(true);
    setTimeout(() => setIsDisableToBid(false), 2000);
    try {
      console.log(auctionInfo);
      if (auctionInfo?.askingPrice === 0) {
        notify("아직 호가 설정 전이에요. 잠시만 기다려주세요.");
        return;
      }
      let currentStartingPrice =
        auctionInfo?.auctionProductList[
          auctionInfo?.auctionProductList.findIndex(
            (auctionProduct) => auctionProduct.progress === "ING"
          )
        ].startingPrice;
      console.log(currentStartingPrice);
      const data = await auctionAPI.bid({
        auctionId,
        bidPrice:
          (auctionInfo?.bidHistoryList[0].bidPrice === 0
            ? Number(currentStartingPrice)
            : Number(auctionInfo?.bidHistoryList[0]?.bidPrice)) +
          Number(auctionInfo?.askingPrice),
      });
      console.log(data);
      if (data.code === 200) {
        if (data.failure === "INVALID_CONSUMER_CREDIT") {
          notify("크레딧이 부족해요!");
          return;
        }
        console.log("입찰 성공");
      }
    } catch (error) {
      console.error("입찰 실패");
    }
  };

  const handleChangeMessage = (e) => {
    if (e.keycode === 13 || e.key === "Enter") {
      e.preventDefault();
      sendMessage();
      return;
    } else {
      setMessage(e.target.value);
    }
  };

  useEffect(() => {
    enterAuctionRoom();
  }, []);

  useEffect(() => {
    if (chatContainerRef && chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <>
      <SEO title="라이브 경매" desc={auctionName} />
      <div className={style.auctionPage}>
        {status === "ING" ? (
          <>
            <div className={style.auctionLeft}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/giGKY7kGsCI?si=bK-3JP71NwGWjOkn&amp;controls=0&autoplay=1&mute=1"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>

              {/* <iframe
                width="600"
                height="705"
                src="https://youtube.com/live/giGKY7kGsCI;controls=0&autoplay=1&mute=1"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe> */}
            </div>
            <div className={style.auctionRight}>
              <div className={style.activeUser}>
                <span>현재 호가 | </span>
                <span>{auctionInfo?.askingPrice || 0}원</span>
                <span>현재 참여자 수</span>
                <Image
                  alt="currentUserCount"
                  width={15}
                  height={15}
                  src={FiSrSellersSvg}
                />
                <span>{currentUserCount}명</span>
              </div>
              <div className={style.todayAuctionBox}>
                {auctionInfo?.auctionProductList.map((auctionProduct, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      color:
                        auctionProduct.progress === "ING" ? "red" : "#c0c0c0",
                    }}
                  >
                    <div>{auctionProduct.auctionProductName}</div>
                    <div className={style.startingPrice}>
                      시작가 |{" "}
                      {auctionProduct.startingPrice
                        ? auctionProduct.startingPrice.toLocaleString()
                        : auctionProduct.startingPrice}
                      원
                    </div>
                  </div>
                ))}
              </div>
              {isLogin && (
                <>
                  <Button
                    className={style.inputBidButton}
                    onClick={bidAskingPrice}
                    disabled={isDisableToBid}
                    loading={isDisableToBid}
                  >
                    💵 현재가 + 호가만큼 입찰하기
                  </Button>
                </>
              )}
              <div className={style.bidInfo}>
                <div className={style.auctionName}>현재 입찰 내역</div>
                <div>
                  {auctionInfo?.bidHistoryList
                    .slice(0, 5)
                    .map((bidHistory, idx) => (
                      <div
                        key={idx}
                        className={style.bidInfoInner}
                        style={{
                          color:
                            idx === 0 && bidHistory.bidPrice ? "red" : "black",
                        }}
                      >
                        <div>{idx + 1}.</div>
                        <Image
                          src={bidHistory.profileImage || UserDefaultImg}
                          width="10"
                          height="10"
                          alt="bidUser"
                        />
                        <div>{bidHistory.nickname}</div>
                        <div>{bidHistory.bidPrice || "-"}</div>
                      </div>
                    ))}
                </div>
              </div>
              <div className={style.chat} ref={chatContainerRef}>
                {chat.map((it, idx) => (
                  <div className={style.chatBox} key={idx}>
                    <Image
                      src={it.memberProfileImage || UserDefaultImg}
                      alt="img"
                      width="20"
                      height="20"
                      style={{
                        borderRadius: "50%",
                      }}
                    />
                    <span className={style.chatName}>{it.memberNickname}</span>
                    <span className={style.chatMessage}>{it.message}</span>
                  </div>
                ))}
              </div>
              {isLogin && (
                <div className={style.bottomInput}>
                  <Input
                    value={message}
                    onChange={handleChangeMessage}
                    onPressEnter={sendMessage}
                  />
                  <Button onClick={sendMessage}>입력</Button>
                </div>
              )}
              <ToastContainer />
            </div>
          </>
        ) : status === "BEFORE" ? (
          <video
            autoPlay={true}
            muted={true}
            loop={true}
            style={{ width: "100%", height: "100%" }}
            src={LiveBeforeImg}
          />
        ) : (
          <>
            <video
              autoPlay={true}
              muted={true}
              loop={true}
              style={{ width: "100%", height: "100%" }}
              src={LiveBeforeImg}
            />
          </>
        )}
      </div>
      <div id="particle"></div>
    </>
  );
};
export default AuctionDetail;
