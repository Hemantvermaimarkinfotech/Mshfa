import "./index.scss";

import React, { useEffect, useState, memo } from "react";

import { VideoChat, TextChat } from "components/conversation";
import { BoxLoader } from "components/layout";

const ChatContainer = memo(
  ({
    identity,
    token,
    roomName,
    onDecline,
    isOnCall,
    doctor,
    patient,
    endTime,
  }) => {
    const [isLoading, setLoading] = useState(true);
    const [isVideoChatConnected, setVideoChatConnected] = useState(false);
    const [isTextChatConnected, setTextChatConnected] = useState(false);

    useEffect(() => {
      if (isTextChatConnected) {

        setLoading(false);

      }
      console.log('mannikkkkk',identity)
      console.log('token',token)
      console.log('roommm',roomName)
      console.log('patient',patient)
      console.log('endtime',endTime)
    }, [isTextChatConnected]);

    const handleVideoChatConnected = () => {
      setVideoChatConnected(true);
    };

    const handleVideoChatDisconnected = () => {
      setVideoChatConnected(false);
    };

    const handleTextChatConnected = () => {
      setTextChatConnected(true);
    };

    const renderLoader = () => {
      return (
        <div className={"chat-container__loader"}>
          <BoxLoader />
          <div className="chat-container__loader-text">Connecting</div>
        </div>
      );
    };
    return (
      <div className={"chat-container"}>
        <div
          className={`chat-container__chats ${
            !isLoading ? "chat-container__chats--connected" : ""
          }`}
        >
          {isOnCall && (
            <div className="chat-container__video-layout">
              <VideoChat
                token={token.tokenOfVideo}
                roomName={roomName}
                onDecline={onDecline}
                onConnected={handleVideoChatConnected}
                onDisconnected={handleVideoChatDisconnected}
                endTime={endTime}
              />
            </div>
          )}
          <TextChat
            userName={identity}
            token={token.tokenOfChat}
            channelName={roomName}
            onConnected={handleTextChatConnected}
            doctor={doctor}
            patient={patient}
          />
        </div>
        {isLoading && renderLoader()}
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.isOnCall === nextProps.isOnCall
);

export default ChatContainer;
