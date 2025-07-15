import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./components/HomePage";
import Videos from "./components/VideosPage";
import VideoPlayer from "./components/VideoPlayerPage";
import Profile from "./components/ProfilePage";
import Header from "./components/Header";

const router = createBrowserRouter([
    { path: "/", element: <><Header /><Home /></> },
    { path: "/videos", element: <><Header /><Videos /></> },
    { path: "/video/:id", element: <><Header /><VideoPlayer /></> },
    { path: "/profile", element: <><Header /><Profile /></> },
]);

const App: React.FC = () => {
    return (
        <div style={{ margin: "0", padding: "0", width: "100vw", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
