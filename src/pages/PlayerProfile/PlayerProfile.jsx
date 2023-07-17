import React, { useEffect, useState } from "react";
import { UserService } from "../../UserService";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";

import Loader from "../../components/Loader/Loader";
import { getMyNfts } from "../../GlobalState/NftsSlice/nftsSlice";
import RequiredNftModal from "../../components/Modal/RequiredNftModal/RequiredNftModal";
const Mining = React.lazy(() => import("../../components/Mining/Mining"));

const PlayerProfile = () => {
  const dispatch = useDispatch();
  const [aurum, setAurum] = useState(null);
  const [celium, setCelium] = useState(null);
  const [player, setPlayer] = useState(null);
  const { name } = useSelector((state) => state.user);
  const { myNfts } = useSelector((state) => state.nfts);

  useEffect(() => {
    UserService.getMines(name)
      .then((mines) => {
        if (mines) {
          const aurumMine = mines[0];
          const celiumMine = mines[1];
          setAurum(aurumMine);
          setCelium(celiumMine);
        }
      })
      .catch((error) => console.log(error));
    UserService.getPlayers()
      .then((players) => {
        if (players && players.rows) {
          const data = players.rows.find((player) => player.player === name);
          setPlayer(data);
        }
      })
      .catch((error) => console.log(error));
  }, [name]);

  useEffect(() => {
    dispatch(getMyNfts());
  }, [dispatch]);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {player && (
        <div className={styles.container_mainInfo}>
          <div className={styles.container_mainInfo_mines}>
            <h2>You've mined</h2>
            <div>
              <p>{player.aurum}</p>
              <p>{player.celium}</p>
              <p>{player.chaos}</p>
            </div>
          </div>
          <div className={styles.container_mainInfo_limits}>
            <h2>Capacity</h2>
            <div>
              <p>{player.labAurumLimit} AURUM</p>
              <p>{player.labCeliumLimit} CELIUM</p>
            </div>
          </div>
        </div>
      )}
      <React.Suspense fallback={<Loader size={250} />}>
        <Mining name="Aurum" mine={aurum ? aurum : {}} />
      </React.Suspense>
      <React.Suspense fallback={<Loader size={250} />}>
        <Mining name="Celium" mine={celium ? celium : {}} />
      </React.Suspense>
      {myNfts[0] &&
        !myNfts.some((nft) => nft.name === "Teleport to ChaosX-18") && (
          <RequiredNftModal />
        )}
    </motion.div>
  );
};

export default PlayerProfile;
