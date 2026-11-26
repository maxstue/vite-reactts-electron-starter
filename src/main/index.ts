import { join } from 'node:path';
import { app, BrowserWindow, ipcMain, protocol, session } from 'electron';
import { GET_APP_VERSION } from '../shared/desktop-api';
import { registerRendererProtocol } from './renderer-protocol';

const APP_URL = 'app://renderer/index.html';
const devUrl = app.isPackaged ? undefined : process.env.ELECTRON_RENDERER_URL;
const rendererUrl = new URL(devUrl ?? APP_URL).href;

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true } },
]);

async function createWindow(): Promise<void> {
  const window = new BrowserWindow({
    width: 900,
    height: 620,
    minWidth: 360,
    minHeight: 420,
    title: 'Electron React Starter',
    webPreferences: {
      preload: join(import.meta.dirname, '../preload/index.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  window.webContents.on('will-navigate', (event) => event.preventDefault());
  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));

  await window.loadURL(rendererUrl);
}

function openWindow(): void {
  void createWindow().catch((error: unknown) => {
    console.error('Could not load the renderer.', error);
    app.exit(1);
  });
}

void app.whenReady().then(() => {
  if (!devUrl) {
    registerRendererProtocol(join(import.meta.dirname, '../renderer'));
  }

  session.defaultSession.setPermissionCheckHandler(() => false);
  session.defaultSession.setPermissionRequestHandler((_contents, _permission, callback) => {
    callback(false);
  });

  ipcMain.handle(GET_APP_VERSION, (event) => {
    const frame = event.senderFrame;
    if (!frame || frame !== event.sender.mainFrame || frame.url !== rendererUrl) {
      throw new Error('Unexpected IPC sender.');
    }

    return app.getVersion();
  });

  openWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) openWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
