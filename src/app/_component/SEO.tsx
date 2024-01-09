import Head, { Metadata } from "next/head";

interface SEOProps {
  title: string;
  desc?: string;
}

const SEO = (props: SEOProps) => {
  const { title, desc } = props;

  const metadata: Metadata = {
    title: `전통주점 | ${title}`,
    description: desc || "전통주, 마침표를 찍다.",
  };

  return (
    <Head>
      <title>전통주점 | {title}</title>
      <meta name="description" content={desc || "전통주, 마침표를 찍다."} />
      <meta name="og:type" content="website" />
      <meta name="og:title" content="website" />
      <meta name="og:description" content={desc || "전통주, 마침표를 찍다."} />
      <meta name="og:url" content="https://consumer.jeontongju.shop" />
      <meta name="og:locale" content="ko_KR" />
    </Head>
  );
};

export default SEO;
