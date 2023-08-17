import { WaxJS } from "@waxio/waxjs/dist";
import AnchorLink from 'anchor-link';
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport';
import { toast } from "react-toastify";

import { setPlayerIsLogged, setWaxData, setWaxLogout } from './GlobalState/UserReducer';
import { store } from './GlobalState/Store';
import { clearMyNfts } from "./GlobalState/NftsSlice/nftsSlice";

// Class to manage user data; it will be saved on Login and deleted on Logout
export class User {
  appName = 'Chaos Marketplace'
  static instance;
  // WAX configuration
  static rpcEndpoint = 'https://wax.pink.gg'
  // for testnet
  // https://testnet.wax.pink.gg
  // for mainnet
  // https://wax.pink.gg
  static wax = undefined;
  // Shows petition signing and current balance obtaining methods
  waxSession = undefined
  static anchorSession = null

  testnet = false
  // For Anchor Wallet application
  static transport = new AnchorLinkBrowserTransport()
  static anchorLink = new AnchorLink({
    transport: User.transport,
    chains: [
      {
        chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
        nodeUrl: 'https://wax.eosphere.io',
        // for testnet
        // https://wax-testnet.eosphere.io
        // f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12
        // for mainnet
        // https://wax.eosphere.io
        // 1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4
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
      code: "xcryptochaos", // Contract that we target
      scope: "xcryptochaos", // Account that owns the data
      table: "mines", // Table name
      reverse: false, // Optional: Get reversed data
      limit: 9999999, // Limit of the data (default 10)
      show_payer: false, // Optional: Show ram payer
    });
    return res?.rows.filter((mines) => mines.player === waxAccount)
  }

  async getSlots(waxAccount) {
    const res = await User.wax?.rpc.get_table_rows({
      json: true,
      code: "xcryptochaos", // Contract that we target
      scope: "xcryptochaos", // Account that owns the data
      table: "slots", // Table name
      reverse: false, // Optional: Get reversed data
      limit: 9999999, // Limit of the data (default 10)
      show_payer: false, // Optional: Show ram payer
    });
    return res?.rows.filter((slots) => slots.player === waxAccount)
  }

  async getPlayers() {
    const res = await User.wax?.rpc.get_table_rows({
      json: true,
      code: "xcryptochaos", // Contract that we target
      scope: "xcryptochaos", // Account that owns the data
      table: "players", // Table name
      reverse: false, // Optional: Get reversed data
      limit: 9999999, // Limit of the data (default 10)
      show_payer: false, // Optional: Show ram payer
    });
    return res
  }

  // async loginAccount(name, isConnected) {
  //   try {
  //     if (isConnected) {
  //       await User.anchorSession.transact(
  //         {
  //           actions: [
  //             {
  //               account: "xcryptochaos",
  //               name: "login",
  //               authorization: [
  //                 {
  //                   actor: name,
  //                   permission: "active",
  //                 },
  //               ],
  //               data: {
  //                 player: name,
  //               },
  //             },
  //           ],
  //         },
  //         {
  //           blocksBehind: 3,
  //           expireSeconds: 30,
  //         }
  //       );
  //       toast.success("Player logged successfully using Anchor");
  //       store.dispatch(setPlayerIsLogged(true))
  //     } else {
  //       await User.wax.api.transact(
  //         {
  //           actions: [
  //             {
  //               account: "xcryptochaos",
  //               name: "login",
  //               authorization: [
  //                 {
  //                   actor: name,
  //                   permission: "active",
  //                 },
  //               ],
  //               data: {
  //                 player: name,
  //               },
  //             },
  //           ],
  //         },
  //         {
  //           blocksBehind: 3,
  //           expireSeconds: 30,
  //         }
  //       );
  //       toast.success("Player login successful using Wax");
  //       store.dispatch(setPlayerIsLogged(true))
  //     }
  //   } catch (error) {
  //     console.error("Error in loginAccount:", error);
  //     toast.error("Player login canceled");
  //     store.dispatch(setPlayerIsLogged(false))
  //   }
  // };

  async loginAccount(name, isConnected) {
    try {
      const contractAccount = "xcryptochaos";
      const actionName = "login";
      const authorization = [
        {
          actor: name,
          permission: "active",
        },
      ];
      const data = {
        player: name,
      };

      let rpc;
      if (isConnected) {
        rpc = User.anchorSession;
        toast.success("Player logged in successfully using Anchor");
      } else {
        rpc = User.wax.api;
        toast.success("Player logged in successfully using Wax");
      }

      const transactionResult = await rpc.transact(
        {
          actions: [
            {
              account: contractAccount,
              name: actionName,
              authorization: authorization,
              data: data,
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );

      // Check if the transaction was successful and the player is logged in
      if (transactionResult && transactionResult.processed) {
        store.dispatch(setPlayerIsLogged(true));
      } else {
        toast.error("Player login failed");
        store.dispatch(setPlayerIsLogged(false));
      }
    } catch (error) {
      console.error("Error in loginAccount:", error);
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
          if (!store.getState().user.playerIsLogged) {
            UserService.loginAccount(User.wax.userAccount, false);
          }
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
        if (!store.getState().user.playerIsLogged) {
          UserService.loginAccount(waxAddress, true);
        }
      }
    }
  }

  logout() {
    User.wax = undefined;
    store.dispatch(setWaxLogout())
    store.dispatch(clearMyNfts())
    store.dispatch(setPlayerIsLogged(false))
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