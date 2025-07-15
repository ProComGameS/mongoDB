import React, { useRef, useState, useEffect } from "react";
import { IoPlaySharp } from "react-icons/io5";
import { FaPause } from "react-icons/fa6";
import { MdFullscreenExit } from "react-icons/md";
import { FaVolumeHigh } from "react-icons/fa6";
import "../styles/CustomVideoPlayer.css";

const CustomVideoPlayer: React.FC<{ src: string }> = ({ src }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);
    const [initialSize, setInitialSize] = useState<{ width: number; height: number } | null>(null);

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && containerRef.current && initialSize) {
                if (!containerRef.current) return;

                resetStyles(containerRef.current);

                requestAnimationFrame(() => {
                    const el = containerRef.current!;
                    el.style.width = `${initialSize.width}px`;
                    el.style.height = `${initialSize.height}px`;
                    el.style.position = "relative";
                    el.style.margin = "auto";
                    el.style.display = "flex";
                    el.style.justifyContent = "center";
                    el.style.alignItems = "center";
                    el.style.left = "0";
                });
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, [initialSize]);

    const resetStyles = (element: HTMLDivElement) => {
        element.style.width = "";
        element.style.height = "";
        element.style.position = "";
        element.style.margin = "";
        element.style.display = "";
        element.style.justifyContent = "";
        element.style.alignItems = "";
        element.style.left = "";
    };




    const togglePlay = () => {
        if (!videoRef.current) return;
        isPlaying ? videoRef.current.pause() : videoRef.current.play();
        setIsPlaying(!isPlaying);
    };

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        if (videoRef.current) videoRef.current.volume = newVolume;
        setVolume(newVolume);
    };

    const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        if (videoRef.current) videoRef.current.currentTime = newTime;
        setProgress(newTime);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) setProgress(videoRef.current.currentTime);
    };

    const enterFullscreen = () => {
        if (containerRef.current) {
            setInitialSize({
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight,
            });
            containerRef.current.requestFullscreen?.();
        }
    };

    return (
        <div ref={containerRef} className="video-container">
            <video
                ref={videoRef}
                src={src}
                width="100%"
                controls={false}
                onTimeUpdate={handleTimeUpdate}
                className="video-element"
            />
            <div className="controls">
                <button onClick={togglePlay}>{isPlaying ? <FaPause /> : <IoPlaySharp />}</button>
                <input
                    type="range"
                    min="0"
                    max={videoRef.current?.duration || 1}
                    value={progress}
                    onChange={seek}
                    className="progress-bar"
                    style={{
                        background: `linear-gradient(to right, rgba(255,255,255,0.18) 0%, white ${(progress / (videoRef.current?.duration || 1)) * 100}%, rgba(255,255,255,0.18) ${(progress / (videoRef.current?.duration || 1)) * 100}%, rgba(255,255,255,0.18) 100%)`
                    }}
                />
                <FaVolumeHigh />
                <input type="range" min="0" max="1" step="0.1" value={volume} onChange={changeVolume} className="volume-bar" />
                <button onClick={enterFullscreen}><MdFullscreenExit /></button>
            </div>
        </div>
    );
};

export default CustomVideoPlayer;
