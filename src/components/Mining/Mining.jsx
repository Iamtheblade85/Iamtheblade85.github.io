import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import {
  getMyNfts,
  getMyWorkingNfts,
} from "../../GlobalState/NftsSlice/nftsSlice";
import { motion } from "framer-motion";
import { User } from "../../UserService";
import { toast } from "react-toastify";
import Button from "../Button/Button";

import mineAurum from "../../assets/images/nfts/Mine-Aurum.webp";
import mineCelium from "../../assets/images/nfts/Mine-Celium.webp";
import buildingSlot from "../../assets/images/nfts/Building-Slot.webp";
import levelUpToken from "../../assets/images/nfts/Level-Up-Token.webp";
import teleportToChaos from "../../assets/images/nfts/Teleport.webp";
import Loader from "../Loader/Loader";

const MyNftCard = React.lazy(() =>
  import("../../components/Nft/MyNftCard/MyNftCard")
);

const images = {
  "ChaosX-18 Mine Aurum": mineAurum,
  "ChaosX-18 Mine Celium": mineCelium,
  "ChaosX-18 Building Slot ": buildingSlot,
  "ChaosX-18 Level Up token": levelUpToken,
  "Teleport to ChaosX-18": teleportToChaos,
};

const Mining = ({ mine }) => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const [buttonLoader, setButtonLoader] = useState(null);
  const { waxConnected, anchorConnected } = useSelector((state) => state.user);
  const { myWorkingNfts, myNfts } = useSelector((state) => state.nfts);
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

  // mine
  const mineWithAnchor = () => {
    if (buttonLoader) return;

    setButtonLoader("Mine");
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
        toast.error("You can't mine now");
        console.log("Mining error: ", error);
        setButtonLoader(null);
      });
  };

  const mineWithWax = () => {
    if (buttonLoader) return;

    setButtonLoader("Mine");
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
        toast.error("You can't mine now");
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

  // upgrade
  const upgradeWithAnchor = (nft, levelUp) => {
    if (buttonLoader) return;

    setButtonLoader(nft.asset_id);
    User.anchorSession
      ?.transact(
        {
          actions: [
            {
              account: "atomicassets",
              name: "transfer",
              authorization: [
                {
                  actor: User.anchorSession?.auth?.actor.toString(),
                  permission: "active",
                },
              ],
              data: {
                from: User.anchorSession?.auth?.actor.toString(),
                to: "blockchain44",
                asset_ids: [levelUp.asset_id],
                memo: "burn@level@" + nft.asset_id,
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
        toast.success(
          "NFT successfully upgraded, you can mine it after 24 hours"
        );
        setButtonLoader(null);
      })
      .catch((_) => {
        setButtonLoader(null);
      });
  };

  const upgradeWithWaxCloud = (nft, levelUp) => {
    if (buttonLoader) return;

    setButtonLoader(nft.asset_id);
    User.wax.api
      .transact(
        {
          actions: [
            {
              account: "atomicassets",
              name: "burnasset",
              authorization: [
                {
                  actor: User.wax?.userAccount,
                  permission: "active",
                },
              ],
              data: {
                from: User.wax?.userAccount,
                to: "blockchain44",
                asset_ids: [levelUp.asset_id],
                memo: "burn@level@" + nft.asset_id,
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
        toast.success(
          "NFT successfully upgraded, you can mine it after 24 hours"
        );
        setButtonLoader(null);
      })
      .catch((_) => {
        setButtonLoader(null);
      });
  };

  const upgradeNft = (nft) => {
    const levelUp = myNfts.filter(
      (nft) => nft.name === "ChaosX-18 Level Up token"
    );
    if (levelUp[0]) {
      if (anchorConnected) {
        upgradeWithAnchor(nft, levelUp[0]);
      } else if (waxConnected) {
        upgradeWithWaxCloud(nft, levelUp[0]);
      }
    } else {
      toast.error("To upgrade your mine purchase ChaosX-18 Level Up token");
      return;
    }
  };

  useEffect(() => {
    if (mine) {
      setTimeout(() => {
        dispatch(getMyWorkingNfts(mine.asset_id));
      }, 1000);
    }
    dispatch(getMyNfts());
  }, [dispatch, mine]);

  return (
    <motion.div
      viewport={{ root: scrollRef, once: true }}
      transition={miningTransition}
      variants={Variants}
      initial="initial"
      whileInView="whileInView"
      className={styles.container}
    >
      {myWorkingNfts && (
        <React.Suspense fallback={<Loader size={250} />} key={mine.asset_id}>
          <MyNftCard
            key={mine?.asset_id}
            nft={myWorkingNfts[mine?.asset_id]}
            image={images[myWorkingNfts[mine?.asset_id]?.name]}
            functional={false}
          />
        </React.Suspense>
      )}
      {mine && (
        <div className={styles.container_miningInfo}>
          <div className={styles.container_miningInfo_aurumBoosters}>
            <p>
              <b>First booster: </b>
              {new Date(mine.bstrOne).toLocaleString() ===
              "1/1/1970, 12:00:00 AM"
                ? "None"
                : new Date(mine.bstrOne).toLocaleString()}
            </p>
            <p>
              <b>Second booster: </b>
              {new Date(mine.bstrTwo).toLocaleString() ===
              "1/1/1970, 12:00:00 AM"
                ? "None"
                : new Date(mine.bstrTwo).toLocaleString()}
            </p>
          </div>
          <div className={styles.container_miningInfo_timeInfo}>
            <p>
              <b>Last time mined: </b>
              {/* {new Date(mine.lastMined).toLocaleString()} */}
              {new Date(mine.lastMined).toLocaleString() ===
              "1/1/1970, 12:00:00 AM"
                ? "None"
                : new Date(mine.lastMined).toLocaleString()}
            </p>
            <p>
              <b>Last time upgrade: </b>
              {/* {new Date(mine.lastUpgrade).toLocaleString()} */}
              {new Date(mine.lastUpgrade).toLocaleString() ===
              "1/1/1970, 12:00:00 AM"
                ? "None"
                : new Date(mine.lastUpgrade).toLocaleString()}
            </p>
            <p>
              <b>Unstake time: </b>
              {/* {new Date(mine.unstake_time).toLocaleString()} */}
              {new Date(mine.unstake_time).toLocaleString() ===
              "1/1/1970, 12:00:00 AM"
                ? "None"
                : new Date(mine.unstake_time).toLocaleString()}
            </p>
          </div>
          <div className={styles.container_miningInfo_mainInfo}>
            <p>
              <b>Mine level: </b>
              {mine.level}
            </p>
            <p>
              <b>Mine locked: </b>
              {mine.is_locked === 0 ? "No" : "Yes"}
            </p>
            <p>
              <b>Mine staked: </b>
              {mine.is_staked === 0 ? "No" : "Yes"}
            </p>
          </div>
        </div>
      )}
      <Button onClick={mineNft} loader={buttonLoader} size="fit" color="blue">
        Mine
      </Button>
      <Button
        onClick={() => upgradeNft(myWorkingNfts[mine?.asset_id])}
        loader={buttonLoader}
        size="fit"
        color="blue"
      >
        Upgrade
      </Button>
    </motion.div>
  );
};

export default Mining;
