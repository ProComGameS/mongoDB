import React from "react";
import { Link } from "react-router";

const Header: React.FC = () => {
    return (
        <header style={{ padding: "11px", margin: "5px", backgroundColor: "rgba(51,51,51,0.48)", backdropFilter: "blur(10px)" , color: "#fff", display: "flex", justifyContent: "center", gap: "10vw", borderRadius: "15px", position: "fixed" }}>
            <Link to="/" style={{ color: "#fff", textDecoration: "none", fontSize: "20px" }}>Головна</Link>
            <Link to="/videos" style={{ color: "#fff", textDecoration: "none", fontSize: "20px" }}>Відео</Link>
            <Link to="/profile" style={{ color: "#fff", textDecoration: "none", fontSize: "20px" }}>Профіль</Link>
        </header>
    );
};

export default Header;
