import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import styles from "./styles.module.scss";

import {
  getStagingNfts,
  setStagingNfts,
} from "../../GlobalState/NftsSlice/nftsSlice";
import NftsService from "../../GlobalState/NftsSlice/nfts.service";

import Loader from "../../components/Loader/Loader";
import NoDataMessage from "../../components/NoDataMessage/NoDataMessage";
import Button from "../../components/Button/Button";
import { motion } from "framer-motion";

const StagingNftCard = React.lazy(() =>
  import("../../components/Nft/StagingNftCard/StagingNftCard")
);

const images = {
  // "Common Bread": "commonBread",
  // "Standard Sword": "standartSword",
  // Sword: "sword"
};

const StagingNftsPage = () => {
  const dispatch = useDispatch();
  const { stagingNfts } = useSelector((state) => state.nfts);
  const { token, name } = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const [buttonLoaderIntoWallet, setButtonLoaderIntoWallet] = useState(null);
  const [buttonLoaderIntoGame, setButtonLoaderIntoGame] = useState(null);
  const [visibleNfts, setVisibleNfts] = useState(12);

  useEffect(() => {
    setLoader(true);
    dispatch(getStagingNfts());
    setLoader(false);

    return () => dispatch(setStagingNfts([]));
  }, [dispatch]);

  const stagingNftsWithImages = useMemo(() => {
    return stagingNfts.map((item) => ({
      ...item,
      image: images[item.nft_name],
    }));
  }, [stagingNfts]);

  const importIntoGame = async (nft) => {
    if (buttonLoaderIntoGame) return;

    const body = {
      nft_name: nft.nft_name,
      id: nft.id,
    };

    setButtonLoaderIntoGame(nft.id);
    try {
      await NftsService.moveFromStagingToGame(token, body);
      dispatch(getStagingNfts());
      toast.success("NFT successfully imported back into Game");
      setButtonLoaderIntoGame(null);
    } catch (_) {
      setButtonLoaderIntoGame(null);
    }
  };

  const exportIntoWallet = async (nft) => {
    if (buttonLoaderIntoWallet) return;

    const body = {
      wax_id: name,
      nft_name: nft.nft_name,
      id: nft.id,
    };

    setButtonLoaderIntoWallet(nft.id);
    try {
      await NftsService.moveFromStagingToWallet(token, body);
      dispatch(getStagingNfts());
      toast.success(
        "NFT successfully imported. It'll be visible in Wallet in a few seconds"
      );
      setButtonLoaderIntoWallet(null);
    } catch (err) {
      console.log(err);
      setButtonLoaderIntoWallet(null);
    }
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
      <h2>Staging Nfts</h2>
      <p>
        {!stagingNfts || loader
          ? "You don't have"
          : `You have ${stagingNfts.length}`}{" "}
        staging nfts
      </p>
      <p>
        Below are the NFTs existing on Smart Contract. You can export them into
        Wallet or import back into the game.
      </p>
      {loader ? (
        <div className={styles.container_loader}>
          <Loader size={100} />
        </div>
      ) : !stagingNftsWithImages[0] ? (
        <NoDataMessage />
      ) : (
        <div className={styles.container_nftsBlock}>
          {stagingNftsWithImages.slice(0, visibleNfts).map((nft, index) => (
            <React.Suspense fallback={<Loader size={100} />} key={index}>
              <StagingNftCard
                key={index}
                nft={nft}
                exportIntoWallet={exportIntoWallet}
                importIntoGame={importIntoGame}
                buttonLoaderIntoGame={buttonLoaderIntoGame}
                buttonLoaderIntoWallet={buttonLoaderIntoWallet}
              />
            </React.Suspense>
          ))}
        </div>
      )}
      <div className={styles.container_seeMoreWrapper}>
        {visibleNfts < stagingNftsWithImages.length && (
          <Button onClick={handleSeeMore} size="fit" color="blue">
            See More
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default StagingNftsPage;
