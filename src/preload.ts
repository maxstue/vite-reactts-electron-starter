/* eslint-disable @typescript-eslint/ban-types */
import { ipcRenderer, contextBridge } from 'electron';

declare global {
  interface Window {
    Main: typeof api;
    ipcRenderer: typeof ipcRenderer;
  }
}

const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sayHello`
   */
  sendMessage: (message: string) => {
    ipcRenderer.send('message', message);
  },
  /**
    Here function for AppBar
   */
  Minimize: () => {
    ipcRenderer.send('minimize');
  },
  Maximize: () => {
    ipcRenderer.send('maximize');
  },
  Close: () => {
    ipcRenderer.send('close');
  },
  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: (data: any) => void) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  }
};

// const { contextBridge } = require('electron');
// const WalletProvider = require(`${__dirname}/newWalletProvider.cjs`);

// const walletProvider = new WalletProvider()
// console.log(walletProvider);
// contextBridge.exposeInMainWorld('ethereum', walletProvider);

// // contextBridge.exposeInMainWorld('wallet', {
// //     walletProvider: new WalletProvider(),
// //     createPopup: (...args) => global.createPopup(...args)
// // });

// In your preload.js
// const { contextBridge } = require('electron');
// const WalletProvider = require(`${__dirname}/walletProvider.cjs`);

// const walletProvider = new WalletProvider();

// Simplified EventEmitter for the renderer context
class SimpleEventEmitter {
  private listeners: { [event: string]: Function[] };

  constructor() {
    this.listeners = {};
  }

  on(event: string, listener: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  emit(event: string, ...args: any[]): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => listener(...args));
    }
  }

  off(event: string, listenerToRemove: Function): void {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((listener) => listener !== listenerToRemove);
    }
  }
}

const ethereumEmitter = new SimpleEventEmitter();

// Mock account value for demonstration
const mockAccount = ['0x76751Ac9f039b526EAa36561FFb8F49291700082'];

// Example of exposing a mock `window.ethereum` object
contextBridge.exposeInMainWorld('ethereum', {
  isMetaMask: true,
  isConnected: true,
  autoRefreshOnNetworkChange: null,
  // Method to handle requests from dApps
  request: async ({ method, params }: { method: string; params: any[] }) => {
    switch (method) {
      case 'eth_requestAccounts':
        // Return mock accounts
        return mockAccount;
      case 'eth_accounts':
        return mockAccount; // Return the currently connected accounts
      // case 'eth_sendTransaction':
      //   return walletProvider.sendTransaction(params[0]);
      // case 'personal_sign':
      //   return walletProvider.signMessage(params[0]);
      // //must pass in the network id before the dapp is loaded
      case 'eth_chainId':
        return '1';
      // return walletProvider.chainId;
      // case 'eth_call':
      //   return walletProvider.eth_call(params[0]);
      // case 'eth_getBalance':
      //   return walletProvider.eth_getBalance(mockAccount[0]);
      // case 'eth_signTypedData_v4':
      //   return walletProvider.signTypedData(params);
      // case 'wallet_switchEthereumChain':
      //   const chainId = parseInt(params[0].chainId, 16).toString();
      //   return walletProvider.switchChain(chainId);
      // case 'wallet_addEthereumChain':
      //   console.log(params[0]);
      //   return;
      // case 'eth_getTransactionCount':
      //   return walletProvider.getTransactionCount(params[0], params[1]);
      // case 'eth_estimateGas':
      //   return walletProvider.eth_gasPrice(params[0]);
      // case 'eth_blockNumber':
      //   console.log(params);
      //   return walletProvider.eth_blockNumber();
      // case 'eth_getTransactionByHash':
      //   return walletProvider.getTransactionByHash(params[0]);
      // case 'eth_getTransactionReceipt':
      //   return walletProvider.getTransactionReceipt(params[0]);
      default:
        throw new Error(`Method ${method} not implemented. with ${params}`);
    }
  },

  // Event subscription method
  on: (event: string, listener: Function) => {
    ethereumEmitter.on(event, listener);
  },
  // Method to remove event listeners if needed
  removeListener: (event: string, listener: Function) => {
    ethereumEmitter.off(event, listener);
  },
  // Emit chainChanged event for changing networks (mock example)
  emitChainChanged: (chainId: any) => {
    ethereumEmitter.emit('chainChanged', chainId);
  },
  // Emit accountsChanged event for account changes (mock example)
  emitAccountsChanged: (accounts: any) => {
    ethereumEmitter.emit('accountsChanged', accounts);
  },
  // Add a listener for the chainChanged event
  onChainChanged: (listener: Function) => {
    ethereumEmitter.on('chainChanged', listener);
  },

  onConnected: (listener: Function) => {
    ethereumEmitter.on('connected', listener);
  },

  // Optionally, add a method to remove a listener for the chainChanged event
  removeChainChangedListener: (listener: Function) => {
    ethereumEmitter.off('chainChanged', listener);
  }
  // // Additional utility methods like `isConnected` can also be added as needed
  // isConnected: () => {
  //   // Mock connected status
  //   ethereumEmitter.emit('isConnected', true);
  // }
});

contextBridge.exposeInMainWorld('electronAPI', {
  sendUrl: (url: string) => ipcRenderer.send('open-url', url)
});
contextBridge.exposeInMainWorld('Main', api);
/**
 * Using the ipcRenderer directly in the browser through the contextBridge ist not really secure.
 * I advise using the Main/api way !!
 */
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
