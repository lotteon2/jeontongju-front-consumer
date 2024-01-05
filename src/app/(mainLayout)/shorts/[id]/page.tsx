"use client";
import productAPI from "@/apis/product/productAPIService";
import KakaoShareImg from "/public/kakaotalk_sharing_btn_small_ov.png";
import { Short } from "@/apis/product/productAPIService.types";
import style from "@/app/(mainLayout)/shorts/[id]/shortsDetail.module.css";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
export default function ShortsDetail({
  params,
  shorts,
  isMain,
}: {
  params: { id: string };
  shorts: Short;
  isMain: boolean;
}) {
  const [short, setShort] = useState<Short>(shorts);
  const { id } = params;
  const router = useRouter();

  const handleShareKakao = async () => {
    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        const { Kakao } = window;
        if (Kakao && !Kakao.isInitialized()) {
          Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
          window.Kakao.Share.sendDefault({
            objectType: "feed",
            content: {
              title: `전통주점 | ${short.shortsTitle}`,
              description: `${short.shortsDescription}`,
              imageUrl: `${short.shortsThumbnailImageUrl}`,
              link: {
                mobileWebUrl: `https://consumer.jeontongju-dev.shop/shorts/${short.shortsId}`,
                webUrl: `https://developers.kakao.com/shorts/${short.shortsId}`,
              },
            },
          });
        }
      };
    } else {
      await window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: `전통주점 | ${short.shortsTitle}`,
          description: `${short.shortsDescription}`,
          imageUrl: `${short.shortsThumbnailImageUrl}`,
          link: {
            mobileWebUrl: `https://consumer.jeontongju-dev.shop/shorts/${short.shortsId}`,
            webUrl: `https://developers.kakao.com/shorts/${short.shortsId}`,
          },
        },
      });
    }
  };
  const getShorts = async () => {
    try {
      const data = await productAPI.getShortsDetail(params.id);
      if (data.code === 200) {
        setShort(data.data);
      }
    } catch (err) {
      toast("해당 쇼츠가 없어요.");
    }
  };

  useEffect(() => {
    if (typeof short === "undefined") {
      getShorts();
      return;
    }
  }, []);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.head.appendChild(script);

    const script_GA = document.createElement("script");
    script_GA.src = "https://www.googletagmanager.com/gtag/js?id=G-4MJ6ZE1TXS";
    script_GA.async = true;
    document.head.appendChild(script_GA);

    script.onload = () => {
      const { Kakao } = window;
      if (Kakao && !Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
      }
    };

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(script_GA);
    };
  }, [short]);

  return (
    <>
      {/* <Head> */}

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-4MJ6ZE1TXS`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-4MJ6ZE1TXS', {
                  page_path: window.location.pathname,
                  shortsId: ${id}
                });
                gtag('event', 'watch_shorts', {
                  'event_name': 'watch_shorts',
                  'event_label': 'shortsId-${id}'
                })
              `,
        }}
      />

      {/* <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-4MJ6ZE1TXS`}
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-4MJ6ZE1TXS', {
                  page_path: window.location.pathname,
                  shortsId: ${short.shortsId}
                });

                gtag('event', 'watch_shorts', {
                  'event_name' : 'watch_shorts',
                  'event_label' : 'shortsId-${short.shortsId}'
                });
                
        `,
        }}
      /> */}
      {/* </Head> */}
      <div
        className={style.shortsContainer}
        style={{ height: isMain ? "auto" : "90dvh" }}
      >
        <video
          autoPlay={true}
          muted={true}
          loop={true}
          src={short?.shortsVideoUrl || ""}
          width={0}
          height={0}
          style={{
            width: "100%",
            height: "100%",
            cursor: "pointer",
            borderRadius: "10px",
          }}
        />
        <div
          className={style.shortsBottom}
          style={{ bottom: isMain ? "0" : "5rem" }}
        >
          <div
            className={style.shortsTitle}
            onClick={() => router.push(`/${short.targetId}`)}
          >
            {short?.shortsTitle}
          </div>
          <div className={style.shortsDescription}>
            {short?.shortsDescription}
          </div>
          <div onClick={handleShareKakao}>
            <Image
              src={KakaoShareImg}
              alt="kakaoShare"
              width={0}
              height={0}
              style={{
                cursor: "pointer",
                width: "2rem",
                height: "2rem",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
