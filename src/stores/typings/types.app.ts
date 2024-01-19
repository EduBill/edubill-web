export interface DeviceInfo {
  app_id: string;
  app_version: string;
  os_type: string;
  os_version: string;
  device_id: string;
  device_type: string;
  device_name?: string;
  device_model: string;
  device_locale?: string;
  device_user_agent: string;
  push_token: string;
}

export enum WNICustom {
  REMOTE_CONFIG = 'remote_config',
}
