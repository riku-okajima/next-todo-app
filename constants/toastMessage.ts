import { Color } from '@material-ui/lab/Alert';

export interface ToastMessage {
  [key: string]: ToastMessageValue;
}

export interface ToastMessageValue {
  severity: Color | undefined;
  message: string;
}

export const TOAST_MESSAGE: ToastMessage = {
  LOGIN_SUCCESSFUL: { severity: 'success', message: 'ログインしました' },
  LOGOUT_SUCCESSFUL: { severity: 'success', message: 'ログアウトしました' },
  TIMEOUT_ERROR: { severity: 'error', message: 'タイムアウトエラーが発生しました' },
  NETWORK_ERROR: { severity: 'error', message: 'ネットワークエラーが発生しました' },
};

export type ToastMessageKey = keyof typeof TOAST_MESSAGE;
