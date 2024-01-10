"use client";
// Import necessary modules
import { AgoraRTCProvider } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { AgoraManager } from "./AgoraManager";
import config from "./config";
import { useEffect, useState } from "react";

// Create the AuctionPage component
export default function AuctionPage() {
  // Use useState to manage the Agora RTC client
  const [agora, setAgora] = useState(null);

  // Use useEffect to initialize the Agora RTC client after the component mounts
  useEffect(() => {
    // Check if the window object is defined (client-side)
    if (typeof window !== "undefined") {
      // Initialize the Agora RTC client
      const rtcClient = AgoraRTC.createClient({
        codec: "h264",
        mode: config.selectedProduct,
      });

      // Set the Agora RTC client using useState
      setAgora(rtcClient);
    }
  }, []); // Empty dependency array ensures that this effect runs only once after mount

  // Render the component
  return (
    <div>
      {/* Check if Agora RTC client is available before rendering */}
      {agora && (
        <AgoraRTCProvider client={agora}>
          <AgoraManager config={config}></AgoraManager>
        </AgoraRTCProvider>
      )}
    </div>
  );
}
