import React, { useEffect, useState } from "react";
import { UserService } from "../../UserService";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";

import Loader from "../../components/Loader/Loader";
import { getMyNfts } from "../../GlobalState/NftsSlice/nftsSlice";
import RequiredNftModal from "../../components/Modal/RequiredNftModal/RequiredNftModal";
import NoDataMessage from "./../../components/NoDataMessage/NoDataMessage";
const Mining = React.lazy(() => import("../../components/Mining/Mining"));

const PlayerProfile = () => {
  const dispatch = useDispatch();
  const [allMines, setAllMines] = useState([]);
  const [player, setPlayer] = useState(null);
  const { name } = useSelector((state) => state.user);
  const { myNfts } = useSelector((state) => state.nfts);
  const pollingInterval = 10000;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mines, players] = await Promise.all([
          UserService.getMines(name),
          UserService.getPlayers(),
        ]);

        if (mines) {
          setAllMines(mines);
        }

        if (players && players.rows) {
          const data = players.rows.find((player) => player.player === name);
          setPlayer(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, pollingInterval);
    return () => clearInterval(intervalId);
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
            <h2>Mined</h2>
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
          <div className={styles.container_mainInfo_earnings}>
            <h2>Earnings</h2>
            <div>
              <p>Last Season: {player.last_season_earning}</p>
              <p>Current Season: {player.curr_season_earning}</p>
            </div>
          </div>
        </div>
      )}
      <h2 className={styles.container_mining}>Mining</h2>
      <div className={styles.container_miningWrapper}>
        {allMines[0] ? (
          allMines.map((mine) => {
            return (
              <div key={mine.id}>
                <React.Suspense fallback={<Loader size={250} />}>
                  <Mining mine={mine ? mine : {}} />
                </React.Suspense>
              </div>
            );
          })
        ) : (
          <NoDataMessage message="Stake Mines into Building Slot to see your mines" />
        )}
      </div>
      {myNfts[0] &&
        !myNfts.some((nft) => nft.name === "Teleport to ChaosX-18") && (
          <RequiredNftModal />
        )}
    </motion.div>
  );
};

export default PlayerProfile;
