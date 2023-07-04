import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles.module.scss";

import { User } from "../../UserService";
import { toast } from "react-toastify";

import { getMyNfts, setMyNfts } from "../../GlobalState/NftsSlice/nftsSlice";

import NoDataMessage from "../../components/NoDataMessage/NoDataMessage";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import { motion } from "framer-motion";

const MyNftCard = React.lazy(() =>
  import("../../components/Nft/MyNftCard/MyNftCard")
);

const MyNftsPage = () => {
  const dispatch = useDispatch();
  const { myNfts } = useSelector((state) => state.nfts);
  // const { username, email } = useSelector(state => state.player)
  const { waxConnected, anchorConnected } = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(null);
  const [visibleNfts, setVisibleNfts] = useState(12);

  useEffect(() => {
    setLoader(true);
    dispatch(getMyNfts());
    setLoader(false);

    const interval = setInterval(() => {
      dispatch(getMyNfts());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

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
                to: "celium",
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
                to: "celium",
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

  const handleSeeMore = () => {
    setVisibleNfts((prevVisibleNfts) => prevVisibleNfts + 12);
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
        {!myNfts || loader ? "You don't have" : `You have ${myNfts.length}`}{" "}
        nfts
      </p>
      <p>
        Below are the NFTs you have on your Wallet. You can import them on Smart
        Contract.
      </p>
      {loader ? (
        <div className={styles.container_loader}>
          <Loader size={100} />
        </div>
      ) : !myNfts[0] ? (
        <NoDataMessage />
      ) : (
        <div className={styles.container_nftsBlock}>
          {myNfts.slice(0, visibleNfts).map((nft) => (
            <React.Suspense fallback={<Loader size={250} />} key={nft.asset_id}>
              <MyNftCard
                key={nft.asset_id}
                nft={nft}
                importNft={importNft}
                buttonLoader={buttonLoader === nft.asset_id}
              />
            </React.Suspense>
          ))}
        </div>
      )}
      <div className={styles.container_seeMoreWrapper}>
        {visibleNfts < myNfts.length && (
          <Button onClick={handleSeeMore} size="fit" color="olive">
            See More
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default MyNftsPage;
