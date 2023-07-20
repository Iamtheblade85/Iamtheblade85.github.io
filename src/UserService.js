import { WaxJS } from "@waxio/waxjs/dist";
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'
import AnchorLink from 'anchor-link'
import { setWaxData, setWaxLogout } from './GlobalState/UserReducer';
import { store } from './GlobalState/Store';
import { clearMyNfts } from "./GlobalState/NftsSlice/nftsSlice";
import { toast } from "react-toastify";

// Class to manage user data; it will be saved on Login and deleted on Logout

export class User {
  appName = 'Chaos Marketplace'
  static instance;
  // WAX configuration
  static rpcEndpoint = 'https://testnet.wax.pink.gg'
  static wax = undefined;
  // Shows petition signing and current balance obtaining methods
  waxSession = undefined
  static anchorSession = null

  testnet = true
  // For ANCHOR
  static transport = new AnchorLinkBrowserTransport()
  static anchorLink = new AnchorLink({
    transport: User.transport,
    chains: [
      {
        chainId: 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12',
        nodeUrl: 'https://wax-testnet.eosphere.io',
      },
    ],
  })


  async waxLogin() {
    try {
      User.wax = new WaxJS({ rpcEndpoint: User.rpcEndpoint, tryAutoLogin: true });
      let userAccount = await User.wax?.login() || '';
      return userAccount;
    } catch (e) {
      console.error(e.message);
    }
  }

  async anchorConnect() {
    try {
      User.wax = new WaxJS({ rpcEndpoint: User.rpcEndpoint, tryAutoLogin: true });
      const identity = await User.anchorLink.login('mydapp')
      User.anchorSession = identity.session
      return identity
    } catch (e) {
      console.error(e)
      return false
    }
  }

  async getWaxBalance(waxAccount) {
    if (waxAccount === undefined) {
      return null
    } else {
      const balance = await User.wax?.rpc?.get_account(waxAccount)
      return balance?.core_liquid_balance
    }
  }

  async getMines(waxAccount) {
    const res = await User.wax?.rpc.get_table_rows({
      json: true,
      code: "blockchain44", // Contract that we target
      scope: "blockchain44", // Account that owns the data
      table: "mines", // Table name
      reverse: false, // Optional: Get reversed data
      show_payer: false, // Optional: Show ram payer
    });
    return res?.rows.filter((mines) => mines.player === waxAccount)
  }

  async getSlots(waxAccount) {
    const res = await User.wax?.rpc.get_table_rows({
      json: true,
      code: "blockchain44", // Contract that we target
      scope: "blockchain44", // Account that owns the data
      table: "slots", // Table name
      reverse: false, // Optional: Get reversed data
      show_payer: false, // Optional: Show ram payer
    });
    return res?.rows.filter((slots) => slots.player === waxAccount)
  }

  async getPlayers() {
    const res = await User.wax?.rpc.get_table_rows({
      json: true,
      code: "blockchain44", // Contract that we target
      scope: "blockchain44", // Account that owns the data
      table: "players", // Table name
      reverse: false, // Optional: Get reversed data
      show_payer: false, // Optional: Show ram payer
    });
    return res
  }

  async loginAccount(name, isConnected) {
    try {
      if (isConnected) {
        await User.anchorSession.transact(
          {
            actions: [
              {
                account: "blockchain44",
                name: "login",
                authorization: [
                  {
                    actor: name,
                    permission: "active",
                  },
                ],
                data: {
                  player: name,
                },
              },
            ],
          },
          {
            blocksBehind: 3,
            expireSeconds: 30,
          }
        );
        toast.success("Player logged successfully using Anchor");
      } else {
        await User.wax.api.transact(
          {
            actions: [
              {
                account: "blockchain44",
                name: "login",
                authorization: [
                  {
                    actor: name,
                    permission: "active",
                  },
                ],
                data: {
                  player: name,
                },
              },
            ],
          },
          {
            blocksBehind: 3,
            expireSeconds: 30,
          }
        );
        toast.success("Player login successful using Wax");
      }
    } catch (error) {
      console.error("Error in loginAccount:", error);
      // toast.error("Player doesn't exist, burn season pass nft to create an account");
      toast.error("Player login canceled");
    }
  };

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
          UserService.loginAccount(User.wax.userAccount, false)
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
        UserService.loginAccount(waxAddress, true)
      }
    }
  }

  logout() {
    User.wax = undefined;
    store.dispatch(setWaxLogout())
    store.dispatch(clearMyNfts())
    return true;
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