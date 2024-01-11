import { EncryptionMode, UID, SDK_MODE } from "agora-rtc-sdk-ng";

const config: configType = {
  uid: 0,
  appId: "86d9c47e47144b7b96d540cf6118d3ae",
  channelName: "test",
  rtcToken:
    "007eJxTYJAv6wldU970bGois1Whr0tF0LuFC79fK73L1v12Xm3UHDMFBguzFMtkE/NUE3NDE5Mk8yRLsxRTE4PkNDNDQ4sU48TUshdzUxsCGRk2W3WzMjJAIIjPwlCSWlzCwAAAaV4gPQ==",
  serverUrl: "",
  proxyUrl: "",
  tokenExpiryTime: 600,
  token:
    "007eJxTYJAv6wldU970bGois1Whr0tF0LuFC79fK73L1v12Xm3UHDMFBguzFMtkE/NUE3NDE5Mk8yRLsxRTE4PkNDNDQ4sU48TUshdzUxsCGRk2W3WzMjJAIIjPwlCSWlzCwAAAaV4gPQ==",
  encryptionMode: "aes-128-gcm2",
  salt: "",
  encryptionKey: "",
  destChannelName: "",
  destChannelToken: "",
  destUID: 2,
  secondChannel: "",
  secondChannelToken: "",
  secondChannelUID: 2,
  selectedProduct: "rtc",
};

export type configType = {
  uid: UID;
  appId: string;
  channelName: string;
  rtcToken: string | null;
  serverUrl: string;
  proxyUrl: string;
  tokenExpiryTime: number;
  token: string;
  encryptionMode: EncryptionMode;
  salt: "";
  encryptionKey: string;
  destUID: number;
  destChannelName: string;
  destChannelToken: string;
  secondChannel: string;
  secondChannelToken: string;
  secondChannelUID: number;
  selectedProduct: SDK_MODE;
};

export default config;
