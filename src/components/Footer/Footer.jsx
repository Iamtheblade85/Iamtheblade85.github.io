import React from "react";
import discordIcon from "../../assets/images/icons/icons8-discord.svg";
import telegramIcon from "../../assets/images/icons/icons8-telegram-app.svg";
import twitterIcon from "../../assets/images/icons/icons8-twitter.svg";
import neftyBlockIcon from "../../assets/images/icons/NeftyBlocks-icon.png";
import styles from "./styles.module.scss";

export const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <div>
          <a
            href="https://discord.gg/zAvhwmb6ZM"
            target="_blank"
            rel="noreferrer"
          >
            <img src={discordIcon} alt="discord icon" />
          </a>
          <a
            href="https://t.me/outofcontrolnfts"
            target="_blank"
            rel="noreferrer"
          >
            <img src={telegramIcon} alt="telegram icon" />
          </a>
          <a
            href="https://twitter.com/OOC_nfts"
            target="_blank"
            rel="noreferrer"
          >
            <img src={twitterIcon} alt="twitter icon" />
          </a>
          <a
            href="https://neftyblocks.com/collection/cryptochaos1"
            target="_blank"
            rel="noreferrer"
          >
            <img src={neftyBlockIcon} alt="neftyblock icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};
