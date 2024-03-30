// Native
import { join } from 'path';

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, BrowserView } from 'electron';
import isDev from 'electron-is-dev';

const height = 800;
const width = 1000;
let view: BrowserView | null = null;
function createWindow() {
  // Create the browser window.
  const window = new BrowserWindow({
    width,
    height,
    //  change to false to use AppBar
    frame: false,
    show: true,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  });

  let isBrowserViewVisible = false; // Initial state

  // Initialize BrowserView
  ipcMain.on('load-url', (_, url) => {
    if (!view) {
      view = new BrowserView({
        webPreferences: {
          preload: join(__dirname, 'preload.js') // Specify preload here for consistency
        }
      });
      window.setBrowserView(view);
    }
    view.webContents.loadURL(url);
    view.setBounds({ x: 0, y: 80, width: window.getBounds().width - 250, height: window.getBounds().height * 0.8 });
    view.setAutoResize({ width: true, height: true });
    isBrowserViewVisible = true;
  });

  const port = process.env.PORT || 3000;
  const url = isDev ? `http://localhost:${port}` : join(__dirname, '../src/out/index.html');

  let Address: string;
  let PrivateKey: string;

  // and load the index.html of the app.
  if (isDev) {
    window?.loadURL(url);
  } else {
    window?.loadFile(url);
  }
  // Open the DevTools.
  // window.webContents.openDevTools();

  // When toggling the view, update this state
  ipcMain.on('toggle-view', () => {
    if (view && window.getBrowserView() === view) {
      window.removeBrowserView(view);
      isBrowserViewVisible = false;
    } else if (view) {
      window.setBrowserView(view);
      isBrowserViewVisible = true;
    }
    // Send an update to all renderer processes about the change
    window.webContents.send('update-view-visibility', isBrowserViewVisible);
  });

  ipcMain.handle('query-view-visibility', () => isBrowserViewVisible);

  window.on('resize', () => {
    // Update BrowserView bounds on window resize
    if (view !== null) {
      view.setBounds({ x: 0, y: 80, width: window.getBounds().width - 100, height: window.getBounds().height * 0.8 });
    }
  });
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

  ipcMain.on('send-user-data', (event, { userAddress, privateKey }) => {
    // Store userAddress and privateKey securely and make them available to preload script
    console.log(event.NONE);
    Address = userAddress;
    PrivateKey = privateKey;
  });

  ipcMain.handle('get-user-data', (event) => {
    // Optional: Decrypt userData here
    console.log(event.NONE);
    return { Address, PrivateKey };
  });

  ipcMain.on('open-url', (event, url) => {
    if (window) {
      console.log(url);
      setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
    } else {
      console.log('Dapphub is not open. Event called:', event);
    }
    // console.log(event);
    // const urlWindow = new BrowserWindow({
    //   width: 800,
    //   height: 600,
    //   webPreferences: {
    //     preload: join(__dirname, 'preload.js'),
    //     nodeIntegration: false
    //   }
    // });
    // urlWindow.loadURL(url);
    // if (window) {
    //   window.webContents.loadURL(url);
    // } else {
    //   console.error('The main window is not available.', event);
    // }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

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

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send('message', message), 500);
});
