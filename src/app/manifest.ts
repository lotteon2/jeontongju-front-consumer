import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "전통주점",
    short_name: "전통주점",
    description: "전통주, 마침표를 찍다.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffa1a1",
    theme_color: "#c0c0c0",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
