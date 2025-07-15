import React from "react";
import { MdOutlineLaptopChromebook } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { FaArrowDown } from "react-icons/fa6";
import { Link } from "react-router";
import "../styles/Home.css";

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <div className="intro-section">
                <h1>Отримуйте доступ до сотень відео</h1>
                <h2>Відео на будь-який смак. Контент який створенний для Вас.</h2>
                <div className="arrow-down">
                    <FaArrowDown size={20} />
                </div>
            </div>

            <div className="grid-section">
                <div className="grid-item">
                    <MdOutlineLaptopChromebook size={45} />
                    <h2>Дивіться</h2>
                    <p>Переглядайте відео з будь-якого пристрою</p>
                </div>
                <div className="grid-item">
                    <IoMdDownload size={45} />
                    <h2>Завантажуйте свої</h2>
                    <p>Діліться контентом зі світом</p>
                </div>
                <div className="grid-item">
                    <AiFillLike size={45} />
                    <h2>Насолоджуйтеся</h2>
                    <p>Контент без обмежень — де завгодно</p>
                </div>
            </div>

            <h1 className="final-heading">Чого чекаєте?</h1>
            <Link className="join-link" to={"/videos"}>
                Приєднуйтеся
            </Link>
        </div>
    );
};

export default Home;
