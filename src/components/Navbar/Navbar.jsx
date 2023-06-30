import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import LogoIcon from '../../assets/images/logo.png';
import defaultUser from '../../assets/images/default_user.png';
import hamburgerIcon from '../../assets/images/hamburger_icon.png';
import closeIcon from "../../assets/images/close_icon.png"

import { UserService } from '../../UserService';

import styles from './styles.module.scss';

import ConnectWalletModal from '../Modal/ConnectWalletModal/ConncetWalletModal';
import UserDropdownMenu from './UserDropdownMenu/UserDropdownMenu';
import DropdownMenu from './DropdownMenu/DropdownMenu';

export const Navbar = () => {
  const navigate = useNavigate();
  const {
    name,
    balance,
    waxConnected,
    anchorConnected
  } = useSelector((store) => store.user);
  const { id } = useSelector((store) => store.player);
  const [waxModalOpen, setWaxModalOpen] = useState(false)
  const [menuPlayerOpen, setMenuPlayerOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const userConnect = !!id
  const walletConnect = !!(waxConnected || anchorConnected)

  const menuArray = [
    {
      isShow: walletConnect,
      link: "/my-nfts",
      title: "My Nfts",
    },
    {
      isShow: userConnect,
      link: "/staging-nfts",
      title: "Staging Nfts",
    },
    {
      isShow: !userConnect,
      link: "/login",
      title: "Login",
    },
    {
      isShow: !userConnect,
      link: "/signup",
      title: "Signup",
    },
    {
      isShow: true,
      link: "/game-rules",
      title: "Game Rules"
    },
    {
      isShow: true,
      link: "/leaderboard",
      title: "Leaderboard"
    }
  ]

  const onHandleLogout = () => {
    UserService.logout();
  }

  const openWaxModal = () => {
    setWaxModalOpen(true)
  }

  const closeWaxModal = () => {
    setWaxModalOpen(false)
  }

  const togglePlayerMenu = () => {
    setMenuPlayerOpen(!menuPlayerOpen)
  }

  const openMenu = () => {
    setMenuOpen(true)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <nav className={styles.container}>
        <div className={styles.container_navbar}>
          <div className={styles.container_navbar_logoDiv}>
            <img
              rel="preload"
              alt="LogoIcon"
              src={LogoIcon}
              onClick={id ? () => navigate("/home") : () => navigate("/")}
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
              {!menuOpen ?
                <img rel="preload" onClick={openMenu} className={styles.container_navbar_menus_dropDown_openHamburger} src={hamburgerIcon} alt="hamburger icon" />
                : <img rel="preload" onClick={closeMenu} className={styles.container_navbar_menus_dropDown_closeHamburger} src={closeIcon} alt="close icon" />
              }
              {menuOpen && (
                <DropdownMenu
                  closeMenu={closeMenu}
                  openWaxModal={openWaxModal}
                  onHandleLogout={onHandleLogout}
                  menuList={menuArray}
                />
              )}
            </div>

            {id && (
              <>
                <div className={styles.container_navbar_menus_line}></div>
                <div className={styles.container_navbar_menus_userDropDown}>
                  <img rel="preload" onClick={togglePlayerMenu} src={defaultUser} alt="" />
                  {menuPlayerOpen && <UserDropdownMenu closeMenu={togglePlayerMenu} />}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {waxModalOpen && (
        <ConnectWalletModal onClose={closeWaxModal} />
      )}
    </>
  );
}