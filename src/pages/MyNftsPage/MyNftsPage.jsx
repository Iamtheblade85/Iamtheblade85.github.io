import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles.module.scss";

import { User } from "../../UserService";
import { toast } from "react-toastify";
import mineAurum from "../../assets/images/nfts/Mine Aurum.png";
import mineCelium from "../../assets/images/nfts/Mine Celium.png";
import buildingSlot from "../../assets/images/nfts/Building Slot.png";
import levelUpToken from "../../assets/images/nfts/Level-Up Token.png";
import teleportToChaos from "../../assets/images/nfts/Teleport.png";

import { getMyNfts, setMyNfts } from "../../GlobalState/NftsSlice/nftsSlice";

import NoDataMessage from "../../components/NoDataMessage/NoDataMessage";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import { motion } from "framer-motion";

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

const MyNftsPage = () => {
  const dispatch = useDispatch();
  const { myNfts } = useSelector((state) => state.nfts);
  // const { username, email } = useSelector(state => state.player)
  const { waxConnected, anchorConnected } = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(null);
  const [visibleNfts, setVisibleNfts] = useState({});

  const groupedNfts = myNfts.reduce((groups, nft) => {
    const { name } = nft;
    if (!groups[name]) {
      groups[name] = [];
    }
    groups[name].push(nft);
    return groups;
  }, {});

  const handleSeeMore = (tokenName) => {
    setVisibleNfts((prevVisibleNfts) => {
      const updatedVisibleNfts = { ...prevVisibleNfts };
      updatedVisibleNfts[tokenName] += 12;
      return updatedVisibleNfts;
    });
  };

  useEffect(() => {
    setLoader(true);
    dispatch(getMyNfts())
      .then(() => {
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  }, [dispatch]);

  useEffect(() => {
    if (myNfts.length > 0) {
      const initialVisibleNfts = {};
      Object.keys(groupedNfts).forEach((tokenName) => {
        initialVisibleNfts[tokenName] = 12;
      });
      setVisibleNfts(initialVisibleNfts);
    }
  }, [myNfts]);

  useEffect(() => {
    return () => dispatch(setMyNfts([]));
  }, [dispatch]);

  const importNft = (nft) => {
    // if (!username && !email) {
    //   toast.warning("To import an NFT please login into your gaming account")
    //   return;
    // }
    if (anchorConnected) {
      importWithAnchor(nft);
    } else if (waxConnected) {
      importWithWaxCloud(nft);
    }
  };

  const importWithAnchor = (nft) => {
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
                to: "cryptochaos1",
                asset_ids: [nft.asset_id],
                // memo: `staking%${username || email}`,
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
          "NFT successfully imported. The list will be updated in a few seconds"
        );
        setButtonLoader(null);
        dispatch(getMyNfts());
      })
      .catch((_) => {
        setButtonLoader(null);
        dispatch(getMyNfts());
      });
  };

  const importWithWaxCloud = (nft) => {
    if (buttonLoader) return;

    setButtonLoader(nft.asset_id);
    User.wax.api
      .transact(
        {
          actions: [
            {
              account: "atomicassets",
              name: "transfer",
              authorization: [
                {
                  actor: User.wax?.userAccount,
                  permission: "active",
                },
              ],
              data: {
                from: User.wax?.userAccount,
                to: "cryptochaos1",
                asset_ids: [nft.asset_id],
                // memo: `staking%${username || email}`,
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
          "NFT successfully imported. The list will be updated in a few seconds"
        );
        setButtonLoader(null);
        dispatch(getMyNfts());
      })
      .catch((_) => {
        setButtonLoader(null);
        dispatch(getMyNfts());
      });
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2>My Nfts</h2>
      <p>
        {!myNfts[0] || loader
          ? "You don't have  nfts"
          : !(waxConnected || anchorConnected)
          ? ""
          : `You have ${myNfts.length}  nfts`}
      </p>
      <p>
        {!(waxConnected || anchorConnected)
          ? "To see your NFTs, please connect to your Wax wallet"
          : "Below are the NFTs you have on your Wallet. You can import them on Smart Contract."}
      </p>
      {loader ? (
        <div className={styles.container_loader}>
          <Loader size={100} />
        </div>
      ) : !myNfts[0] || !(waxConnected || anchorConnected) ? (
        <NoDataMessage />
      ) : (
        <div className={styles.container_nftsBlock}>
          {Object.entries(groupedNfts).map(([tokenName, nfts]) => (
            <div
              key={tokenName}
              className={styles.container_nftsBlock_tokenSection}
            >
              <h3>{tokenName}</h3>
              <div
                className={styles.container_nftsBlock_tokenSection_tokenNfts}
              >
                {nfts.slice(0, visibleNfts[tokenName]).map((nft) => (
                  <React.Suspense
                    fallback={<Loader size={250} />}
                    key={nft.asset_id}
                  >
                    <MyNftCard
                      key={nft.asset_id}
                      nft={nft}
                      image={images[nft.name]}
                      importNft={importNft}
                      buttonLoader={buttonLoader === nft.asset_id}
                    />
                  </React.Suspense>
                ))}
              </div>
              <div className={styles.container_seeMoreWrapper}>
                {visibleNfts[tokenName] < nfts.length && (
                  <Button
                    onClick={() => handleSeeMore(tokenName)}
                    size="fit"
                    color="blue"
                  >
                    See More
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyNftsPage;
