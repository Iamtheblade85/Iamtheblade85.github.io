import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import styles from "./styles.module.scss";

import PlayerService from "../../GlobalState/PlayerSlice/player.service";
import NftsService from "../../GlobalState/NftsSlice/nfts.service";

import Loader from "../../components/Loader/Loader";
import NoDataMessage from "../../components/NoDataMessage/NoDataMessage";
import { motion } from "framer-motion"

const InventoryCard = React.lazy(() => import("../../components/Nft/InventoryCard/InventoryCard"))

const images = {
  // "Common Bread": "commonBread",
  // "Standard Sword": "standartSword",
  // "Sword": "sword"
};

const PlayerProfile = () => {
  const player = useSelector((state) => state.player);
  const { token } = useSelector((state) => state.user);
  const [inventory, setInventory] = useState([]);
  const [loader, setLoader] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(null);

  useEffect(() => {
    if (player.id) {
      const getAsyncCharacterInventory = async () => {
        setLoader(true);
        const res = await PlayerService.getCharacterInventory(token);
        const filteredRes = res.data?.result
          ?.filter((item) => !!item.quantity)
          .map((item) => ({
            ...item,
            image: images[item.name]
          }));
        setInventory(filteredRes);
        setLoader(false);
      };
      getAsyncCharacterInventory();
    }
  }, [player.id, token]);

  const exportIntoStaging = async (nft, index) => {
    if (buttonLoader) return;

    const body = {
      nft_name: nft.name,
      level: 1
    };

    setButtonLoader(nft.id);
    try {
      await NftsService.moveFromGameToStaging(token, body);
      toast.success("Inventory successfully exported into Staging");
      let newInventory = [...inventory];
      newInventory[index].quantity = newInventory[index].quantity - 1;
      if (!newInventory[index].quantity) {
        newInventory.splice(index, 1);
      }
      setInventory(newInventory);
      setButtonLoader(null);
    } catch (_) {
      setButtonLoader(null);
    }
  };

  return (
    <motion.div className={styles.container} initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}>
      <div className={styles.container_characterInformation}>
        <h2>Character Information</h2>
        <div className={styles.container_characterInformation_wrapper}>
          <div className={styles.container_characterInformation_wrapper_infoDiv}>
            <div className={styles.container_characterInformation_wrapper_infoDiv_infoValue}>
              <span>Character Name: </span>
              <span>{player.characterName}</span>
            </div>
            <div className={styles.container_characterInformation_wrapper_infoDiv_infoValue}>
              <span>Level: </span>
              <span>{player.level}</span>
            </div>
            <div className={styles.container_characterInformation_wrapper_infoDiv_infoValue}>
              <span>Experience: </span>
              <span>{player.experience}</span>
            </div>
            <div className={styles.container_characterInformation_wrapper_infoDiv_infoValue}>
              <span>Character Description: </span>
              <span>{player.characterDescription}</span>
            </div>
          </div>

          <div className={styles.container_characterInformation_wrapper_infoDiv}>
            <div className={styles.container_characterInformation_wrapper_infoDiv_infoValue}>
              <span>Chaos Balance: </span>
              <span>{player.triliumBalance}</span>
            </div>
            <div className={styles.container_characterInformation_wrapper_infoDiv_infoValue}>
              <span>Intelligence: </span>
              <span>{player.intelligence}</span>
            </div>
            <div className={styles.container_characterInformation_wrapper_infoDiv_infoValue}>
              <span>Max Hit Points: </span>
              <span>{player.maxHitPoints}</span>
            </div>
            <div className={styles.container_characterInformation_wrapper_infoDiv_infoValue}>
              <span>Max Magic Points: </span>
              <span>{player.maxMagicPoints}</span>
            </div>
            <div className={styles.container_characterInformation_wrapper_infoDiv_infoValue}>
              <span>Strength: </span>
              <span>{player.strength}</span>
            </div>
          </div>

          <div className={styles.container_characterInformation_wrapper_infoDiv}>
            <div className={styles.container_characterInformation_wrapper_infoDiv_infoValue}>
              <span>Character Hit Points Bonus: </span>
              <span>{player.characterHitPointsBonus}</span>
            </div>
            <div className={styles.container_characterInformation_wrapper_infoDiv_infoValue}>
              <span>Character Intelligence Bonus: </span>
              <span>{player.characterIntelligenceBonus}</span>
            </div>
            <div className={styles.container_characterInformation_wrapper_infoDiv_infoValue}>
              <span>Character Magic Points Bonus: </span>
              <span>{player.characterMagicPointsBonus}</span>
            </div>
            <div className={styles.container_characterInformation_wrapper_infoDiv_infoValue}>
              <span>Character Strength Bonus: </span>
              <span>{player.characterStrengthBonus}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container_characterInventory}>
        <h2>Character Inventory</h2>
        {loader ? (
          <div>
            <Loader size={100} />
          </div>
        ) : !inventory[0] ? (
          <NoDataMessage />
        ) : (
          <div className={styles.container_characterInventory_inventoryCardWrapper}>
            {inventory.map((item, index) => (
              <React.Suspense fallback={""} key={index}>
                <InventoryCard
                  key={index}
                  item={item}
                  buttonLoader={buttonLoader}
                  buttonFunc={() => exportIntoStaging(item, index)}
                />
              </React.Suspense>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PlayerProfile;
