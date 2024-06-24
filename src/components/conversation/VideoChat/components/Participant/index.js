import React, { useState, useEffect, useRef } from "react";

const Participant = ({ participant, width, height, muted = false, cameraOn = true, noCameraImage = null }) => {

    const [videoTracks, setVideoTracks] = useState([]);
    const [audioTracks, setAudioTracks] = useState([]);
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
        if (participant.audioTracks.size) {
            participant.audioTracks.forEach(pub => {
                if (pub.track) {
                    muted ? pub.track.disable() : pub.track.enable();
                }
            });
        }
    }, [muted])

    useEffect(() => {
        if (participant.videoTracks.size) {
            participant.videoTracks.forEach(pub => {
                if (pub.track) {
                    if (cameraOn) {
                        pub.track.enable();
                        pub.track.attach(videoRef.current);
                    } else {
                        pub.track.disable();
                        pub.track.detach();
                    }
                }
            });
        }
    }, [cameraOn, videoRef])

    useEffect(() => {
        const videoTrack = videoTracks[0];
        if (videoTrack) {
            videoTrack.attach(videoRef.current);
            return () => {
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
            {cameraOn && <video ref={videoRef} autoPlay={true} width={width} height={height} />}
            <audio ref={audioRef} autoPlay={true} muted={true} />
        </div>
    );
};

export default Participant;