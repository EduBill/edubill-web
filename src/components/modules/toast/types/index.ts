export enum ToastType {
  ALERT = 'ALERT',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
}
export interface ToastMargin {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface ToastState {
  items: ToastItem[];
  margin: ToastMargin;
}
