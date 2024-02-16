export enum DrawerPosition {
  TOP = 'TOP',
  CENTER = 'CENTER',
  BOTTOM = 'BOTTOM',
  BOTTOM_NO_PADDING = 'BOTTOM_NO_PADDING',
}

export enum DrawerCloseButtonPosition {
  'OUTER' = 'close-button-outer',
  'INNER' = 'close-button-inner',
}

export enum DrawerTransitionName {
  'SLIDE_LEFT' = 'slide-left',
  'SLIDE_RIGHT' = 'slide-right',
  'SLIDE_UP' = 'slide-up',
  'SLIDE_DOWN' = 'slide-down',
  'FADE' = 'fade',
  'NONE' = 'none',
  'DEFAULT' = 'default',
}

export enum DrawerSize {
  AUTO = 'AUTO',
  FULL = 'FULL',
}

export interface DrawerItem {
  id?: string;
  ref?: any;
  component: any;
  data: any;
  events: any;
  canCloseForModal?: boolean;
  useCloseButton?: boolean;
  useModal?: boolean;
  closeButtonPosition?: DrawerCloseButtonPosition;
  position?: DrawerPosition;
  animationName?: string;
  componentName?: string;
  noPadding?: boolean;
  backgroundColor?: string;
  drawerEvent?: string;
  size?: DrawerSize;
}

export interface DrawerState {
  items: DrawerItem[];
  observers: any;
}
