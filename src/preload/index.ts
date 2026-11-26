import { contextBridge, ipcRenderer } from 'electron';
import { GET_APP_VERSION, type DesktopApi } from '../shared/desktop-api';

const desktop: DesktopApi = {
  getAppVersion: () => ipcRenderer.invoke(GET_APP_VERSION),
};

contextBridge.exposeInMainWorld('desktop', desktop);
