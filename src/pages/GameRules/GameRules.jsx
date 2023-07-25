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
      <div className={styles.container_gameInstructions}>
        <h2>
          🚀 Welcome to ChaosX-18 - Instructions to Become True Cosmic
          Explorers! 🚀
        </h2>
        <p>
          <b>
            🔥 Are you ready for an unprecedented intergalactic adventure? Dive
            into the secrets and riches of the mining planet ChaosX-18! Here's
            how to get started:
          </b>
        </p>
        <ul>
          <li>
            <b>Account Access:</b> To embark on this thrilling journey, you'll
            need a WAX account. Access the game by "burning" your Teleport NFT
            directly from your preferred wallet (AtomicHub, NEFTY, HIVE, etc.).
            Click on the purchased Teleport NFT and burn it to secure access for
            one season. Then, head to the game's website and log in using your
            preferred service, Wax Cloud, or Anchor.
          </li>
          <li>
            <b>First Access:</b> As you step into the world of ChaosX-18, you'll
            be granted a fixed amount of 500 Aurum and 500 Celium as a welcome
            bonus. However, you won't have any mines or Slot Building NFTs yet.
          </li>
          <li>
            <b>Purchase Mine and Slot Building NFTs:</b> To kickstart your
            growth journey, you must acquire Mine and Slot Building NFTs. You
            can find these items in the official game drops or on secondary
            markets like neftyblocks.com and wax.atomichub.io. Once obtained,
            you'll be ready to use them in-game.
          </li>
          <li>
            <b>My Profile - The Heart of the Game:</b> Here's where your mining
            empire comes to life! The "My Profile" section is the command center
            for your activities. Observe your precious staked assets and enjoy
            the opportunity to collect the riches produced by your mines simply
            by clicking "Mine."
          </li>
          <li>
            <b>Structure Details:</b> The key to your growth lies in optimizing
            your mines. Click on "Details" next to the building's picture to
            discover the specifics of each structure. In addition to the upgrade
            cost, you'll also see the future production you'll gain by
            upgrading. These tactical tips will help you make strategic
            decisions and maximize your profits.
          </li>
          <li>
            <b>Upgrade the Structures:</b> Don't settle for less! Utilize the
            resources produced by your mines along with Upgrade Token NFTs to
            improve the level of your structures. Climb higher and higher on the
            leaderboard, edging closer to the top of the prize pool.
          </li>
          <li>
            <b>Legendary Leaderboard:</b> Glory awaits! Check the "Leaderboard"
            to see the names of the true heroes of ChaosX-18. Scale the ranks by
            earning points and earn the respect of all cosmic explorers.
          </li>
          <li>
            <b>Chaos Token - Your Reward:</b> Your deeds will be rewarded with
            Chaos Tokens, the potent symbol of this gaming universe. Accumulate
            Chaos Tokens through the monthly prize pool and become the masters
            of chaos!
          </li>
          <li>
            <b>Research and Trade:</b> Explore the secondary markets and
            discover unique and rare items that will enhance your arsenal. Find
            what you need to conquer the mining planet.
          </li>
          <li>
            <b>Infinite Goal:</b> Your adventure in ChaosX-18 knows no limits.
            Build, improve, climb the ranks, and reach new horizons! Your
            destiny is in your hands!
          </li>
        </ul>
        <p>
          <b>
            🕐 Ensure Daily Access: Attention, explorers! To maximize your
            wealth, remember to log in at least once every 24 hours. If more
            than 24 hours pass since your last access, the production of your
            mines will pause until your next login.
          </b>
        </p>
        <p>
          <b>
            🚀 Now, Cosmic Explorers, the time has come to immerse yourselves
            into the abyss of ChaosX-18! 🚀
          </b>
        </p>
        <p>
          <b>
            🌌 Discover, Conquer, and Become Legends of the Cosmic Mining! 🌌
          </b>
        </p>
      </div>
      <div className={styles.container_gameRules}>
        <h2>Game Rules and Terms of Use - ChaosX-18</h2>
        <ol>
          <li>
            <b>Game Access</b>
            <ul>
              <li>
                To access the game, you must have a WAX account and burn the
                Teleport NFT (game pass) in your preferred wallet to gain entry
                to the current season.
              </li>
              <li>Login can be done using Wax Cloud or Anchor services.</li>
            </ul>
          </li>
          <li>
            <b>Registration and Minimum Age</b>
            <ul>
              <li>
                No additional registration is required, but users must be of
                legal age to participate.
              </li>
            </ul>
          </li>
          <li>
            <b>Ownership of NFTs</b>
            <ul>
              <li>
                NFTs (Teleport NFT, Slot Building NFT, Upgrade Token NFT, and
                other game items) fully belong to the users and can be traded or
                sold on secondary markets.
              </li>
              <li>
                Consumable materials such as Teleport NFTs and Level-Up Token
                NFTs are one-time use items and must be burned to activate their
                effects.
              </li>
              <li>
                Additional consumable materials may be introduced in the future
                for specific purposes.
              </li>
            </ul>
          </li>
          <li>
            <b>Usage of NFTs</b>
            <ul>
              <li>
                NFTs can be used within the game to activate mines, buildings,
                and upgrades.
              </li>
              <li>
                Each NFT can be used only once and is burned upon activation.
              </li>
            </ul>
          </li>
          <li>
            <b>Purchase of Teleport NFT for Each Season</b>
            <ul>
              <li>
                At the beginning of each new season, to participate in the game,
                you must purchase a new Teleport NFT and burn it to gain access.
              </li>
              <li>
                The Teleport NFT burned at the end of the previous season will
                not be valid for the new season
              </li>
            </ul>
          </li>
          <li>
            <b>Fair Play and Impediments</b>
            <ul>
              <li>
                Each user is allowed to have only one account, and any attempt
                to create multiple accounts may lead to sanctions.
              </li>
              <li>
                The use of any form of hacking, fraud, or exploit to gain an
                unfair advantage in the game is strictly prohibited.
              </li>
              <li>
                Severe sanctions will be imposed for the use of bots or any
                automated processes to manipulate the game.
              </li>
            </ul>
          </li>
          <li>
            <b>Rewards and Prize Pool</b>
            <ul>
              <li>
                Game rewards, including Chaos Tokens, are distributed based on
                user performance and ranking.
              </li>
              <li>
                The use of any form of hacking, fraud, or exploit to gain an
                unfair advantage in the game is strictly prohibited.
              </li>
              <li>
                The prize pool will be defined and published by the staff within
                7 solar days and may vary each season.
              </li>
            </ul>
          </li>
          <li>
            <b>Support and Official Communications</b>
            <ul>
              <li>
                For game assistance and information, users should refer to the
                official communications provided by the ChaosX-18 development
                team.
              </li>
              <li>
                The use of official channels is essential to receive updates and
                important communications regarding the game.
              </li>
            </ul>
          </li>
          <li>
            <b>Maintenance and Updates</b>
            <ul>
              <li>
                Periodic maintenance may be performed to improve game stability
                and user experience.
              </li>
              <li>
                Updates to game features and mechanics may be implemented to
                enhance gameplay and add new content.
              </li>
            </ul>
          </li>
          <li>
            <b>Limitation of Liability</b>
            <ul>
              <li>
                The game is not responsible for any damages or losses resulting
                from disconnections or technical issues beyond its control.
              </li>
              <li>
                Users are responsible for the security and protection of their
                accounts and the resources contained within.
              </li>
            </ul>
          </li>
          <li>
            <b>Legal Compliance</b>
            <ul>
              <li>
                Users must comply with local laws and regulations regarding
                games and cryptocurrencies.
              </li>
            </ul>
          </li>
        </ol>
        <p>
          Please respect all rules and play in a fair and respectful way.
          Remember, the most important thing is to have fun!
        </p>
      </div>
    </motion.div>
  );
};

export default GameRules;
