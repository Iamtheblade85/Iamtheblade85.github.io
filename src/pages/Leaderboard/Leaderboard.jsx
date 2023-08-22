import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { UserService } from "../../UserService";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import Loader from "./../../components/Loader/Loader";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const { name } = useSelector((store) => store.user);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(-1);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const updatePlayersData = () => {
    UserService.getPlayers()
      .then((players) => {
        const sorted = players?.rows.sort(
          (a, b) => b.leaderboardpts - a.leaderboardpts
        );
        setLeaders(sorted);
        if (players?.rows.length > 0) {
          const index = players?.rows.findIndex(
            (player) => player.player === name
          );
          if (index >= 0) {
            setCurrentPlayerIndex(index);
            setCurrentPlayer(players?.rows[index]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to get players");
      });
  };

  useEffect(() => {
    updatePlayersData();
    const interval = setInterval(updatePlayersData, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className={styles.container_leaderboard}>Leaderboard</h1>
      <table className={styles.container_playersTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Season Earnings</th>
          </tr>
        </thead>
        <tbody>
        {currentPlayerIndex >= 10 && (
            <tr className={styles.container_playersTable_currentTr}>
              <td>{currentPlayerIndex + 1 }</td>
              <td>{currentPlayer?.player}</td>
              <td>{currentPlayer?.leaderboardpts}</td>
            </tr>
          )}
          {leaders ? (
            leaders?.map((player, index) => (
              <tr key={player.player}>
                <td>{index + 1}</td>
                <td>{player.player}</td>
                <td>{player.leaderboardpts}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <Loader size={50} />
              </td>
              <td>
                <Loader size={50} />
              </td>
              <td>
                <Loader size={50} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <table className={styles.container_playersTable}>
        <tbody style={{ borderTop: "1px solid #fffb00" }}>
          {currentPlayerIndex >= 10 && (
            <tr>
              <td>{currentPlayerIndex + 1 }</td>
              <td>{currentPlayer?.player}</td>
              <td>{currentPlayer?.leaderboardpts}</td>
            </tr>
          )}
        </tbody>
      </table> */}
    </motion.div>
  );
};

export default Leaderboard;
