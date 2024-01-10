/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    nextScriptWorkers: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
        pathname: "/my-bucket/**",
      },
    ],
    // limit of 25 deviceSizes values
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // limit of 25 imageSizes values
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // limit of 50 domains values (deprecated)
    domains: [],
    // path prefix for Image Optimization API, useful with `loader`
    path: "/_next/image",
    // loader can be 'default', 'imgix', 'cloudinary', 'akamai', or 'custom'
    loader: "default",
    // file with `export default function loader({src, width, quality})`
    loaderFile: "",
    // disable static imports for image files
    disableStaticImages: true,
    // minimumCacheTTL is in seconds, must be integer 0 or more
    minimumCacheTTL: 60,
    // ordered list of acceptable optimized image formats (mime types)
    formats: ["image/avif", "image/webp"],
    // enable dangerous use of SVG images
    dangerouslyAllowSVG: false,
    // set the Content-Security-Policy header
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // sets the Content-Disposition header (inline or attachment)
    contentDispositionType: "inline",
    // limit of 50 objects
    remotePatterns: [],
    // when true, every image will be unoptimized
    unoptimized: true,
    minimumCacheTTL: 60,
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // config.module.rules.push({
    //   test: /\.(gif|svg|jpg|png)$/, // add whatever files you wanna use within this regEx
    //   use: ["file-loader"],
    // });
    // config.module.rules.push({
    //   test: /^.*\/(robots\.txt|sitemap(-\d+)?\.xml)$/,
    //   loader: "ignore-loader",
    // });
    // config.module.rules.push({
    //   test: /\.(png|jpe?g|gif)$/i,
    //   use: [
    //     {
    //       loader: "file-loader",
    //     },
    //   ],
    // });
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

module.exports = withPWA(withVideos(withImages(nextConfig)));
