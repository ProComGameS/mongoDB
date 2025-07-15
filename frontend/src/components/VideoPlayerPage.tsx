import React, { useState } from "react";
import { useParams } from "react-router";
import { getVideos } from "../data";
import CustomVideoPlayer from "../components/CustomVideoPlayer";
import { FaRegStar, FaStar } from "react-icons/fa";
import "../styles/VideoPlayerPage.css";

const VideoPlayer: React.FC = () => {
    const params = useParams();
    const id = params?.id;
    const video = getVideos().find((v) => v.id === id);

    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        setLikes(isLiked ? likes - 1 : likes + 1);
        setIsLiked(!isLiked);
    };

    if (!video) return <h1>Відео не знайдено!</h1>;

    return (
        <div className="video-player-wrapper">
            <h1>{video.title}</h1>
            <CustomVideoPlayer src={video.src} />

            <div className="video-meta">
                <div className="video-author">{video.author}</div>
                <button onClick={handleLike}>
                    {isLiked ? <FaStar /> : <FaRegStar />} {likes}
                </button>
            </div>

            <div className="video-space" />

            <div className="video-description">
                <p>{video.description}</p>
            </div>
        </div>
    );
};

export default VideoPlayer;
