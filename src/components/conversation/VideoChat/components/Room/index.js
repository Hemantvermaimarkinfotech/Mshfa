import "./index.scss";

import React, { useEffect, useState } from "react";
import { Mic, MicOff, Videocam, VideocamOff } from "@material-ui/icons";

import { useUser } from "hooks/user";
import { getSecondsToTime } from "utils/date";

import Participant from "../Participant";
import RemoteParticipant from "../RemoteParticipant";
import declineCall from "assets/images/decline-call.svg";

const Room = ({ room, onDecline, remoteMuted, remotedCameraOn, endTime }) => {
  const { user } = useUser();
  const [countDown, setCountDown] = useState({ minutes: "--", seconds: "--" });

  useEffect(() => {
    // Countdown with the time when should the session ends
    if (endTime) {
      let myInterval = setInterval(() => {
        const timeLeft = getSecondsToTime(endTime);
        if (timeLeft < 0) {
          setCountDown({ minutes: 0, seconds: "00" });
          clearInterval(myInterval);
        } else if (timeLeft === 0) {
          setCountDown({ minutes: "--", seconds: "--" });
        } else {
          const minutes = Math.trunc(timeLeft / 60);
          const seconds = String(timeLeft % 60).padStart(2, "0");
          setCountDown({ minutes, seconds });
        }
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    }
  }, [endTime]);

  const [patient, setPatient] = useState(null);
  const [muted, setMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);

  // Sets up event listeners for when a participant connects or disconnects from the video room.
  useEffect(() => {
    // Calls onPatientConnected when a participant connects.
    room.on("participantConnected", onPatientConnected);
    // Calls onPatientDisconnected when a participant disconnects.
    room.on("participantDisconnected", onPatientDisconnected);
    // Iterates through the participants in the room and calls onPatientConnected for each of them.
    room.participants.forEach(onPatientConnected);
  }, [room]);

  const onPatientConnected = (participant) => {
    setPatient(participant);
  };

  const onPatientDisconnected = (participant) => {
    setPatient(null);
  };

  const handleToggleMute = () => {
    setMuted((prevState) => !prevState);
  };

  const handleToggleCamera = () => {
    setCameraOn((prevState) => !prevState);
  };
  return (
    <div className={"room"}>
      {endTime && (
        <div className="room__countdown">
          <span>{countDown.minutes}</span>
          <span>:</span>
          <span>{countDown.seconds}</span>
        </div>
      )}
      <div className="room__me">
        {room && (
          <Participant
            participant={room.localParticipant}
            key={room.localParticipant.sid}
            width={120}
            height={90}
            muted={muted}
            cameraOn={cameraOn}
            noCameraImage={user.avatar}
          />
        )}
      </div>
      <div className="room__patient">
        {patient && (
          <RemoteParticipant
            muted={remoteMuted}
            cameraOn={remotedCameraOn}
            participant={patient}
            key={patient.sid}
            width={400}
            height={300}
          />
        )}
      </div>
      <div className="room__actions">
        <div
          className="room__action room__action--mute"
          onClick={handleToggleMute}
        >
          {muted ? <MicOff /> : <Mic />}
        </div>
        <div className="room__action room__action--decline" onClick={onDecline}>
          <img src={declineCall} alt="decline call" />
        </div>
        <div
          className="room__action room__action--camera"
          onClick={handleToggleCamera}
        >
          {cameraOn ? <Videocam /> : <VideocamOff />}
        </div>
      </div>
    </div>
  );
};

export default Room;
