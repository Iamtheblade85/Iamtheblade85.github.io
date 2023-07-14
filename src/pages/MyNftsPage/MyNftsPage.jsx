import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles.module.scss";

import { User } from "../../UserService";
import { toast } from "react-toastify";
import mineAurum from "../../assets/images/nfts/Mine-Aurum.webp";
import mineCelium from "../../assets/images/nfts/Mine-Celium.webp";
import buildingSlot from "../../assets/images/nfts/Building-Slot.webp";
import levelUpToken from "../../assets/images/nfts/Level-Up-Token.webp";
import teleportToChaos from "../../assets/images/nfts/Teleport.webp";

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
        toast.error("Failed to get your nfts");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myNfts]);

  useEffect(() => {
    return () => dispatch(setMyNfts([]));
  }, [dispatch]);

  const burnWithAnchor = (nft) => {
    if (buttonLoader) return;

    setButtonLoader(nft.asset_id);
    User.anchorSession
      ?.transact(
        {
          actions: [
            {
              account: "blockchain44",
              name: "assetburn",
              authorization: [
                {
                  actor: User.anchorSession?.auth?.actor.toString(),
                  permission: "active",
                },
              ],
              data: {
                collection_name: nft.collection.collection_name,
                from: User.anchorSession?.auth?.actor.toString(),
                to: "atomicassets",
                asset_ids: [nft.asset_id],
                memo: ``,
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
        toast.success("NFT successfully burned");
        setButtonLoader(null);
        dispatch(getMyNfts());
      })
      .catch((_) => {
        setButtonLoader(null);
        dispatch(getMyNfts());
      });
  };

  const burnWithWaxCloud = (nft) => {
    if (buttonLoader) return;

    setButtonLoader(nft.asset_id);
    User.wax.api
      .transact(
        {
          actions: [
            {
              account: "blockchain44",
              name: "assetburn",
              authorization: [
                {
                  actor: User.wax?.userAccount,
                  permission: "active",
                },
              ],
              data: {
                collection_name: nft.collection.collection_name,
                from: User.wax?.userAccount,
                to: "atomicassets",
                asset_ids: [nft.asset_id],
                memo: ``,
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
        toast.success("NFT successfully burned");
        setButtonLoader(null);
        dispatch(getMyNfts());
      })
      .catch((_) => {
        setButtonLoader(null);
        dispatch(getMyNfts());
      });
  };

  const burnNft = (nft) => {
    if (anchorConnected) {
      burnWithAnchor(nft);
    } else if (waxConnected) {
      burnWithWaxCloud(nft);
    }
  };

  // not final version
  const stakeNft = (nft) => {
    if (buttonLoader) return;

    setButtonLoader(nft.asset_id);
    User.anchorSession
      ?.transact(
        {
          actions: [
            {
              account: "atomicassets",
              name: "stakerecords",
              authorization: [
                {
                  actor: User.anchorSession?.auth?.actor.toString(),
                  permission: "active",
                },
              ],
              data: {
                from: User.anchorSession?.auth?.actor.toString(),
                to: "blockchain44",
                asset_ids: [nft.asset_id],
                timestamp: Date.now(),
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
        toast.success("NFT successfully staked");
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
              <h3>
                {tokenName}, {nfts.length} left
              </h3>
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
                      burnNft={burnNft}
                      stakeNft={stakeNft}
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
