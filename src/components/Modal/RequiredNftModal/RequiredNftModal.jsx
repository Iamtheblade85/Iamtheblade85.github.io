import React, { useRef } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import Button from "./../../Button/Button";

const RequiredNftModal = () => {
  const modalRef = useRef(null);
  const modalTransition = {
    type: "spring",
    ease: "easeInOut",
    damping: 30,
  };

  return (
    <motion.div
      className={styles.container}
      transition={modalTransition}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      ref={modalRef}
    >
      <div
        className={styles.container_modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.container_modal_modalHeader}>
          <h3>Required season pass</h3>
        </div>

        <div className={styles.container_modal_modalBody}>
          <span>You need to purchase Teleport NFT</span>
          <a
            href="https://neftyblocks.com/collection/cryptochaos1/drops/189155"
            target="_blank"
            rel="noreferrer"
          >
            <Button color="blue" size="fit">
              Buy!
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default RequiredNftModal;
