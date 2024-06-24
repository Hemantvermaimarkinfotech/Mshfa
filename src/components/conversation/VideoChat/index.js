import React, { useEffect, useState } from "react";
import Video from "twilio-video";
import { datadogRum } from "@datadog/browser-rum";

import { useSnackbar } from "notistack";
import Room from "./components/Room";

const VideoChat = ({
  token,
  roomName,
  onConnected,
  onDisconnected,
  onDecline,
  endTime,
}) => {
  const [room, setRoom] = useState(null);
  const [remoteMuted, setRemoteMuted] = useState(false);
  const [remotedCameraOn, setRemotedCameraOn] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (token) {
      // If there's token connect to a video room using a token and a roomName.
      Video.connect(token, { name: roomName })
        .then((r) => {
          // If successful, sets the state of room to the resulting room object.
          setRoom(r);
          // Sets up a listener for the beforeunload event to disconnect the room before the window is unloaded.
          window.addEventListener("beforeunload", () => {
            r.disconnect();
          });
          // Calls onConnected with the room object.
          onConnected(r);
        })
        //If unsuccessful, shows an error message with the error's message.
        .catch((err) => {
          enqueueSnackbar(String(err.message));
          datadogRum.addError(err.message, {
            tags: {
              twilio: "twilio",
            },
          });
        });
    }
    return () => {
      disconnect();
    };
  }, [token]);

  const disconnect = () => {
    // Sets the current video chat room to null and stops all tracks and disconnects from the room if the local participant is connected,
    setRoom((currentRoom) => {
      if (currentRoom && currentRoom.localParticipant.state === "connected") {
        currentRoom.localParticipant.tracks.forEach(function (
          trackPublication
        ) {
          trackPublication.track.stop();
        });
        currentRoom.disconnect();
        onDisconnected();
        return null;
      } else {
        //Otherwise, it returns the current room.
        return currentRoom;
      }
    });
  };

  const handleDecline = () => {
    disconnect();
    onDecline();
  };

  return (
    <div className={"video-chat"}>
      {room ? (
        <Room
          room={room}
          remoteMuted={remoteMuted}
          remotedCameraOn={remotedCameraOn}
          onDecline={handleDecline}
          endTime={endTime}
        />
      ) : null}
    </div>
  );
};

export default VideoChat;
