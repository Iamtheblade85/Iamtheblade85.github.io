import { useState } from "react";
import styles from "./styles.module.scss";
import Button from "../../Button/Button";
import ViewNftDetailsModal from "../../Modal/ViewNftDetailsModal/ViewNftDetailsModal";

const Nft = ({ nft, importNft, buttonLoader }) => {
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
        <img rel="preload" src={`https://ipfs.io/ipfs/${nft.data.img}`} alt="nft img" />
        <div className={styles.container_mainInfo}>
          <h2 className={styles.container_mainInfo_nftName}>{nft.data.name}</h2>
          <span className={styles.container_mainInfo_description} onClick={openDescriptionModal}>
            Description
          </span>
          <Button onClick={() => importNft(nft)} loader={buttonLoader} size="auto" color="olive">
            Export into Staging
          </Button>
        </div>
      </div>
      {modalOpen && (
        <ViewNftDetailsModal
          onClose={closeDescriptionModal}
          description={nft.data.description || nft.data.desc}
        />
      )}
    </>
  );
};

export default Nft;
