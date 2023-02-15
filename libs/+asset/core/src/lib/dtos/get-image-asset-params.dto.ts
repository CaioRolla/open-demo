export interface GetImageAssetParamsDto {
  crop: 'original' | 'contain' | 'cover' | 'resize' | 'scaleToFit';

  width?: 'auto' | number;

  height?: 'auto' | number;
}
