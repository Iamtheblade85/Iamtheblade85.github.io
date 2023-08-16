import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { UserService } from "../../UserService";
import styles from "./styles.module.scss";

const Leaderboard = () => {
  const [allPlayers, setAllPlayers] = useState([]);
  const updatePlayersData = () => {
    UserService.getPlayers()
      .then((players) => {
        setAllPlayers(players.rows);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to get players, try again");
      });
  };

  useEffect(() => {
    updatePlayersData();
    const interval = setInterval(updatePlayersData, 10000);
    return () => clearInterval(interval);
  }, []);

  const sortedPlayers = allPlayers.sort(
    (a, b) => b.leaderboardpts - a.leaderboardpts
  );

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
          {sortedPlayers.map((player, index) => (
            <tr key={player.player}>
              <td>{index + 1}</td>
              <td>{player.player}</td>
              <td>{player.leaderboardpts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default Leaderboard;
