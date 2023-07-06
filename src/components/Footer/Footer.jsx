import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SupportDevelopmentModal from '../Modal/SupportDevelopmentModal/SupportDevelopmentModal';
import discordIcon from "../../assets/images/icons/icons8-discord.svg"
import telegramIcon from "../../assets/images/icons/icons8-telegram-app.svg"
import twitterIcon from "../../assets/images/icons/icons8-twitter.svg"
import neftyBlockIcon from "../../assets/images/icons/NeftyBlocks-icon.png"
import styles from "./styles.module.scss";

export const Footer = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { waxConnected, anchorConnected } = useSelector((store) => store.user);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <footer>
      <div className={styles.container}>
        {/* <p>
          Copyright &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://www.archsoftdev.com/"
            target="_blank"
            rel="noreferrer"
          >
            Arch Games
          </a>
        </p> */}

        <div>
          <a href="https://discord.gg/zAvhwmb6ZM" target="_blank"
            rel="noreferrer">
            <img src={discordIcon} alt="discord icon" />
          </a>
          <a href="https://t.me/outofcontrolnfts" target="_blank"
            rel="noreferrer">
            <img src={telegramIcon} alt="telegram icon" />
          </a>
          <a href="https://twitter.com/OOC_nfts" target="_blank"
            rel="noreferrer">
            <img src={twitterIcon} alt="twitter icon" />
          </a>
          <a href="https://neftyblocks.com/collection/cryptochaos1" target="_blank"
            rel="noreferrer">
            <img src={neftyBlockIcon} alt="neftyblock icon" />
          </a>
        </div>

        {(waxConnected || anchorConnected) && (
          <p>
            Support this project by{" "}
            <span onClick={openModal}>
              sending us WAX
            </span>
          </p>
        )}
      </div>



      {modalIsOpen && (
        <SupportDevelopmentModal
          onClose={closeModal}
        />
      )}
    </footer>
  );
}
