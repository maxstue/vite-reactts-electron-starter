// Native
// @ts-nocheck
import { join } from 'path';
import { io } from "socket.io-client";
const prodStream = io("https://nelson-z9ub6.ondigitalocean.app", { transports: ["websocket"] })
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import { IbWrapper } from "./ib/wrapper";

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import isDev from 'electron-is-dev';
import TickType from '@stoqey/ib/dist/api/market/tickType';

let ipcStream = null
const height = 800;
const width = 1200;

function createWindow() {
  // Create the browser window.
  const window = new BrowserWindow({
    width,
    height,
    //  change to false to use AppBar
    frame: false,
    title: "Guerilla",
    show: true,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });

  const port = process.env.PORT || 3000;
  const url = isDev ? `http://localhost:${port}` : join(__dirname, '../src/out/index.html');

  // and load the index.html of the app.
  if (isDev) {
    window?.loadURL(url);
  } else {
    window?.loadFile(url);
  }
  // Open the DevTools.
  window.webContents.openDevTools();

  window.webContents.once("dom-ready", () => {
    const { initLevels, pollIndicatorLevels } = require("./levels/publish")
    initLevels(window.webContents)
    pollIndicatorLevels(window.webContents)

    const executeOrders = require("./orders/execute")
    executeOrders(window.webContents)
    ipcStream = window.webContents

    const account = require("./common/account-stream")
    //account.on("error", error => console.log("error:", error))
    //account.on("message", message => console.warn("message:", message))
    account.once("authenticated", () => {
      console.log("account stream authenticated")

      account.subscribe("trade_updates")

      account.on("trade_updates", data => {
        if (data.event == "fill") console.log(data)
        if (data.event == "fill" && ipcStream) {
          ipcStream.send("data", {
            type: "order",
            content: JSON.stringify(data)
          })
        }
      })
    })
  })

  // For AppBar
  ipcMain.on('minimize', () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMinimized() ? window.restore() : window.minimize();
    // or alternatively: win.isVisible() ? win.hide() : win.show()
  });
  ipcMain.on('maximize', () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMaximized() ? window.restore() : window.maximize();
  });

  ipcMain.on('close', () => {
    window.close();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.whenReady().then(() => {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  });

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });


});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// const aggs = require("./aggs")
prodStream.on("connect", () => {
  console.log("connected to prod stream?", prodStream.connected)
  const executeRules = require("./rules/execute")

  prodStream.on("alpaca-T", data => {
    if (ipcStream) { // @ts-ignore
      ipcStream.send("stream", data) // @ts-ignore
      executeRules(ipcStream, data)
    }
  })

  prodStream.on("alpaca-AM", data => {
    if (ipcStream) {
      ipcStream.send("second-stream", data) // @ts-ignore
    }
  })


  // const params = {
  //   pipeIn: prodStream,
  //   pipeInChannel: "alpaca-T",
  //   pipeOut: ipcStream,
  //   pipeOutChannel: "second-stream", 
  //   interval: 60 * 1000,
  //   dataMapping: {
  //       price: "p", 
  //       size: "s",
  //       date: "t", 
  //       symbol: "S",
  //   }
  // }
  // aggs(params)

})



// console.log(account.getConnection())

// ipcMain.on("document-ready", (event: IpcMainEvent, message: string) => {
//   console.log(message)
//   const { initLevels } = require("./levels/publish")
//   initLevels(event.sender)
//   event.sender.send("Main process just initialized hydration")
// })

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {

  console.log("latest message from renderer:", message);

  if (message == "fetch-watchlist-symbols") {
    event.sender.send("data", {
      type: "watchlist-data",
      content: [{ symbol: "AAPL", lastPrice: "165" }, { symbol: "TWTR", lastPrice: "54" }]
    })
  }


  // event.sender.send("message", "this message was sent by Idris")
  // setTimeout(() => event.sender.send('message', 'hi from electron'), 1000);
  // setTimeout(() => event.sender.send('message', 'this message was sent by Idris'), 3000);


  // prodStream.on("alpaca-T", function(data: any) {
  //     //event.sender.send("message", data.S)
  //     // io.emit("trades-"+data.S, data)
  //     // event.emit("alpaca-T", data)

  //     if (data.S == "NVDA") {
  //         event.sender.send("message", "NVDA " + data.p)
  //         //console.log(data.p)
  //     }

  // })

});

ipcMain.handle("data", async (event: IpcMainInvokeEvent, data: any) => {

  let response = null
  const resource = require("./" + data.route)
  try {
    if (data.content) response = await resource(data.content, event.sender)
    else response = await resource(event.sender)

    if (response) {
      //console.log("data stuff", data)  
    } else throw "Undefined response for the requested resource at " + data.route
  } catch (e) {
    response = { status: "error", content: e || `Could not add ${data.content} to the watchlist` }
  }

  event.sender.send("toast", response)
  return response

})

let ibWrapper: IbWrapper = new IbWrapper();
// listen the channel `data` and resend the received message to the renderer process
ipcMain.on('data', (event: IpcMainEvent, data: any) => {
  ibWrapper.onData(event, data);
}

);
