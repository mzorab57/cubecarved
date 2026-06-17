export const isVideoAsset = (asset) =>
  /\.(mp4|webm)$/i.test(typeof asset === 'string' ? asset : asset?.src || '');

export const toAssetUrl = (src = '') => encodeURI(src);
