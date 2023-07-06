import React from "react";
import styles from "./styles.module.scss";
import Button from "../../Button/Button";

const StagingNftCard = ({
  nft,
  exportIntoWallet,
  importIntoGame,
  buttonLoaderIntoWallet,
  buttonLoaderIntoGame
}) => {
  return (
    <div key={nft.id} className={styles.nftBlock}>
      <img rel="preload" src={nft.image} alt={nft.image ? nft.nft_name : "No Image"} />
      <div className={styles.nftBlock_infoValue}>
        <span>Name: </span>
        <span>{nft.nft_name}</span>
      </div>
      <div className={styles.nftBlock_infoValue}>
        <span>Level: </span>
        <span>{nft.level}</span>
      </div>
      <div className={styles.nftBlock_buttonWrapper}>
        <Button
          onClick={() => exportIntoWallet(nft)}
          disabled={
            (buttonLoaderIntoWallet && buttonLoaderIntoWallet !== nft.id) ||
            (buttonLoaderIntoGame && buttonLoaderIntoGame === nft.id)
          }
          loader={buttonLoaderIntoWallet === nft.id}
          size="auto" color="blue"
        >
          Export into Wallet
        </Button>
        <Button
          onClick={() => importIntoGame(nft)}
          disabled={
            (buttonLoaderIntoGame && buttonLoaderIntoGame !== nft.id) ||
            (buttonLoaderIntoWallet && buttonLoaderIntoWallet === nft.id)
          }
          loader={buttonLoaderIntoGame === nft.id}
          size="auto" color="blue"
        >
          Import back into the game
        </Button>
      </div>
    </div>
  );
};

export default StagingNftCard;
