import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getMyWorkingNfts } from "../../GlobalState/NftsSlice/nftsSlice";
import buildingSlot from "../../assets/images/nfts/Building-Slot.webp";
import Loader from "../Loader/Loader";
import styles from "./styles.module.scss";

const MyNftCard = React.lazy(() =>
  import("../../components/Nft/MyNftCard/MyNftCard")
);

const Slots = ({ slot, stakeMinesIntoSlot, unstakeSlot, fullSlot }) => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const { myWorkingNfts } = useSelector((state) => state.nfts);
  const slotsTransition = {
    type: "spring",
    ease: "easeInOut",
    damping: 35,
    delay: 0.5,
  };
  const Variants = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  };

  useEffect(() => {
    if (slot) {
      setTimeout(() => {
        dispatch(getMyWorkingNfts(slot.asset_id));
      }, 1000);
    }
  }, [dispatch, slot]);

  return (
    <motion.div
      viewport={{ root: scrollRef, once: true }}
      transition={slotsTransition}
      variants={Variants}
      initial="initial"
      whileInView="whileInView"
      className={styles.container}
    >
      {myWorkingNfts[slot?.asset_id] && (
        <React.Suspense fallback={<Loader size={250} />} key={slot.asset_id}>
          {slot.aur_mine_id !== 0 && slot.cel_mine_id !== 0 ? (
            <MyNftCard
              key={slot?.asset_id}
              nft={myWorkingNfts[slot?.asset_id]}
              image={buildingSlot}
              unstakeSlot={unstakeSlot}
              functional={true}
              stakedSlot={true}
              fullSlot={fullSlot}
            />
          ) : (
            <MyNftCard
              key={slot?.asset_id}
              nft={myWorkingNfts[slot?.asset_id]}
              image={buildingSlot}
              stakeMinesIntoSlot={stakeMinesIntoSlot}
              functional={true}
              stakedSlot={true}
              fullSlot={fullSlot}
            />
          )}
        </React.Suspense>
      )}
    </motion.div>
  );
};

export default Slots;
