import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import { Navbar } from "../components/Navbar/Navbar";
// import PlayerProfile from "../pages/PlayerProfile/PlayerProfile";
import { Home } from "../pages/Home/Home";
// import Login from '../pages/Login/Login';
import MyNftsPage from "../pages/MyNftsPage/MyNftsPage";
import StagingNftsPage from "../pages/StagingNftsPage/StagingNftsPage";
// import Signup from '../pages/Signup/Signup';
import GameRules from "../pages/GameRules/GameRules";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import Welcome from "../pages/Welcome/Welcome";
import "../App.scss";

const MyRouters = () => {
  const { /* playerIsLogged, */ waxConnected, anchorConnected } = useSelector(
    (state) => state.user
  );

  const allPages = [
    { path: "/", component: Welcome },
    // { path: "/login", component: Login, type: "player-not-loggedin" },
    // { path: "/signup", component: Signup, type: "player-not-loggedin" },
    { path: "/home", component: Home },
    { path: "/my-nfts", component: MyNftsPage, type: "wax-loggedin" },
    {
      path: "/staging-nfts",
      component: StagingNftsPage,
      type: "wax-loggedin",
    },
    // {
    //   path: "/player-profile",
    //   component: PlayerProfile,
    //   type: "player-loggedin",
    // },
    { path: "/game-rules", component: GameRules },
    { path: "/leaderboard", component: Leaderboard },
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

    // if (playerIsLogged && item.type === "player-loggedin") {
    //   newPages.push(item);
    //   return newPages;
    // }
    if ((waxConnected || anchorConnected) && item.type === "wax-loggedin") {
      newPages.push(item);
      return newPages;
    }

    // if ((waxConnected || anchorConnected) && item.type === "wax-loggedin") {
    //   newPages.push(item);
    // }
    return newPages;
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {pages.map(({ component: Component, path }) => (
          <Route
            key={path}
            element={
              path === "/" ? (
                <Component />
              ) : (
                <div className="Component">
                  <Navbar />
                  <Component />
                  <Footer />
                </div>
              )
            }
            path={path}
          />
        ))}
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRouters;
