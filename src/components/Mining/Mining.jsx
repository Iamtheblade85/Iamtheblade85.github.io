import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { motion } from "framer-motion";
import { User } from "../../UserService";
import { toast } from "react-toastify";
import Button from "../Button/Button";
import { useSelector } from "react-redux";

const Mining = ({ name, mine }) => {
  const scrollRef = useRef(null);
  const [buttonLoader, setButtonLoader] = useState(null);
  const { waxConnected, anchorConnected } = useSelector((state) => state.user);
  const miningTransition = {
    type: "spring",
    ease: "easeInOut",
    damping: 35,
    delay: 0.5,
  };
  const Variants = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  };
  const mineWithAnchor = () => {
    if (buttonLoader) return;

    setButtonLoader("Mine " + { name });
    User.anchorSession
      ?.transact(
        {
          actions: [
            {
              account: "blockchain44",
              name: "minetoken",
              authorization: [
                {
                  actor: User.anchorSession?.auth?.actor.toString(),
                  permission: "active",
                },
              ],
              data: {
                player: User.anchorSession?.auth?.actor.toString(),
                mineId: mine?.id,
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
        toast.success("Mining started successfully");
        setButtonLoader(null);
      })
      .catch((error) => {
        toast.error("Mining error");
        console.log("Mining error: ", error);
        setButtonLoader(null);
      });
  };
  const mineWithWax = () => {
    if (buttonLoader) return;

    setButtonLoader("Mine " + { name });
    User.wax.api
      .transact(
        {
          actions: [
            {
              account: "blockchain44",
              name: "minetoken",
              authorization: [
                {
                  actor: User.wax?.userAccount,
                  permission: "active",
                },
              ],
              data: {
                player: User.wax?.userAccount,
                mineId: mine?.id,
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
        toast.success("Mining started successfully");
        setButtonLoader(null);
      })
      .catch((error) => {
        toast.error("Mining error");
        console.log("Mining error: ", error);
        setButtonLoader(null);
      });
  };
  
  const mineNft = () => {
    if (anchorConnected) {
      mineWithAnchor();
    } else if (waxConnected) {
      mineWithWax();
    }
  };
  
  return (
    <motion.div
      viewport={{ root: scrollRef, once: true }}
      transition={miningTransition}
      variants={Variants}
      initial="initial"
      whileInView="whileInView"
      className={styles.container}
    >
      <h2>{name} mining</h2>
      {mine && (
        <div className={styles.container_miningInfo}>
          <div className={styles.container_miningInfo_aurumBoosters}>
            <p>
              <b>First Aurum booster: </b>
              {new Date(mine.aurBsterOne).toLocaleString()}
            </p>
            <p>
              <b>Second Aurum booster: </b>
              {new Date(mine.aurBsterTwo).toLocaleString()}
            </p>
          </div>
          <div className={styles.container_miningInfo_celiumBoosters}>
            <p>
              <b>First Celium booster: </b>
              {new Date(mine.celBsterOne).toLocaleString()}
            </p>
            <p>
              <b>Second Celium booster: </b>
              {new Date(mine.celBsterTwo).toLocaleString()}
            </p>
          </div>
          <div className={styles.container_miningInfo_timeInfo}>
            <p>
              <b>Last time mined: </b>
              {new Date(mine.lastMined).toLocaleString()}
            </p>
            <p>
              <b>Last time upgrade: </b>
              {new Date(mine.lastUpgrade).toLocaleString()}
            </p>
          </div>
          <div></div>
          <div className={styles.container_miningInfo_mainInfo}>
            <p>
              <b>Mine level: </b>
              {mine.level}
            </p>
            <p>
              <b>Mine locked: </b>
              {mine.lock === 0 ? "No" : "Yes"}
            </p>
          </div>
        </div>
      )}
      <Button
        onClick={() => mineNft()}
        loader={buttonLoader}
        size="fit"
        color="blue"
      >
        Mine {name}
      </Button>
    </motion.div>
  );
};

export default Mining;
