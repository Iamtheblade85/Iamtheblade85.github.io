import { useRef } from "react";
import styles from "./styles.module.scss";
import Button from "../../Button/Button";
import { motion } from "framer-motion";
import closeIcon from "../../../assets/images/icons/close_icon.png";

const ViewNftDetailsModal = ({ onClose, description, effect }) => {
  const modalRef = useRef(null);
  const infoTransition = {
    type: "spring",
    ease: "easeInOut",
    damping: 30,
  };
  return (
    <motion.div
      className={styles.container}
      transition={infoTransition}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      ref={modalRef}
      onClick={onClose}
    >
      <div
        className={styles.container_modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.container_modal_modalHeader}>
          <h3>Description</h3>
          <img
            rel="preload"
            className={styles.container_modal_modalHeader_close}
            src={closeIcon}
            onClick={onClose}
            alt="close icon"
          />
        </div>

        <div className={styles.container_modal_modalBody}>
          <span>{description}</span>
          {effect !== "No effect" && <h3>Effect</h3>}
          <span>{effect}</span>
        </div>

        <div className={styles.container_modal_modalFooter}>
          <Button onClick={onClose} size="medium" color="blue">
            Close
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewNftDetailsModal;
