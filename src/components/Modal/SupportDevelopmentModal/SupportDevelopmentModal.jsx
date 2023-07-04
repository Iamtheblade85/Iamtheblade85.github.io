import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles.module.scss";

import closeIcon from '../../../assets/images/close_icon.png';

import { User, UserService } from '../../../UserService';
import { setWaxBalance } from '../../../GlobalState/UserReducer';

import Button from "../../Button/Button";
import Input from "../../Input/Input";


const SupportDevelopmentModal = ({ onClose }) => {
  const dispatch = useDispatch()
  const { waxConnected, anchorConnected } = useSelector((store) => store.user);
  const [value, setValue] = useState('')

  function sendWax() {
    if (value.trim() === '') return;

    let precision = 8;
    let amount = parseFloat(value.trim()).toFixed(precision);

    if (anchorConnected) {
      sendWithAnchor(amount)
    }
    else if (waxConnected) {
      sendWithWaxCloud(amount)
    }
  }

  const sendWithAnchor = (amount) => {
    const action = {
      account: 'eosio.token',
      name: 'transfer',
      authorization: [{
        actor: User.anchorSession?.auth?.actor.toString() || '',
        permission: 'active'
      }],
      data: {
        from: User.anchorSession?.auth.actor.toString(),
        to: 'qhtunwo2p.gm',
        quantity: amount + ' WAX',
        memo: 'Community support for development.',
      },
    }

    User.anchorSession?.transact({ action }).then(async () => {
      let waxAddress = User.anchorSession.auth.actor.toString();
      const balance = await UserService.getWaxBalance(waxAddress)
      dispatch(setWaxBalance(balance))
      onClose()
    })
      .catch(error => {
        console.error(error)
      })
  }

  const sendWithWaxCloud = (amount) => {
    User.wax.api.transact({
      actions: [{
        account: 'eosio.token',
        name: 'transfer',
        authorization: [{
          actor: User.wax?.userAccount || '',
          permission: 'active'
        }],
        data: {
          from: User.wax?.userAccount || '',
          to: 'qhtunwo2p.gm',
          quantity: amount + ' WAX',
          memo: 'Community support for development.'
        }
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30
    })
      .then(response => {
        onClose();
      })
  }

  return (
    <div className={styles.container} onClick={onClose}>
      <div className={styles.container_modal} onClick={e => e.stopPropagation()}>
        <div className={styles.container_modal_modalHeader}>
          <h3>Support the Development!</h3>
          <img
            rel="preload"
            className={styles.container_modal_modalHeader_close}
            src={closeIcon}
            onClick={onClose}
            alt="close icon"
          />
        </div>

        <div className={styles.container_modal_modalBody}>
          <Input
            type="number"
            label="Amount"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className={styles.container_modal_modalFooter}>
          <Button onClick={onClose} size="medium" color="olive">Close</Button>
          <Button onClick={sendWax} size="medium" color="white">Send</Button>
        </div>
      </div>
    </div>
  )
}

export default SupportDevelopmentModal;