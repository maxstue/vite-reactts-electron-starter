export const GET_APP_VERSION = 'app:get-version';

export interface DesktopApi {
  getAppVersion(): Promise<string>;
}
