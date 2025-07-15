import React, { useState } from "react";
import { getVideos } from "../data";
import "../styles/Videos.css";

const Videos: React.FC = () => {
    const [category, setCategory] = useState<string | null>(null);
    const videos = getVideos().filter((video) => !category || video.category === category);

    return (
        <div className="videos-wrapper">
            <div className="categories">
            <button className= "AllButton" onClick={() => setCategory(null)}>Всі</button>
            <button className="TravellingButton" onClick={() => setCategory("travel")}>Подорожі</button>
            <button className="GamesButton" onClick={() => setCategory("games")}>Ігри</button>
            <button className="MusicButton" onClick={() => setCategory("music")}>Музика</button>
            </div>

            <div className="video-grid">
                {videos.map((video) => (
                    <a className="video-link" key={video.id} href={`/video/${video.id}`}>
                        <img src={video.image} alt={video.title} width="200" />
                        <p>{video.title}</p>
                        <p>{video.author}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Videos;
