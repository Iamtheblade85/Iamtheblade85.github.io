import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.scss';
import { motion } from "framer-motion"

import { logoutPlayer } from '../../../GlobalState/PlayerSlice/playerSlice';
import { setPlayerIsLogged, setToken } from '../../../GlobalState/UserReducer';

const UserDropdownMenu = ({ closeMenu }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { username, email } = useSelector((store) => store.player);
  const dropdownRef = useRef(null);
  const infoTransition = {
    type: "spring", ease: "easeInOut", damping: 30
  }

  useEffect(() => {
    return () => closeMenu()
  }, [closeMenu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.parentElement.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closeMenu]);

  const playerLogout = () => {
    dispatch(logoutPlayer())
    dispatch(setPlayerIsLogged(false))
    dispatch(setToken())
    navigate('/')
  }

  return (
    <motion.div
      transition={infoTransition}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.dropdownMenu}
      ref={dropdownRef}
    >
      <div className={styles.dropdownMenu_playerName}>
        Player: {username || email}
      </div>
      <div className={styles.dropdownMenu_line}></div>
      <div className={styles.dropdownMenu_dropdownBody}>
        <span onClick={() => navigate('/player-profile')}>
          Player Profile
        </span>
      </div>
      <div className={styles.dropdownMenu_line}></div>
      <span onClick={playerLogout}>
        Logout
      </span>
    </motion.div>
  )
}

export default UserDropdownMenu;