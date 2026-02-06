
export type QRStyle = 'default' | 'facebook' | 'instagram' | 'youtube' | 'tiktok' | 'google' | 'custom';

export interface QRConfig {
  value: string;
  dotColor: string;
  bgColor: string;
  logo?: string;
  style: QRStyle;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
}

export type ExportFormat = 'png' | 'jpeg' | 'webp';
