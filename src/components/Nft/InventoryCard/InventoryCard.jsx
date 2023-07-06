import React from "react";
import styles from "./styles.module.scss";
import Button from "../../Button/Button";

const InventoryCard = ({ item, buttonLoader, buttonFunc }) => {
  return (
    <div key={item.id} className={styles.inventoryBlock}>
      <img
        rel="preload"
        src={item.image}
        alt={item.image ? item.name : "No Image"}
      />
      <div className={styles.inventoryBlock_infoValue}>
        <span>Name: </span>
        <span>{item.name}</span>
      </div>
      <div className={styles.inventoryBlock_infoValue}>
        <span>Quantity: </span>
        <span>{item.quantity}</span>
      </div>
      <div className={styles.inventoryBlock_buttonWrapper}>
        <Button
          onClick={buttonFunc}
          disabled={buttonLoader && buttonLoader !== item.id}
          loader={buttonLoader === item?.id}
          size="auto"
          color="blue"
        >
          Export into staging
        </Button>
      </div>
    </div>
  );
};

export default InventoryCard;
