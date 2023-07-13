import { useState } from "react";
import styles from "./styles.module.scss";
import Button from "../../Button/Button";
import ViewNftDetailsModal from "../../Modal/ViewNftDetailsModal/ViewNftDetailsModal";

const Nft = ({ nft, importNft, buttonLoader, image }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openDescriptionModal = () => {
    setModalOpen(true);
  };

  const closeDescriptionModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <img
          rel="preload"
          src={image ? image : ""}
          alt={image ? nft.data.name + "'s image" : "no image"}
        />
        <div className={styles.container_mainInfo}>
          <h2 className={styles.container_mainInfo_nftName}>{nft.data.name}</h2>
          <span
            className={styles.container_mainInfo_description}
            onClick={openDescriptionModal}
          >
            Details
          </span>
          {!(
            nft.data.name === "ChaosX-18 Level Up token" ||
            nft.data.name === "Teleport to ChaosX-18"
          ) && (
            <>
              <Button
                // onClick={() => importNft(nft)}
                loader={buttonLoader}
                size="auto"
                color="blue"
              >
                Stake
              </Button>
              <Button
                // onClick={() => importNft(nft)}
                loader={buttonLoader}
                size="auto"
                color="blue"
              >
                Burn
              </Button>
            </>
          )}
        </div>
      </div>
      {modalOpen && (
        <ViewNftDetailsModal
          onClose={closeDescriptionModal}
          description={nft.data.description || nft.data.descr || nft.data.desc}
          effect={nft.data.effect ? nft.data.effect : "No effect"}
        />
      )}
    </>
  );
};

export default Nft;
