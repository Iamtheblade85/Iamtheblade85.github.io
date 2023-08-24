import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Home from "../pages/Home/Home";
import MyNftsPage from "../pages/MyNftsPage/MyNftsPage";
import GameRules from "../pages/GameRules/GameRules";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import Welcome from "../pages/Welcome/Welcome";
import Error from "../pages/Error/Error";
import PlayerProfile from "../pages/PlayerProfile/PlayerProfile";

import "../App.scss";

const MyRouters = () => {
  const { waxConnected, anchorConnected } = useSelector((state) => state.user);
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleScroll = () => {
      const newX = Math.random() * 100 - 100;
      const newY = Math.random() * 100 - 100;
      setBackgroundPosition({ x: newX, y: newY });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const allPages = [
    { path: "/", component: Welcome },
    { path: "/home", component: Home },
    { path: "/my-nfts", component: MyNftsPage, type: "wax-loggedin" },
    { path: "/player-profile", component: PlayerProfile, type: "wax-loggedin" },
    { path: "/game-rules", component: GameRules },
    { path: "/leaderboard", component: Leaderboard },
    { path: "/404", component: Error },
  ];

  const pages = allPages?.reduce((newPages, item) => {
    if (!item.type) {
      newPages.push(item);
      return newPages;
    }
    if (!waxConnected || !anchorConnected) {
      newPages.push(item);
      return newPages;
    }
    if ((waxConnected || anchorConnected) && item.type === "wax-loggedin") {
      newPages.push(item);
      return newPages;
    }
    return newPages;
  }, []);

  return (
    <HashRouter>
      <Routes>
        {pages.map(({ component: Component, path }) => (
          <Route
            key={path}
            element={
              path === "/" || path === "/404" ? (
                <Component />
              ) : (
                <div
                  style={{
                    backgroundPositionX: backgroundPosition.x,
                    backgroundPositionY: backgroundPosition.y,
                  }}
                  className="Component"
                >
                  <Navbar />
                  <Component />
                  <Footer />
                </div>
              )
            }
            path={path}
          />
        ))}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default MyRouters;
