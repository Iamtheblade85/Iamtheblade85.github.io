import { useRef, useState } from "react";
import styles from "./styles.module.scss";
import Button from "../../Button/Button";
import { motion } from "framer-motion";
import ViewNftDetailsModal from "../../Modal/ViewNftDetailsModal/ViewNftDetailsModal";

const Nft = ({ nft, buttonLoader, image, stakeNft, burnNft }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const scrollRef = useRef(null);

  const cardTransition = {
    type: "spring",
    ease: "easeInOut",
    damping: 30,
  };
  const Variants = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  };

  const openDescriptionModal = () => {
    setModalOpen(true);
  };
  const closeDescriptionModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <motion.div
        className={styles.container}
        transition={cardTransition}
        viewport={{ root: scrollRef, once: true }}
        variants={Variants}
        initial="initial"
        whileInView="whileInView"
      >
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
                onClick={() => stakeNft(nft)}
                loader={buttonLoader}
                size="auto"
                color="blue"
              >
                Stake
              </Button>
              <Button
                onClick={() => burnNft(nft)}
                loader={buttonLoader}
                size="auto"
                color="blue"
              >
                Burn
              </Button>
            </>
          )}
        </div>
      </motion.div>
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
