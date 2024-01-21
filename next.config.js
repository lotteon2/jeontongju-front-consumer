/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    nextScriptWorkers: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
        pathname: "/my-bucket/**",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      "jeontongju-dev-bucket2.s3.ap-northeast-2.amazonaws.com",
      "lh3.googleusercontent.com",
    ],
    path: "/_next/image",
    // loader can be 'default', 'imgix', 'cloudinary', 'akamai', or 'custom'
    loader: "default",
    loaderFile: "",
    disableStaticImages: false,
    minimumCacheTTL: 60,
    // enable dangerous use of SVG images
    dangerouslyAllowSVG: false,
    // set the Content-Security-Policy header
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // sets the Content-Disposition header (inline or attachment)
    contentDispositionType: "inline",
    // limit of 50 objects
    // when true, every image will be unoptimized
    unoptimized: false,
    minimumCacheTTL: 60,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          publicPath: `/_next/static/sounds/`,
          outputPath: `${options.isServer ? "../" : ""}static/sounds/`,
        },
      },
    });

    return config;
  },
};
const runtimeCaching = require("next-pwa/cache");
const prod = process.env.NODE_ENV === "production";
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  disable: prod ? false : true,
  skipWaiting: true,
});

const withImages = require("next-images");
const withVideos = require("next-videos");
module.exports = withPWA(withVideos(nextConfig));
// module.exports = withPWA(withVideos(withImages(nextConfig)));
