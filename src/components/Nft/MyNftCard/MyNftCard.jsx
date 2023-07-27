import { useRef, useState } from "react";
import styles from "./styles.module.scss";
import Button from "../../Button/Button";
import { motion } from "framer-motion";
import ViewNftDetailsModal from "../../Modal/ViewNftDetailsModal/ViewNftDetailsModal";
import Checkbox from "../../Checkbox/Checkbox";

const Nft = ({
  nft,
  buttonLoader,
  image,
  functional,
  stakeMinesIntoSlot,
  stakeSlot,
  unstakeSlot,
  // unstakeMine,
  burnNft,
  onSelect,
  selected,
  stakedSlot,
  fullSlot,
  // miningNft,
}) => {
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

  const shouldShowCheckbox =
    nft?.data.name === "ChaosX-18 Mine Aurum" ||
    nft?.data.name === "ChaosX-18 Mine Celium" ||
    (nft?.data.name === "ChaosX-18 Building Slot " && stakedSlot === false);

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
        {functional && shouldShowCheckbox && (
          <Checkbox checked={selected} onChange={onSelect} />
        )}
        <img
          rel="preload"
          src={image ? image : ""}
          alt={image ? nft.data.name + "'s image" : "no image"}
        />
        <div className={styles.container_mainInfo}>
          <h2 className={styles.container_mainInfo_nftName}>
            {nft?.data.name}
          </h2>
          <span
            className={styles.container_mainInfo_description}
            onClick={openDescriptionModal}
          >
            Details
          </span>
          {functional && (
            <>
              {nft?.data.name === "ChaosX-18 Building Slot " &&
              stakedSlot === false ? (
                <Button
                  onClick={() => stakeSlot(nft)}
                  loader={buttonLoader}
                  size="auto"
                  color="blue"
                >
                  Stake Slot
                </Button>
              ) : nft?.data.name === "ChaosX-18 Building Slot " &&
                fullSlot === false &&
                stakedSlot === true ? (
                <>
                  <Button
                    onClick={() => stakeMinesIntoSlot(nft)}
                    loader={buttonLoader}
                    size="auto"
                    color="blue"
                  >
                    Stake Mines
                  </Button>
                </>
              ) : nft?.data.name === "ChaosX-18 Building Slot " &&
                fullSlot === true &&
                stakedSlot === true ? (
                <>
                  <Button
                    onClick={() => unstakeSlot(nft)}
                    loader={buttonLoader}
                    size="auto"
                    color="blue"
                  >
                    Unstake Slot
                  </Button>
                </>
              ) : (
                ""
              )}
              {nft?.data.name === "Teleport to ChaosX-18" && (
                <Button
                  onClick={() => burnNft(nft)}
                  loader={buttonLoader}
                  size="auto"
                  color="blue"
                >
                  Burn
                </Button>
              )}
            </>
          )}
          {/* {functional === false && miningNft === true && (
            <Button
              onClick={() => unstakeMine(nft)}
              loader={buttonLoader}
              size="auto"
              color="blue"
            >
              Unstake Mine
            </Button>
          )} */}
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
