"use client";
import LiveBeforeImg from "/public/live_before.mp4";
import ConnectLive from "@connectlive/connectlive-web-sdk";
import type {
  IRoom,
  ILocalMedia,
  IRemoteVideo,
  IRemoteParticipant,
  IRoomEventConnected,
  IRoomEventParticipantLeft,
  IRoomEventParticipantEntered,
  IRoomEventRemoteVideoPublished,
  IRoomEventRemoteVideoUnpublished,
} from "@connectlive/connectlive-web-sdk";

import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import { useEffect, useState } from "react";
import style from "@/app/(mainLayout)/auction/[auctionId]/auction.module.css";
import auctionAPI from "@/apis/auction/auctionAPIService";
import Image from "next/image";

interface RemoteParticipantWithVideo {
  participant: IRemoteParticipant;
  videos: IRemoteVideo[];
}

type Props = {
  params: { auctionId: string };
};

type ChatData = {
  memberNickname: string;
  memberProfileImage: string;
  message: string;
};

type AuctionData = {
  auctionName: string;
  auctionProductList: [
    {
      auctionProductId: string;
      auctionProductName: string;
      state: "ING";
    },
    {
      auctionProductId: string;
      auctionProductName: string;
      state: "BEFORE";
    }
  ];
};

const AuctionDetail = ({ params }: Props) => {
  const { auctionId } = params;
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [auctionName, setAuctionName] = useState<string>("");
  const [status, setStatus] = useState<"ING" | "BEFORE" | "AFTER">();
  const [auctionInfo, setAuctionInfo] = useState<AuctionData[]>([]);
  const [chat, setChat] = useState<ChatData[]>([]);
  const [remoteParticipant, setRemoteParticipant] = useState<
    RemoteParticipantWithVideo[]
  >([]);
  const connectChatInfo = () => {
    console.log("auction");
    const serverURL = "https://jeontongju-dev.shop/auction-service";
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
        });
      },
      (error) => {
        console.log("소켓 연결 실패", error);
      }
    );
  };

  const connectBidInfo = () => {
    console.log("auction");
    const serverURL = "https://jeontongju-dev.shop/auction-service";
    let socket = new SockJS(`${serverURL}/chat`);
    const stompClient = Stomp.over(socket);
    stompClient.connect(
      {},
      (frame) => {
        stompClient.subscribe(`/sub/bid-info/${auctionId}`, (res) => {
          console.log("[BID] 구독으로 받은 메시지 입니다.", res.body);
          // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
          const auctionData = JSON.parse(res.body);
          setAuctionInfo([...auctionInfo, auctionData]);
        });
      },
      (error) => {
        console.log("소켓 연결 실패", error);
      }
    );
  };

  const addRemoteVideoNode = (videos: IRemoteVideo[]): void => {
    const remoteContainer =
      document.querySelector<HTMLUListElement>("#remote-container")!;

    videos.forEach((video) => {
      const videoItem = document.createElement("li");
      videoItem.id = video.participantId;

      const videoHeader = document.createElement("h3");
      videoHeader.innerHTML = `Presenter`;
      // addLog(`Join the webinar`);

      const remoteVideo = video.attach()!;
      remoteVideo.id = "remote-video";

      videoItem.appendChild(videoHeader);
      videoItem.appendChild(remoteVideo);
      remoteContainer.appendChild(videoItem);
    });
  };

  const createConferenceGuestOptions = async (room: IRoom) => {
    room.on("connected", async (evt: IRoomEventConnected) => {
      if (!evt.remoteParticipants.length) {
        alert("No webinar starts yet");
      }

      evt.remoteParticipants.forEach(async (participant) => {
        let videos: IRemoteVideo[] = [];
        const unsubscribedVideos = participant.getUnsubscribedVideos();

        if (unsubscribedVideos.length) {
          const videoIds = unsubscribedVideos.map((video) =>
            video.getVideoId()
          );
          videos = await room!.subscribe(videoIds);
        }

        setRemoteParticipant([...remoteParticipant, { participant, videos }]);
        addRemoteVideoNode(participant.videos);
      });
    });
  };

  const connectKaKaoILive = async () => {
    try {
      await ConnectLive.signIn({
        serviceId: "ICLEXMPLPUBL",
        serviceSecret: "ICLEXMPLPUBL0KEY:YOUR0SRVC0SECRET",
      });
      const room = ConnectLive.createRoom();
      createConferenceGuestOptions(room);
      await room.connect(auctionId.replaceAll("-", ""));
    } catch (err) {
      console.error(err);
    }
  };

  const enterAuctionRoom = async () => {
    try {
      const data = await auctionAPI.enterAuction(auctionId);
      if (data.code === 200) {
        console.log("성공");
        setAuctionName(data.data.auctionName);
        setStatus(data.data.status);
        console.log(data.data.status);
        if (data.data.status === "ING") {
          connectChatInfo();
          connectBidInfo();
          connectKaKaoILive();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    enterAuctionRoom();
  }, []);

  return (
    <div className={style.auctionPage}>
      {status === "ING" ? (
        <>
          <div className={style.auctionLeft}>
            <ul id="remote-container" className={style.remoteContainer}></ul>
            <div className={style.chat}>
              {chat.map((it, idx) => (
                <div className={style.chatBox} key={idx}>
                  <Image src={it.memberProfileImage || ""} alt="img" />
                  <span className={style.chatName}>{it.memberNickname}</span>
                  <span className={style.chatMessage}>{it.message}</span>
                </div>
              ))}
              {isLogin && <input className={style.chatInput} />}
            </div>
          </div>
          <div className={style.auctionRight}>경매 내역 {auctionId}</div>
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
          <span>종료된 방송이에요.</span>
        </>
      )}
    </div>
  );
};
export default AuctionDetail;
