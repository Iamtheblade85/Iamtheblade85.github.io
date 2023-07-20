import { useRef } from "react";
import { useDispatch } from "react-redux";
import waxIcon from "../../../assets/images/icons/wax_icon.png";
import closeIcon from "../../../assets/images/icons/icons8-close-48.png";
import anchorIcon from "../../../assets/images/icons/anchor_icon.png";

import styles from "./styles.module.scss";
import { motion } from "framer-motion";

import { UserService } from "../../../UserService";
import {
  setAnchorConnected,
  setPlayerIsLogged,
  setWaxConnected,
  setWaxData,
} from "../../../GlobalState/UserReducer";
import Button from "../../Button/Button";
import { toast } from "react-toastify";

const ConnectWalletModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const modalTransition = {
    type: "spring",
    ease: "easeInOut",
    damping: 30,
  };

  const connectWaxWallet = async () => {
    const waxAddress = await UserService.waxLogin();
    const waxBalance = await UserService.getWaxBalance(waxAddress);

    dispatch(
      setWaxData({
        name: waxAddress,
        isLogged: true,
        waxBalance: waxBalance,
      })
    );
    dispatch(setWaxConnected(true));
    dispatch(setAnchorConnected(false));
    onClose();

    const players = await UserService.getPlayers().then((players) => {
      return players.rows;
    });
    if (players.some((player) => player.player === waxAddress)) {
      await UserService.loginAccount(waxAddress, false);
      dispatch(setPlayerIsLogged(true));
    } else {
      toast.error("Wax wallet is not connected");
      dispatch(setPlayerIsLogged(false));
    }
  };

  const connectAnchorWallet = async () => {
    const wallet = await UserService.anchorConnect();
    if (wallet) {
      const waxAddress = wallet?.session.auth.actor.toString();

      dispatch(
        setWaxData({
          name: waxAddress,
          isLogged: true,
          balance: await UserService.getWaxBalance(waxAddress),
        })
      );
      dispatch(setAnchorConnected(true));
      dispatch(setWaxConnected(false));
      onClose();

      const players = await UserService.getPlayers().then((players) => {
        return players.rows;
      });
      if (players.some((player) => player.player === waxAddress)) {
        await UserService.loginAccount(waxAddress, true);
        dispatch(setPlayerIsLogged(true));
      } else {
        toast.error(
          "Player doesn't exist, burn season pass nft to create an account"
        );
        dispatch(setPlayerIsLogged(false));
      }
    } else {
      toast.error("Anchor wallet is not connected");
      dispatch(setPlayerIsLogged(false));
    }
  };

  return (
    <motion.div
      transition={modalTransition}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      ref={modalRef}
      className={styles.container}
      onClick={onClose}
    >
      <div
        className={styles.container_modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.container_modal_modalHeader}>
          <h3>Choose your wallet</h3>
          <img
            rel="preload"
            className={styles.container_modal_modalHeader_close}
            src={closeIcon}
            onClick={onClose}
            alt="close icon"
          />
        </div>
        <div className={styles.container_modal_modalBody}>
          <div onClick={connectWaxWallet}>
            <img rel="preload" src={waxIcon} alt="wax connect icon" />
            <h5>Wax Cloud Wallet</h5>
          </div>
          <div onClick={connectAnchorWallet}>
            <img rel="preload" src={anchorIcon} alt="anchor connect icon" />
            <h5>Anchor Wallet</h5>
          </div>
        </div>
        <div className={styles.container_modal_modalFooter}>
          <Button onClick={onClose} size="medium" color="blue">
            Close
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ConnectWalletModal;
