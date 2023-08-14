import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles.module.scss";

import { User, UserService } from "../../UserService";
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
import RequiredNftModal from "../../components/Modal/RequiredNftModal/RequiredNftModal";
import { motion } from "framer-motion";
import Slots from "../../components/Slots/Slots";

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
  const { waxConnected, anchorConnected, name } = useSelector(
    (state) => state.user
  );
  const [loader, setLoader] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(null);
  const [visibleNfts, setVisibleNfts] = useState({});
  const [visibleFilledSlots, setVisibleFilledSlots] = useState(12);
  const [visibleEmptySlots, setVisibleEmptySlots] = useState(12);
  const [selectedNfts, setSelectedNfts] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [emptySlots, setEmptySlots] = useState([]);
  const [filledSlots, setFilledSlots] = useState([]);
  const [player, setPlayer] = useState(null);
  const pollingInterval = 10000;

  const groupedNfts = myNfts.reduce((groups, nft) => {
    const { name } = nft;
    if (!groups[name]) {
      groups[name] = [];
    }
    groups[name].push(nft);
    return groups;
  }, {});

  // See More logic
  const handleSeeMore = (tokenName) => {
    setVisibleNfts((prevVisibleNfts) => {
      const updatedVisibleNfts = { ...prevVisibleNfts };
      updatedVisibleNfts[tokenName] += 12;
      return updatedVisibleNfts;
    });
  };

  const handleSeeMoreFilledSlots = () => {
    setVisibleFilledSlots((prevVisibleSlots) => prevVisibleSlots + 12);
  };

  const handleSeeMoreEmptySlots = () => {
    setVisibleEmptySlots((prevVisibleSlots) => prevVisibleSlots + 12);
  };

  // burn
  const burnWithAnchor = (nft) => {
    if (buttonLoader) return;

    setButtonLoader(nft.asset_id);
    User.anchorSession
      ?.transact(
        {
          actions: [
            {
              account: "atomicassets",
              name: "burnasset",
              authorization: [
                {
                  actor: User.anchorSession?.auth?.actor.toString(),
                  permission: "active",
                },
              ],
              data: {
                asset_owner: User.anchorSession?.auth?.actor.toString(),
                asset_id: nft.asset_id,
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
              account: "atomicassets",
              name: "burnasset",
              authorization: [
                {
                  actor: User.wax?.userAccount,
                  permission: "active",
                },
              ],
              data: {
                asset_owner: User.wax?.userAccount,
                asset_id: nft.asset_id,
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

  // stake slot
  const stakeWithAnchor = (nft) => {
    if (buttonLoader) return;

    setButtonLoader(nft);
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
                asset_ids: [nft.asset_id],
                memo: "stake@slot",
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
        toast.success("Slot successfully staked");
        setButtonLoader(null);
        dispatch(getMyNfts());
      })
      .catch((_) => {
        setButtonLoader(null);
        dispatch(getMyNfts());
      });
  };

  const stakeWithWaxCloud = (nft) => {
    if (buttonLoader) return;

    setButtonLoader(nft);
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
                to: "blockchain44",
                asset_ids: [nft.asset_id],
                memo: "stake@slot",
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
        toast.success("Slot successfully staked");
        setButtonLoader(null);
        dispatch(getMyNfts());
      })
      .catch((_) => {
        setButtonLoader(null);
        dispatch(getMyNfts());
      });
  };

  const stakeSlot = (nft) => {
    if (anchorConnected) {
      stakeWithAnchor(nft);
    } else if (waxConnected) {
      stakeWithWaxCloud(nft);
    }
  };

  // stake slots
  const stakeSlotsWithAnchor = (selectedAssetIds, nft) => {
    if (buttonLoader) return;

    setButtonLoader(nft);
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
                asset_ids: selectedAssetIds,
                memo: "stake@slots",
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
        toast.success("Slots successfully staked");
        setButtonLoader(null);
        dispatch(getMyNfts());
      })
      .catch((_) => {
        setButtonLoader(null);
        dispatch(getMyNfts());
      });
  };

  const stakeSlotsWithWaxCloud = (selectedAssetIds, nft) => {
    if (buttonLoader) return;

    setButtonLoader(nft);
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
                to: "blockchain44",
                asset_ids: selectedAssetIds,
                memo: "stake@slots",
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
        toast.success("Slots successfully staked");
        setButtonLoader(null);
        dispatch(getMyNfts());
      })
      .catch((_) => {
        setButtonLoader(null);
        dispatch(getMyNfts());
      });
  };

  const stakeSlots = (nft) => {
    const selectedAssetIds = selectedSlots.map((nft) => nft.asset_id);
    if (anchorConnected) {
      stakeSlotsWithAnchor(selectedAssetIds, nft);
    } else if (waxConnected) {
      stakeSlotsWithWaxCloud(selectedAssetIds, nft);
    }
  };

  // unstake slot
  const unstakeSlotWithAnchor = (slot) => {
    if (buttonLoader) return;

    setButtonLoader(slot.asset_id);
    User.anchorSession
      ?.transact(
        {
          actions: [
            {
              account: "blockchain44",
              name: "unstakeslot",
              authorization: [
                {
                  actor: User.anchorSession?.auth?.actor.toString(),
                  permission: "active",
                },
              ],
              data: {
                player: User.anchorSession?.auth?.actor.toString(),
                slotNftId: slot.asset_id,
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
        toast.success("Slot successfully unstaked");
        setButtonLoader(null);
        dispatch(getMyNfts());
      })
      .catch((_) => {
        setButtonLoader(null);
        dispatch(getMyNfts());
      });
  };

  const unstakeSlotWithWaxCloud = (slot) => {
    if (buttonLoader) return;

    setButtonLoader(slot.asset_id);
    User.wax.api
      .transact(
        {
          actions: [
            {
              account: "blockchain44",
              name: "unstakeslot",
              authorization: [
                {
                  actor: User.wax?.userAccount,
                  permission: "active",
                },
              ],
              data: {
                player: User.wax?.userAccount,
                slotNftId: slot.asset_id,
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
        toast.success("Slot successfully unstaked");
        setButtonLoader(null);
        dispatch(getMyNfts());
      })
      .catch((_) => {
        setButtonLoader(null);
        dispatch(getMyNfts());
      });
  };

  const unstakeSlot = (slot) => {
    console.log(slot);
    if (anchorConnected) {
      unstakeSlotWithAnchor(slot);
    } else if (waxConnected) {
      unstakeSlotWithWaxCloud(slot);
    }
  };

  // stake mines into slot
  const stakeMinesWithAnchor = (selectedAssetIds, slot) => {
    if (buttonLoader) return;

    setButtonLoader(selectedAssetIds);
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
                asset_ids: selectedAssetIds,
                memo: "stake@mines@" + slot.asset_id,
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

  const stakeMinesWithWaxCloud = (selectedAssetIds, slot) => {
    if (buttonLoader) return;

    setButtonLoader(selectedAssetIds);
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
                to: "blockchain44",
                asset_ids: selectedAssetIds,
                memo: "stake@mines@" + slot.asset_id,
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

  const stakeMinesIntoSlot = (slot) => {
    const selectedAssetIds = selectedNfts.map((nft) => nft.asset_id);
    if (anchorConnected) {
      stakeMinesWithAnchor(selectedAssetIds, slot);
    } else if (waxConnected) {
      stakeMinesWithWaxCloud(selectedAssetIds, slot);
    }
  };

  // selection
  const handleNftSelection = (nft) => {
    if (
      nft.data.name === "ChaosX-18 Mine Aurum" ||
      nft.data.name === "ChaosX-18 Mine Celium"
    ) {
      if (
        selectedNfts.some(
          (selectedNft) => selectedNft.data.name === nft.data.name
        )
      ) {
        setSelectedNfts((prevSelectedNfts) =>
          prevSelectedNfts.filter(
            (selectedNft) => selectedNft.data.name !== nft.data.name
          )
        );
      } else if (selectedNfts.length < 2) {
        setSelectedNfts((prevSelectedNfts) => [...prevSelectedNfts, nft]);
      }
    }
  };

  const handleSlotSelection = (nft) => {
    if (nft.data.name === "ChaosX-18 Building Slot ") {
      setSelectedSlots((prevSelectedSlots) => {
        const isSelected = prevSelectedSlots.some(
          (selectedSlot) => selectedSlot.asset_id === nft.asset_id
        );

        if (isSelected) {
          return prevSelectedSlots.filter(
            (selectedSlot) => selectedSlot.asset_id !== nft.asset_id
          );
        } else {
          return [...prevSelectedSlots, nft];
        }
      });
    }
  };

  // data section
  const fetchData = async () => {
    try {
      const [nfts, slots, players] = await Promise.all([
        dispatch(getMyNfts()),
        UserService.getSlots(name),
        UserService.getPlayers(),
      ]);

      if (nfts) {
        setMyNfts(nfts);
      }

      if (slots) {
        const emptySlots = slots.filter(
          (slot) => slot.aur_mine_id === 0 && slot.cel_mine_id === 0
        );
        const filledSlots = slots.filter(
          (slot) => slot.aur_mine_id !== 0 && slot.cel_mine_id !== 0
        );
        setFilledSlots(filledSlots);
        setEmptySlots(emptySlots);
      }

      if (players && players.rows) {
        const data = players.rows.find((player) => player.player === name);
        setPlayer(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, pollingInterval);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, dispatch]);

  useEffect(() => {
    setLoader(true);
    fetchData()
      .then(() => {
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        toast.error("Failed to get your nfts");
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, name]);

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
        {!(waxConnected || anchorConnected) ? (
          "To see your NFTs, please connect to your Wax wallet"
        ) : (
          <React.Fragment>
            Below are the NFTs you have on your Wallet. You can import them on
            Smart Contract.
            <br />
            You can choose one Aurum and one Celium to stake them into the
            staked Building Slot
          </React.Fragment>
        )}
      </p>
      {loader ? (
        <div className={styles.container_loader}>
          <Loader size={100} />
        </div>
      ) : !myNfts[0] || !(waxConnected || anchorConnected) ? (
        <NoDataMessage />
      ) : (
        <>
          <div className={styles.container_slotsBlock}>
            <div className={styles.container_slotsBlock_slotsInfoWrapper}>
              <h2>Staked Building Slots: {filledSlots.length}</h2>
            </div>
            <div className={styles.container_slotsBlock_slotsSection}>
              {filledSlots.length > 0 ? (
                filledSlots.slice(0, visibleFilledSlots).map((slot) => {
                  return (
                    <React.Suspense
                      fallback={<Loader size={250} />}
                      key={slot.id}
                    >
                      <Slots
                        fullSlot={true}
                        stakeMinesIntoSlot={stakeMinesIntoSlot}
                        unstakeSlot={unstakeSlot}
                        slot={slot ? slot : {}}
                        key={slot.id}
                      />
                    </React.Suspense>
                  );
                })
              ) : (
                <NoDataMessage message="Stake Building Slot to see your slots" />
              )}
              {filledSlots.length > visibleFilledSlots && (
                <div className={styles.container_seeMoreWrapper}>
                  <Button
                    onClick={handleSeeMoreFilledSlots}
                    size="fit"
                    color="blue"
                  >
                    See More
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.container_emptySlotsBlock}>
            <div
              className={styles.container_emptySlotsBlock_emptySlotsInfoWrapper}
            >
              <h2>Empty Staked Building Slots: {emptySlots.length}</h2>
            </div>
            <div className={styles.container_emptySlotsBlock_emptySlotsSection}>
              {emptySlots.length > 0 ? (
                emptySlots.slice(0, visibleEmptySlots).map((slot) => {
                  return (
                    <React.Suspense
                      fallback={<Loader size={250} />}
                      key={slot.id}
                    >
                      <Slots
                        fullSlot={false}
                        stakeMinesIntoSlot={stakeMinesIntoSlot}
                        unstakeSlot={unstakeSlot}
                        slot={slot ? slot : {}}
                        key={slot.id}
                      />
                    </React.Suspense>
                  );
                })
              ) : (
                <NoDataMessage message="Stake empty Building Slot to see your slots" />
              )}
              {emptySlots.length > visibleEmptySlots && (
                <div className={styles.container_seeMoreWrapper}>
                  <Button
                    onClick={handleSeeMoreEmptySlots}
                    size="fit"
                    color="blue"
                  >
                    See More
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.container_nftsBlock}>
            {Object.entries(groupedNfts).map(([tokenName, nfts]) => (
              <div
                key={tokenName}
                className={styles.container_nftsBlock_tokenSection}
              >
                <div
                  className={
                    styles.container_nftsBlock_tokenSection_tokenInfoWrapper
                  }
                >
                  <h2>
                    {tokenName}: {nfts.length}
                  </h2>
                </div>
                {tokenName === "ChaosX-18 Building Slot " &&
                selectedSlots[0] ? (
                  <Button size="fit" color="blue" onClick={() => stakeSlots()}>
                    Stake Slots
                  </Button>
                ) : (
                  ""
                )}
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
                        stakeMinesIntoSlot={stakeMinesIntoSlot}
                        stakeSlot={stakeSlot}
                        unstakeSlot={unstakeSlot}
                        buttonLoader={buttonLoader === nft.asset_id}
                        functional={true}
                        onSelect={
                          nft.data.name !== "ChaosX-18 Building Slot "
                            ? () => handleNftSelection(nft)
                            : () => handleSlotSelection(nft)
                        }
                        selected={
                          nft.data.name !== "ChaosX-18 Building Slot "
                            ? selectedNfts.includes(nft)
                            : selectedSlots.includes(nft)
                        }
                        stakedSlot={false}
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
        </>
      )}
      {player?.season_asset_id === 0 && <RequiredNftModal />}
    </motion.div>
  );
};

export default MyNftsPage;
