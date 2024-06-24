import React, { useState, useEffect, useRef } from "react";

const RemoteParticipant = ({ participant, width, height, muted = false, cameraOn = true, noCameraImage = null }) => {

    const [videoTracks, setVideoTracks] = useState([]);
    const [audioTracks, setAudioTracks] = useState([]);

    const [videoIsEnabled, setVideoIsEnabled] = useState(true);

    const videoRef = useRef();
    const audioRef = useRef();

    const trackpubsToTracks = (trackMap) =>
        Array.from(trackMap.values())
            .map((publication) => publication.track)
            .filter((track) => track !== null);

    useEffect(() => {
        setVideoTracks(trackpubsToTracks(participant.videoTracks));
        setAudioTracks(trackpubsToTracks(participant.audioTracks));

        const trackSubscribed = (track) => {
            if (track.kind === "video") {
                setVideoTracks((videoTracks) => [...videoTracks, track]);
            } else if (track.kind === "audio") {
                setAudioTracks((audioTracks) => [...audioTracks, track]);
            }
        };

        const trackUnsubscribed = (track) => {

            if (track.kind === "video") {
                setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
            } else if (track.kind === "audio") {
                setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
            }
        };

        participant.on("trackSubscribed", trackSubscribed);
        participant.on("trackUnsubscribed", trackUnsubscribed);

        return () => {
            setVideoTracks([]);
            setAudioTracks([]);
            participant.removeAllListeners();
        };
    }, [participant]);

    useEffect(() => {
        const videoTrack = videoTracks[0];
        if (videoTrack) {

            videoTrack.attach(videoRef.current);
            videoTrack.on('enabled', () => {
                setVideoIsEnabled(true);
                videoTrack.attach(videoRef.current);
            });
            videoTrack.on('disabled', () => {
                setVideoIsEnabled(false);
                videoTrack.detach();
            })
            return () => {
                videoTrack.removeAllListeners();
                videoTrack.detach();
            };
        }
    }, [videoTracks]);

    useEffect(() => {
        const audioTrack = audioTracks[0];
        if (audioTrack) {
            audioTrack.attach(audioRef.current);
            return () => {
                audioTrack.detach();
            };
        }
    }, [audioTracks]);

    return (
        <div className="participant">
            {videoIsEnabled && <video ref={videoRef} autoPlay={true} width={width} height={height} />}
            <audio ref={audioRef} autoPlay={true} muted={false} />
        </div>
    );
};

export default RemoteParticipant;