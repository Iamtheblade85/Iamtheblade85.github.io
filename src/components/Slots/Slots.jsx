import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import buildingSlot from "../../assets/images/nfts/Building-Slot.webp";
import { useDispatch, useSelector } from "react-redux";
import { getMyWorkingNfts } from "../../GlobalState/NftsSlice/nftsSlice";
import { motion } from "framer-motion";
import Loader from "../Loader/Loader";

const MyNftCard = React.lazy(() =>
  import("../../components/Nft/MyNftCard/MyNftCard")
);

const Slots = ({ slot, stakeMinesIntoSlot, unstakeSlot }) => {
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
            <MyNftCard
              key={slot?.asset_id}
              nft={myWorkingNfts[slot?.asset_id]}
              image={buildingSlot}
              stakeMinesIntoSlot={stakeMinesIntoSlot}
              unstakeSlot={unstakeSlot}
              functional={true}
              stakedSlot={true}
            />
          </React.Suspense>
        )}
    </motion.div>
  );
};

export default Slots;
