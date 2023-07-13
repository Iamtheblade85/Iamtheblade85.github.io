import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LogoIcon from "../../assets/images/icons/logo.png";
import hamburgerIcon from "../../assets/images/icons/icons8-menu-48.png";
import closeIcon from "../../assets/images/icons/icons8-close-48.png";

import { UserService } from "../../UserService";

import styles from "./styles.module.scss";

import ConnectWalletModal from "../Modal/ConnectWalletModal/ConncetWalletModal";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import { setPlayerIsLogged } from "../../GlobalState/UserReducer";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, balance, waxConnected, anchorConnected } = useSelector(
    (store) => store.user
  );
  // const { id } = useSelector((store) => store.player);
  const [waxModalOpen, setWaxModalOpen] = useState(false);
  const [menuPlayerOpen, setMenuPlayerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // const userConnect = !!id;
  const walletConnect = !!(waxConnected || anchorConnected);

  const menuArray = [
    {
      isShow: walletConnect,
      link: "/player-profile",
      title: "Player Profile",
    },
    {
      isShow: walletConnect,
      link: "/my-nfts",
      title: "My Nfts",
    },
    {
      isShow: true,
      link: "/game-rules",
      title: "Game Rules",
    },
    {
      isShow: true,
      link: "/leaderboard",
      title: "Leaderboard",
    },
  ];

  const onHandleLogout = () => {
    UserService.logout();
    dispatch(setPlayerIsLogged(false));
    navigate("/home", { replace: true });
  };

  const openWaxModal = () => {
    setWaxModalOpen(true);
  };

  const closeWaxModal = () => {
    setWaxModalOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (menuPlayerOpen) {
      setMenuPlayerOpen(false);
    }
  };

  return (
    <>
      <nav className={styles.container}>
        <div className={styles.container_navbar}>
          <div className={styles.container_navbar_logoDiv}>
            <img
              rel="preload"
              alt="no icon"
              src={LogoIcon}
              onClick={
                walletConnect ? () => navigate("/home") : () => navigate("/")
              }
            />
            {(waxConnected || anchorConnected) && (
              <div className={styles.container_navbar_logoDiv_walletBalance}>
                {UserService.testnet && (
                  <p style={{ textAlign: "center" }}>
                    Hi {name} <br /> Wallet: {balance}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className={styles.container_navbar_menus}>
            <div className={styles.container_navbar_menus_dropDown}>
              {!menuOpen ? (
                <img
                  rel="preload"
                  onClick={toggleMenu}
                  className={
                    styles.container_navbar_menus_dropDown_openHamburger
                  }
                  src={hamburgerIcon}
                  alt="hamburger icon"
                />
              ) : (
                <img
                  rel="preload"
                  onClick={toggleMenu}
                  className={
                    styles.container_navbar_menus_dropDown_closeHamburger
                  }
                  src={closeIcon}
                  alt="close icon"
                />
              )}
              {menuOpen && (
                <DropdownMenu
                  closeMenu={toggleMenu}
                  openWaxModal={openWaxModal}
                  onHandleLogout={onHandleLogout}
                  menuList={menuArray}
                />
              )}
            </div>
          </div>
        </div>
      </nav>

      {waxModalOpen && <ConnectWalletModal onClose={closeWaxModal} />}
    </>
  );
};
