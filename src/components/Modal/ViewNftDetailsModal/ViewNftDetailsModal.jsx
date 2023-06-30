import Button from "../../Button/Button";
import styles from './styles.module.scss';
import closeIcon from '../../../assets/images/close_icon.png';

const ViewNftDetailsModal = ({ onClose, description }) => {
  return (
    <div className={styles.container} onClick={onClose}>
      <div className={styles.container_modal} onClick={e => e.stopPropagation()}>
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
        </div>

        <div className={styles.container_modal_modalFooter}>
          <Button onClick={onClose} size="medium" color="olive">Close</Button>
        </div>
      </div>
    </div>
  )
}

export default ViewNftDetailsModal;