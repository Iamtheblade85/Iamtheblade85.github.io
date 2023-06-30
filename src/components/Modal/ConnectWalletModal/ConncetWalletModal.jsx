import { useDispatch } from 'react-redux';

import waxIcon from '../../../assets/images/wax_icon.png';
import closeIcon from '../../../assets/images/close_icon.png';
import anchorIcon from '../../../assets/images/anchor_icon.png';

import styles from './styles.module.scss';

import { UserService } from '../../../UserService';
import { setAnchorConnected, setWaxConnected, setWaxData } from '../../../GlobalState/UserReducer';
import Button from '../../Button/Button';


const ConnectWalletModal = ({ onClose }) => {
  const dispatch = useDispatch()

  const connectWaxWallet = async () => {
    UserService.waxLogin().then(async res => {
      const waxBalance = await UserService.getWaxBalance(res)
      dispatch(setWaxData({
        name: res,
        isLogged: true,
        waxBalance: waxBalance
      }))
      dispatch(setWaxConnected())
      onClose()
    });
  };

  const connectAnchorWallet = () => {
    UserService.anchorConnect().then(async (wallet) => {
      if (wallet) {
        let waxAddress = wallet?.session.auth.actor.toString();
        dispatch(setWaxData({
          name: waxAddress,
          isLogged: true,
          balance: await UserService.getWaxBalance(waxAddress)
        }))
        dispatch(setAnchorConnected())
        onClose()
      } else {
        console.error('anchor error')
      }
    })
  }

  return (
    <div className={styles.container} onClick={onClose}>
      <div className={styles.container_modal} onClick={e => e.stopPropagation()}>
        <div className={styles.container_modal_modalHeader}>
          <h3>Choose your wallet</h3>
          <img
            rel="preload"
            className={styles.container_modal_modalHeader_close}
            src={closeIcon}
            onClick={onClose}
            alt='close icon'
          />
        </div>
        <div className={styles.container_modal_modalBody}>
          <div onClick={connectWaxWallet}>
            <img rel="preload" src={waxIcon} alt='wax connect icon' />
            <h5>Wax Cloud Wallet</h5>
          </div>
          <div onClick={connectAnchorWallet}>
            <img rel="preload" src={anchorIcon} alt='anchor connect icon' />
            <h5>Anchor Wallet</h5>
          </div>
        </div>
        <div className={styles.container_modal_modalFooter}>
          <Button onClick={onClose} size="medium" color="olive">Close</Button>
        </div>
      </div>
    </div>
  )
}

export default ConnectWalletModal;