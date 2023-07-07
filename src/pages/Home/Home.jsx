import React from "react";
import styles from "./styles.module.scss";
import { motion } from "framer-motion";

export const Home = () => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.container_welcomeSection}>
        <h1>
          Welcome to the Home of ChaosX-18, an Adventure Like No Other! 🚀
        </h1>
        <p>
          Embark on a journey of discovery and thrill, a voyage that transcends
          the frontiers of gaming as we know it. In a universe where blockchain
          technology collides with cutting-edge gaming dynamics, ChaosX-18
          stands as a beacon of innovation and exhilaration.
        </p>
        <p>
          As the dust of interstellar travel settles, you find yourself standing
          on the threshold of a world filled with limitless possibilities. The
          choices you make, the strategies you devise, and the vision you uphold
          will echo through the cosmic expanse of ChaosX-18.
        </p>
        <p>
          This is a game that transcends the confines of your screen, offering
          you a tangible stake in a world of ethereal beauty and profound
          riches. It's a universe where you can grow, compete, and earn. But
          remember, it's not just about accumulating wealth; it's about
          embracing a sustainable vision for interstellar exploration and
          mining.
        </p>

        <p>
          Want to join the ranks of the cosmos' best miners? Want to stand tall
          among those who made their mark in the depths of space? Dive into our
          comprehensive game guides, explore our vibrant player community, and
          get started on your journey.
        </p>
        <p>
          Remember, the end of each season brings not just the thrill of
          achievement but also the excitement of tangible rewards. The more you
          contribute, the larger your share of the prize pool!
        </p>
        <p>
          Are you ready to venture into the unknown and make a name for yourself
          among the stars? Your adventure on ChaosX-18 awaits! 🌌
        </p>
        <p>Your journey starts now...💫</p>
      </div>
    </motion.div>
  );
};
