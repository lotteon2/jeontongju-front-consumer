"use client";
// Import necessary components and hooks from Agora SDK and React
import {
  RemoteUser,
  useJoin,
  useRTCClient,
  useRemoteUsers,
  useClientEvent,
} from "agora-rtc-react";

import React, { createContext, useContext, useState, useEffect } from "react";
import { IMicrophoneAudioTrack, ICameraVideoTrack } from "agora-rtc-sdk-ng";
import { configType } from "./config";

// Define the shape of the Agora context
interface AgoraContextType {
  localCameraTrack: ICameraVideoTrack | null;
  localMicrophoneTrack: IMicrophoneAudioTrack | null;
  children: React.ReactNode;
}

// Create the Agora context
const AgoraContext = createContext<AgoraContextType | null>(null);

// AgoraProvider component to provide the Agora context to its children
export const AgoraProvider: React.FC<AgoraContextType> = ({
  children,
  localCameraTrack,
  localMicrophoneTrack,
}) => (
  <AgoraContext.Provider
    value={{ localCameraTrack, localMicrophoneTrack, children }}
  >
    {children}
  </AgoraContext.Provider>
);

// Custom hook to access the Agora context
export const useAgoraContext = () => {
  const context = useContext(AgoraContext);
  if (!context)
    throw new Error("useAgoraContext must be used within an AgoraProvider");
  return context;
};

// AgoraManager component responsible for handling Agora-related logic and rendering UI
export const AgoraManager = ({
  config,
  children,
}: {
  config: configType;
  children: React.ReactNode;
}) => {
  // Retrieve local camera and microphone tracks and remote users
  const agoraEngine = useRTCClient();
  const remoteUsers = useRemoteUsers();
  const [role, setRole] = useState("audience"); // Default role is host
  // Join the Agora channel with the specified configuration
  useJoin({
    appid: config.appId,
    channel: config.channelName,
    token: config.rtcToken,
    uid: config.uid,
  });

  useClientEvent(agoraEngine, "user-joined", (user) => {
    console.log("The user", user.uid, " has joined the channel");
  });

  useClientEvent(agoraEngine, "user-left", (user) => {
    console.log("The user", user.uid, " has left the channel");
  });

  useClientEvent(agoraEngine, "user-published", (user, mediaType) => {
    console.log("The user", user.uid, " has published media in the channel");
  });

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
    if (event.target.value === "host") {
      agoraEngine
        .setClientRole("host")
        .then(() => {
          // Your code to handle the resolution of the promise
          console.log("Client role set to host successfully");
        })
        .catch((error) => {
          // Your code to handle any errors
          console.error("Error setting client role:", error);
        });
    } else {
      agoraEngine
        .setClientRole("audience")
        .then(() => {
          // Your code to handle the resolution of the promise
          console.log("Client role set to host successfully");
        })
        .catch((error) => {
          // Your code to handle any errors
          console.error("Error setting client role:", error);
        });
    }
  };

  useEffect(() => {
    console.log("remoteUsers");
    console.log(remoteUsers);
    agoraEngine
      .setClientRole("audience")
      .then(() => {
        // Your code to handle the resolution of the promise
        console.log("Client role set to client successfully");
      })
      .catch((error) => {
        // Your code to handle any errors
        console.error("Error setting client role:", error);
      });
  }, []);

  // Render the AgoraProvider and associated UI components
  return (
    <AgoraProvider>
      {children}
      <div id="videos">
        {remoteUsers.map((remoteUser) => (
          <div
            className="vid"
            style={{ height: 300, width: 600 }}
            key={remoteUser.uid}
          >
            <RemoteUser user={remoteUser} playVideo={true} playAudio={true} />
          </div>
        ))}
      </div>
    </AgoraProvider>
  );
};

// Export the AgoraManager component as the default export
export default AgoraManager;
