/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ipcRenderer, contextBridge } from 'electron';

declare global {
	// eslint-disable-next-line
	interface Window {
		Main: typeof api;
	}
}

export const api = {
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
	 * Provide an easier way to listen to events
	 */
	on: (channel: string, callback: Function) => {
		ipcRenderer.on(channel, (_, data) => callback(data));
	}
};
contextBridge.exposeInMainWorld('Main', api);
