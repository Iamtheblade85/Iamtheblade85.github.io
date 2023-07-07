import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import LogoIcon from "../../assets/images/icons/logo.png";
// import defaultUser from "../../assets/images/icons/default_user.png";
import hamburgerIcon from "../../assets/images/icons/icons8-menu-48.png";
import closeIcon from "../../assets/images/icons/icons8-close-48.png";

import { UserService } from "../../UserService";

import styles from "./styles.module.scss";

import ConnectWalletModal from "../Modal/ConnectWalletModal/ConncetWalletModal";
// import UserDropdownMenu from "./UserDropdownMenu/UserDropdownMenu";
import DropdownMenu from "./DropdownMenu/DropdownMenu";

export const Navbar = () => {
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
      link: "/my-nfts",
      title: "My Nfts",
    },
    // {
    //   isShow: walletConnect,
    //   link: "/staging-nfts",
    //   title: "Staging Nfts",
    // },
    // {
    //   isShow: !userConnect,
    //   link: "/login",
    //   title: "Login",
    // },
    // {
    //   isShow: !userConnect,
    //   link: "/signup",
    //   title: "Signup",
    // },
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
    navigate("/home", { replace: true });
    // navigate("/", { replace: true });
  };

  const openWaxModal = () => {
    setWaxModalOpen(true);
  };

  const closeWaxModal = () => {
    setWaxModalOpen(false);
  };

  // const togglePlayerMenu = () => {
  //   setMenuPlayerOpen(!menuPlayerOpen);
  //   if (menuOpen) {
  //     setMenuOpen(false);
  //   }
  // };

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
                // walletConnect ? () => navigate("/my-nfts") : () => navigate("/")
              }
            />
            {(waxConnected || anchorConnected) && (
              <div className={styles.container_navbar_logoDiv_walletBalance}>
                {UserService.testnet && (
                  <p>
                    Website is currently using WAX TestNet
                    <br />
                    {name} - Wallet: {balance}
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
            {/* 
            {id && (
              <>
                <div className={styles.container_navbar_menus_line}></div>
                <div className={styles.container_navbar_menus_userDropDown}>
                  <img
                    rel="preload"
                    onClick={togglePlayerMenu}
                    src={defaultUser}
                    alt="user icon"
                  />
                  {menuPlayerOpen && (
                    <UserDropdownMenu closeMenu={togglePlayerMenu} />
                  )}
                </div>
              </>
            )} */}
          </div>
        </div>
      </nav>

      {waxModalOpen && <ConnectWalletModal onClose={closeWaxModal} />}
    </>
  );
};
