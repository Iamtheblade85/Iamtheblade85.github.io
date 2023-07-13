import React from "react";
import styles from "./styles.module.scss";
import { motion } from "framer-motion";

const GameRules = () => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.container_gameRules}>
        <h2>Game Rules: ChaosX-18</h2>
        <ul>
          <li>
            <b>Registration:</b> Each player can have only one game account. It
            is not allowed to sell or share the account.
          </li>
          <li>
            <b>Access to the Game:</b> To access the game, players must own a
            Teleport NFT, which acts as a game pass allowing you to reach the
            mining planet ChaosX-18. This NFT is burned at the end of each game
            season.
          </li>
          <li>
            <b>Aurum and Celium Mines:</b> Each player starts with 2 mine slots,
            one for each type (Aurum and Celium).
          </li>
          <li>
            <b>Slot Building NFT:</b> Players can activate more mines (if owned)
            through the use of the Slot Building NFT. This NFT must be staked in
            the game. The maximum number of Slot Building NFTs a player can own
            is 20.
          </li>
          <li>
            <b>Mine Upgrades:</b> The level of mines can be increased by using
            the resources produced by the mines themselves and a consumable item
            called Upgrade Token NFT (burning). Currently, mines can be upgraded
            up to level 100.
          </li>
          <li>
            <b>Daily Login:</b> Players must log in at least once a day. If the
            production timer hits zero, the mines' production is paused until
            the user's next login.
          </li>
          <li>
            <b>Prize Pool:</b> The prize pool will be defined and published
            within 7 solar days by the staff and can vary from season to season.
          </li>
          <li>
            <b>Rewards:</b> End of season rewards (a solar month) will be paid
            out in Chaos, the token on which the game is based, which is
            directly connected to WAX.
          </li>
          <li>
            <b>Leaderboards:</b> Leaderboards are updated in real time and show
            the cumulative points so far from players and the predicted
            percentage of prize pool share at that given moment.
          </li>
          <li>
            <b>Game Objective:</b> The aim of ChaosX-18 is to expand your empire
            to earn more and more rewards in Chaos cryptocurrency.
          </li>
          <li>
            <b>Privacy:</b> We respect your privacy. We will never share your
            personal information with third parties without your explicit
            consent.
          </li>
          <li>
            <b>Maintenance and Updates:</b> We reserve the right to carry out
            maintenance and updates to the game when necessary. During these
            periods, the game might not be available. We will do our best to
            minimize these downtimes and usually plan them during off-peak hour
          </li>
          <li>
            <b>Support and Official Channels:</b> For support or any questions
            regarding the game, you can reach out to us through our official
            channels. Information about the Chaos token and its uses can also be
            found on our official channels.
          </li>
        </ul>
        <p>
          Please respect all rules and play in a fair and respectful way.
          Remember, the most important thing is to have fun!
        </p>
      </div>
      <div className={styles.container_gameInstructions}>
        <h2>Game Instructions: ChaosX-18</h2>
        <ul>
          <li>
            <b>Account Access:</b> Log in to the game using your WAX account. No
            additional registration is required.
          </li>
          <li>
            <b>Teleport NFT:</b> Obtain a Teleport NFT to access the game. This
            acts as a game pass, allowing you to reach the mining planet
            ChaosX-18. This NFT will be burned at the end of each game season.
          </li>
          <li>
            <b>Aurum and Celium Mines:</b> Start your game with 2 mine slots,
            one for each type - Aurum and Celium.
          </li>
          <li>
            <b>Slot Building NFT:</b> If you have more mines, you can activate
            them using the Slot Building NFT. Stake this NFT in the game to use
            it. You can own a maximum of 20 Slot Building NFTs.
          </li>
          <li>
            <b>Game Items:</b> All game items, including the Teleport NFT and
            Slot Building NFT, can be found for sale in our official drop, or in
            the secondary markets on neftyblocks.com and wax.atomichub.io.
          </li>
          <li>
            <b>Mine Upgrades:</b> Increase your mine levels by using the
            resources produced by your mines, along with a consumable item known
            as Upgrade Token NFT. Remember, you can upgrade your mines up to
            level 100 as of now.
          </li>
          <li>
            <b>Daily Login:</b> Be sure to log in at least once a day. If you
            miss logging in, and the production timer hits zero, your mines'
            production will pause until your next login.
          </li>
          <li>
            <b>Prize Pool:</b> Stay updated about the prize pool, which will be
            defined and published by the staff within 7 solar days. The prize
            pool can vary each season.
          </li>
          <li>
            <b>Rewards:</b> Play and aim for the end-of-season rewards, which
            are paid out in Chaos, the token that the game is based on. Chaos is
            directly connected to WAX.
          </li>
          <li>
            <b>Chaos Token Utility:</b> The Chaos token has various utilities
            within the game. For detailed information, please refer to our
            official channels.
          </li>
          <li>
            <b>Leaderboards:</b> Keep track of your progress and standing in the
            game by checking the live leaderboards. They show players'
            cumulative points and the predicted percentage of the prize pool
            share.
          </li>
          <li>
            <b>Game Objective:</b> Your aim in ChaosX-18 is to continually
            expand your empire, earning more and more rewards in Chaos
            cryptocurrency.
          </li>
        </ul>
        <p>
          Remember, support and information regarding the game can be accessed
          through our official channels. And most importantly, have fun while
          playing ChaosX-18!
        </p>
      </div>
    </motion.div>
  );
};

export default GameRules;
