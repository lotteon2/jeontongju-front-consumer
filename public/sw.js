if(!self.define){let e,s={};const i=(i,a)=>(i=new URL(i+".js",a).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>i(e,n),p={module:{uri:n},exports:t,require:r};s[n]=Promise.all(a.map((e=>p[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/UserDefault.png",revision:"ee7fa8e5c345fee012271d0e58f73db4"},{url:"/Vector.svg",revision:"e315446a2290e66e5311697c32f4ece6"},{url:"/_next/app-build-manifest.json",revision:"d0a840e71252b269bac5467bd29a7299"},{url:"/_next/static/chunks/1042-50b77704b65a802b.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/1231-bbe291ff6f6773b8.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/1396-a8e7944bfa7456f5.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/1929-a9cc431277d31934.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/200-54a8501c7c5aa923.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/2133-c25e00776550c598.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/2173-d018b6acb14520ca.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/2521-ab1f6b93cd648abd.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/2527-79400ba52d2e9f10.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/2605-cae66d21e5032fb5.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/3288-7e111431555fd2f4.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/3439-168ae855e76b54e5.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/41ade5dc-98587a71e4e09180.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/4290-49d27519ffcb7da6.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/4938-6f1122923064c827.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/5869-5267555b44428f1e.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/5986-7dbca5fc21b9d639.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/6555-5c0c9fa76ddd81e6.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/6574-ae48d9903e1e69a5.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/6961-895d834ec20d33cf.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/7248-1279d05a6c6c60fd.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/7890-27a90320d2dbf1f9.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/7912-93802a6cc6f30e92.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/8475-d861054b00c49372.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/9078-1922bb6cfba90a00.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/9179-8748718cf3012a79.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/9263-6a222d506e2fa6ef.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/9392-bc32a7b8e9446d1b.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/9954-59e07454d95895d1.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(loginLayout)/init/adult/page-5a8e8f456b934238.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(loginLayout)/init/callback/page-87af8be93c39ac20.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(loginLayout)/init/findMyPassword/page-bea0b5daaaba6d14.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(loginLayout)/init/logout/page-35eb75d64abadfe7.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(loginLayout)/init/signin/page-20cffc4132664c35.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(loginLayout)/init/signup/page-e35d532cc95346bf.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(loginLayout)/layout-73ad8e0930120d25.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/auction/%5BauctionId%5D/page-a6c35b4e1a48ebe9.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/auction/list/page-86add2cf9c2e6593.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/category/%5BcategoryId%5D/page-d00b9b0b27a7c690.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/credit/buy/page-203d2f0b56924b32.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/credit/list/page-262ed7a7b661a003.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/event/cost/page-f6b3ff6e99955a15.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/event/crop/page-d4503180d9fa0657.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/event/holiday/page-e857a74655cd57c4.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/layout-ad0bdac2ff9f6a41.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/membership/buy/page-1989a0b9f156aadb.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/membership/list/page-d04cc8bff329e3df.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/mypage/myaddress/page-17b2680454969d5d.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/mypage/myauction/page-305183b9a43f720c.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/mypage/mycart/page-fd3e1600cb65ceba.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/mypage/mycoupon/page-376a7b043a2b17e4.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/mypage/myinfo/page-64ccc0fdd971624a.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/mypage/myorder/page-d8a7e8dcb40208b1.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/mypage/myreview/page-d97bd631a601248f.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/mypage/mywish/page-3d13e17f5fac367c.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/mypage/page-943ab783597f9d3f.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/order/order-fail/page-a6e8d15ce2dfce45.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/order/order-success/page-37d519910b386525.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/orderdetail/%5BordersId%5D/page-88661248a852f86d.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/payment/page-b889c9bd3e2290ad.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/point/list/page-e85a49b5e9cafc8b.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/product/%5BproductId%5D/page-163795d7f1bac3fe.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/product/list/page-e4f23b9da0d17a57.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/review/create/%5BproductId%5D/%5BproductOrderId%5D/page-23c7f4c94d33ad63.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/search/page-92454604c07b3f16.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/seller/%5BsellerId%5D/page-96948836bdc9da7d.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/seller/list/page-2108400c730b20f9.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/shorts/%5Bid%5D/page-fdebf31f873ed3da.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/(mainLayout)/shorts/list/page-8f27a6dba160d1ed.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/layout-c6082742e933c62e.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/not-found-63779449f719d67f.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/app/page-0b05759bb07e0ef0.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/fd9d1056-2b67640cbd02eeba.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/framework-4498e84bb0ba1830.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/main-7865c3b17b31d6b2.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/main-app-ef1db704fab40c51.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/pages/_app-31397adcb4d2b835.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/pages/_error-b225d4412fb76f89.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-f8d5debf4d133fa4.js",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/css/01c1817767950ead.css",revision:"01c1817767950ead"},{url:"/_next/static/css/0334a251549644c0.css",revision:"0334a251549644c0"},{url:"/_next/static/css/0401272e9dfe189c.css",revision:"0401272e9dfe189c"},{url:"/_next/static/css/0763ae68248be77b.css",revision:"0763ae68248be77b"},{url:"/_next/static/css/0babd8c01e4ffa97.css",revision:"0babd8c01e4ffa97"},{url:"/_next/static/css/0f1ce191558f335b.css",revision:"0f1ce191558f335b"},{url:"/_next/static/css/2d58c1a062b8b549.css",revision:"2d58c1a062b8b549"},{url:"/_next/static/css/34dfc1ce54085782.css",revision:"34dfc1ce54085782"},{url:"/_next/static/css/38e15e67e7aea459.css",revision:"38e15e67e7aea459"},{url:"/_next/static/css/4299dd2e8742b18a.css",revision:"4299dd2e8742b18a"},{url:"/_next/static/css/492ff68f2a26f5b3.css",revision:"492ff68f2a26f5b3"},{url:"/_next/static/css/5ac4a52d15682f0b.css",revision:"5ac4a52d15682f0b"},{url:"/_next/static/css/71653b9f6ed2e1e2.css",revision:"71653b9f6ed2e1e2"},{url:"/_next/static/css/82173beb1010f781.css",revision:"82173beb1010f781"},{url:"/_next/static/css/8473b3ee32f79180.css",revision:"8473b3ee32f79180"},{url:"/_next/static/css/851da807ee43230c.css",revision:"851da807ee43230c"},{url:"/_next/static/css/8ffcd348baffb7d8.css",revision:"8ffcd348baffb7d8"},{url:"/_next/static/css/9182c4aed316ca85.css",revision:"9182c4aed316ca85"},{url:"/_next/static/css/9d16f6e70ab3383b.css",revision:"9d16f6e70ab3383b"},{url:"/_next/static/css/9d68450d862d3f5a.css",revision:"9d68450d862d3f5a"},{url:"/_next/static/css/a8748fdc7a0fdd34.css",revision:"a8748fdc7a0fdd34"},{url:"/_next/static/css/b165bf704a522f9f.css",revision:"b165bf704a522f9f"},{url:"/_next/static/css/b27d35181e17e520.css",revision:"b27d35181e17e520"},{url:"/_next/static/css/b41508ea34d70e5c.css",revision:"b41508ea34d70e5c"},{url:"/_next/static/css/b5f811edc2c3a79a.css",revision:"b5f811edc2c3a79a"},{url:"/_next/static/css/bbbe6bf3f1e71efe.css",revision:"bbbe6bf3f1e71efe"},{url:"/_next/static/css/c0c9523fcb54b270.css",revision:"c0c9523fcb54b270"},{url:"/_next/static/css/c3fde3d1c1bb0a8b.css",revision:"c3fde3d1c1bb0a8b"},{url:"/_next/static/css/c69a564e69ce2ba1.css",revision:"c69a564e69ce2ba1"},{url:"/_next/static/css/c69ff01e239a840c.css",revision:"c69ff01e239a840c"},{url:"/_next/static/css/ca736a0f90a83f0c.css",revision:"ca736a0f90a83f0c"},{url:"/_next/static/css/ddc9b1ca4f5f0292.css",revision:"ddc9b1ca4f5f0292"},{url:"/_next/static/css/dfc3d9941bf674a4.css",revision:"dfc3d9941bf674a4"},{url:"/_next/static/css/f203540c9805433f.css",revision:"f203540c9805433f"},{url:"/_next/static/css/f40524a34c1dddb8.css",revision:"f40524a34c1dddb8"},{url:"/_next/static/images/adultValid-0ab555c70d00c58870aa05e9d53f1273.png",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/images/event_cost-512cab6025a222a2356dd60f11beb2f1.png",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/images/event_coupon-fcc1afc0919907dc67e4e4d0b43bd04d.png",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/images/event_crop-b5a4da497f6bf042b4da010ccde1e7c9.png",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/images/jeontongju_notfound-6f7f557d3dce29d2958bcc473fcc03aa.png",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/images/loading-b8a7b8812628682e98f1513b51b91e64.gif",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/images/logo-002e1e42b56d889ae595bcc7ecf3aa0e.png",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/images/membership_banner-280871de93c953fdb6d64b1575e54a9b.png",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/images/membership_delivery-1550f827e312dc2c96ecb67269385514.gif",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/images/order_fail-1e47f80fe706204461df0194abb4963e.gif",revision:"pKYOOrPpX933Bx0yimYWK"},{url:"/_next/static/media/ajax-loader.0b80f665.gif",revision:"0b80f665"},{url:"/_next/static/media/slick.25572f22.eot",revision:"25572f22"},{url:"/_next/static/media/slick.653a4cbb.woff",revision:"653a4cbb"},{url:"/_next/static/media/slick.6aa1ee46.ttf",revision:"6aa1ee46"},{url:"/_next/static/media/slick.f895cfdf.svg",revision:"f895cfdf"},{url:"/_next/static/pKYOOrPpX933Bx0yimYWK/_buildManifest.js",revision:"a27b2b7607326fa26b144e657011ec52"},{url:"/_next/static/pKYOOrPpX933Bx0yimYWK/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/videos/live_before-584992422ab5b5f9454fafdee628d97a.mp4",revision:"584992422ab5b5f9454fafdee628d97a"},{url:"/_next/static/videos/not_found-a4df87f58eaff8d1d355b70b74ac3b02.mp4",revision:"a4df87f58eaff8d1d355b70b74ac3b02"},{url:"/adultValid.png",revision:"5958688e36c10f8303e6e5b9e38227a7"},{url:"/arrow.jpeg",revision:"e19a8286db20d8d7440b928681f6b4db"},{url:"/event_cost.png",revision:"95aaf3ed3b059144f559b13375d56a68"},{url:"/event_coupon.png",revision:"6be8c0e7e5e46fb2bf3b7f5768822529"},{url:"/event_crop.png",revision:"73a9a879182aee1baa8843d1055af3b7"},{url:"/event_holiday.png",revision:"a15228612609f724920714adbb7535fd"},{url:"/fi-sr-angle-up.svg",revision:"9dea5f313015b3fab96b150c346bbd8b"},{url:"/fi-sr-bell.svg",revision:"81ad21252c3880e082a65180b7b592dc"},{url:"/fi-sr-briefcase-active.svg",revision:"4ffa1cefcde4f4991526dec719f33bbf"},{url:"/fi-sr-briefcase.svg",revision:"1d299fcf5a749382327b988f7e6d384d"},{url:"/fi-sr-coffee.svg",revision:"c41107d4a0d9f7e94d7b0ba6e0454001"},{url:"/fi-sr-heart-fill.svg",revision:"c9938392c2958e9c7864e3894d6a5bc1"},{url:"/fi-sr-heart.svg",revision:"ea9a421e7f8319ef32a7bd5aeaf6f1d5"},{url:"/fi-sr-home-active.svg",revision:"410d2cd8af220125ce103b0669f90512"},{url:"/fi-sr-home.svg",revision:"afa5bfeb3570bfcba109b83eb792e70c"},{url:"/fi-sr-live-active.svg",revision:"dc8b1c3d5e5a72ae15875dc3ab2f1e64"},{url:"/fi-sr-live.svg",revision:"584d47f4334e5e03383e5bb06afab5dd"},{url:"/fi-sr-menu-burger.svg",revision:"2b8653d7c136d46ad519fbe29429640c"},{url:"/fi-sr-new-bell.svg",revision:"c78725cc8855224509fcf066f97a750d"},{url:"/fi-sr-pencil.svg",revision:"6229aab28dbd80afee61035712a234cd"},{url:"/fi-sr-play-alt-active.svg",revision:"38ca3559e5d3940fd634db947a74a1a4"},{url:"/fi-sr-play-alt.svg",revision:"557ee7edda626fa2bc6e103d04ef227f"},{url:"/fi-sr-sellers-active.svg",revision:"b531225364f47d726881cab91235505b"},{url:"/fi-sr-sellers.svg",revision:"d3d0d9030f1dadb7cf9b557c6c342c27"},{url:"/fi-sr-shopping-cart.svg",revision:"6d357205e61d1db3c77457eda2cba67f"},{url:"/google_login.png",revision:"ec06b550f90e020ff924ab617d2d6300"},{url:"/google_login_medium_wide.png",revision:"42cbbbf89d71403180c54579bb5e8b81"},{url:"/icon-192x192.png",revision:"81e90131acc96f7eddb0886bd13442de"},{url:"/icon-256x256.png",revision:"b28836c9d349bd6fef365b1c2dd7af0f"},{url:"/icon-384x384.png",revision:"0414c0dc8c18ed49b6f89c0b0e08816c"},{url:"/icon-512x512.png",revision:"c07ab20f71a6945e1bba0caf5bd8dd39"},{url:"/jeontongju_notfound.png",revision:"9aca851c2d31614f8580c9e6986c1d52"},{url:"/kakao_login_medium_wide.png",revision:"b563e3748ac61da49fbc80b1ac84fe82"},{url:"/kakaotalK.png",revision:"94d0a27407acef0b18008de537319f9d"},{url:"/kakaotalk_sharing_btn_small_ov.png",revision:"dc85995b49b893794ab7125ae8ed60f2"},{url:"/live_before.mp4",revision:"584992422ab5b5f9454fafdee628d97a"},{url:"/loading.gif",revision:"4adb75409be45bceca58679e587b21af"},{url:"/logo.png",revision:"ef9bc95d2caa12a44f9e17a15cd22ad0"},{url:"/manifest.json",revision:"1b83964210650d45bfed5b78a2a17fc3"},{url:"/membership_banner.png",revision:"4bab9630b1d92f4631f1eb81a2e642b1"},{url:"/membership_delivery.gif",revision:"3f5fbb4eebb7bb7f0051ea52a92fa296"},{url:"/membership_point.gif",revision:"29664c40c04f12cf074b92d79c68f70e"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/not_found.mp4",revision:"a4df87f58eaff8d1d355b70b74ac3b02"},{url:"/order_fail.gif",revision:"aea599369582306c302f8ca234e8ecdd"},{url:"/order_success.gif",revision:"78e22e403e7620823b78c85cceb0bd2a"},{url:"/success.png",revision:"23ea6581c904d2ed7d89a64763ce5a2d"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
