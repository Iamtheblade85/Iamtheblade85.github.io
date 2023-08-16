import React, { useEffect, useState } from "react";
import { User, UserService } from "../../UserService";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";

import Loader from "../../components/Loader/Loader";
import { getMyNfts } from "../../GlobalState/NftsSlice/nftsSlice";
import RequiredNftModal from "../../components/Modal/RequiredNftModal/RequiredNftModal";
import NoDataMessage from "./../../components/NoDataMessage/NoDataMessage";
import Button from "../../components/Button/Button";
import WithdrawAmountModal from "../../components/Modal/WithdrawAmountModal/WithdrawAmountModal";
import { toast } from "react-toastify";
const Mining = React.lazy(() => import("../../components/Mining/Mining"));

const PlayerProfile = () => {
  const dispatch = useDispatch();
  const [allMines, setAllMines] = useState([]);
  const [player, setPlayer] = useState(null);
  const [buttonLoader, setButtonLoader] = useState(null);
  const { name, waxConnected, anchorConnected } = useSelector(
    (state) => state.user
  );
  const [modalIsOpen, setIsOpen] = useState(false);
  const pollingInterval = 10000;

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // withdraw all
  const withdrawAllWithAnchor = (player) => {
    if (buttonLoader) return;

    setButtonLoader(player.player);
    User.anchorSession
      ?.transact(
        {
          actions: [
            {
              account: "xcryptochaos",
              name: "withdraw",
              authorization: [
                {
                  actor: User.anchorSession?.auth?.actor.toString(),
                  permission: "active",
                },
              ],
              data: {
                player: User.anchorSession?.auth?.actor.toString(),
                amount: player.prev_leaderboardpts,
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      )
      .then((_) => {
        toast.success("Withdraw all completed");
        setButtonLoader(null);
      })
      .catch((_) => {
        setButtonLoader(null);
      });
  };

  const withdrawAllWithWaxCloud = (player) => {
    if (buttonLoader) return;

    setButtonLoader(player.player);
    User.wax.api
      .transact(
        {
          actions: [
            {
              account: "xcryptochaos",
              name: "withdraw",
              authorization: [
                {
                  actor: User.wax?.userAccount,
                  permission: "active",
                },
              ],
              data: {
                player: User.wax?.userAccount,
                amount: player.prev_leaderboardpts,
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      )
      .then((_) => {
        toast.success("Withdraw all completed");
        setButtonLoader(null);
      })
      .catch((_) => {
        setButtonLoader(null);
      });
  };

  const withdrawAll = () => {
    if (waxConnected) {
      withdrawAllWithWaxCloud(player);
    } else if (anchorConnected) {
      withdrawAllWithAnchor(player);
    }
  };

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
      <div className={styles.container_mainInfo}>
        <div className={styles.container_mainInfo_mines}>
          <h2>Mined</h2>
          <div>
            <p>Aurum: {!player ? 0 : player.aurum.slice(0, -4)}</p>
            <p>Celium: {!player ? 0 : player.celium.slice(0, -4)}</p>
          </div>
        </div>
        <div className={styles.container_mainInfo_earnings}>
          <h2>Gains</h2>
          <div>
            <p>Last: {!player ? 0 : player.prev_leaderboardpts.slice(0, -4)}</p>
            <p>Current: {!player ? 0 : player.leaderboardpts.slice(0, -4)}</p>
          </div>
        </div>
      </div>
      <div className={styles.container_btnWrapper}>
        <Button onClick={openModal} size="fit" color="blue" disabled={!player}>
          Withdraw
        </Button>
        <Button
          onClick={withdrawAll}
          size="fit"
          color="blue"
          disabled={!player}
        >
          Withdraw all
        </Button>
      </div>
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
      {player?.season_asset_id === 0 && <RequiredNftModal />}
      {modalIsOpen && (
        <WithdrawAmountModal player={player} onClose={closeModal} />
      )}
    </motion.div>
  );
};

export default PlayerProfile;
