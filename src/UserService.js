import { WaxJS } from "@waxio/waxjs/dist";
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'
import AnchorLink from 'anchor-link'
import { setWaxData, setWaxLogout } from './GlobalState/UserReducer';
import { store } from './GlobalState/Store';
import { clearMyNfts } from "./GlobalState/NftsSlice/nftsSlice";

/**
 * Class to manage user data; it will be saved on Login and deleted on Logout
 */
export class User {
  appName = 'Chaos Marketplace'
  static instance;
  /**
   * WAX configuration
  */
  // static rpcEndpoint = 'https://wax.greymass.com'
  static rpcEndpoint = 'https://testnet.wax.pink.gg'
  static wax = undefined;
  // Shows petition signing and current balance obtaining methods
  waxSession = undefined
  static anchorSession = null

  testnet = true

  /**
   * 
   * FOR ANCHOR
   * 
   */
  static transport = new AnchorLinkBrowserTransport()
  static anchorLink = new AnchorLink({
    transport: User.transport,
    chains: [
      {
        chainId: 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12',
        // chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        nodeUrl: 'https://wax-testnet.eosphere.io',
        // nodeUrl: 'https://eos.greymass.com',
      },
    ],
  })


  async waxLogin() {
    try {
      //if autologged in, this simply returns the userAccount w/no popup
      User.wax = new WaxJS({ rpcEndpoint: User.rpcEndpoint, tryAutoLogin: true });
      let userAccount = await User.wax?.login() || '';
      return userAccount;
    } catch (e) {
      console.error(e.message);
    }
  }

  async anchorConnect() {
    // Perform the login, which returns the users identity
    try {
      User.wax = new WaxJS({ rpcEndpoint: User.rpcEndpoint, tryAutoLogin: true });
      const identity = await User.anchorLink.login('mydapp')
      User.anchorSession = identity.session
      return identity
    } catch (e) {
      console.error(e)
      return false
    }
    // Save the session within your application for future use
  }

  logout() {
    User.wax = undefined;
    store.dispatch(setWaxLogout())
    store.dispatch(clearMyNfts())
    return true;
  }

  async getWaxBalance(waxAccount) {
    if (waxAccount === undefined) {
      return null
    } else {
      const balance = await User.wax?.rpc?.get_account(waxAccount)
      return balance?.core_liquid_balance
    }
  }

  static restoreWaxSession = async () => {
    if (store.getState().user.waxConnected) {
      User.wax = new WaxJS({ rpcEndpoint: User.rpcEndpoint, tryAutoLogin: true });
      await User.wax.isAutoLoginAvailable().then(async autoLogin => {
        if (autoLogin) {
          store.dispatch(setWaxData({
            name: User.wax.userAccount,
            isLogged: true,
            balance: await UserService.getWaxBalance(User.wax.userAccount)
          }))
        }
      });
    }
  }

  static restoreAnchorSession = async () => {
    if (store.getState().user.anchorConnected) {
      User.wax = new WaxJS({ rpcEndpoint: User.rpcEndpoint, tryAutoLogin: true });
      User.anchorSession = await User.anchorLink.restoreSession('mydapp');
      if (User.anchorSession?.auth) {
        let waxAddress = User.anchorSession.auth.actor.toString();
        store.dispatch(setWaxData({
          name: waxAddress,
          isLogged: true,
          balance: await UserService.getWaxBalance(waxAddress)
        }))
      }
    }
  }

  // UserService init called to prepare UAL Login.
  static async init() {
    try {
      User.restoreWaxSession();
      User.restoreAnchorSession();
    } catch (e) {
      console.log(e)
    }

  }

  static new() {
    if (!User.instance) {
      User.instance = new User()
    }

    return User.instance
  }
}

export const UserService = User.new()