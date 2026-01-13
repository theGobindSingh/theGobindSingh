export interface CloudinaryAsset {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  folder: string;
  url: string;
  secure_url: string;
}

export interface SecureCloudinaryAsset {
  id: CloudinaryAsset['public_id'];
  url: CloudinaryAsset['secure_url'];
  height: CloudinaryAsset['height'];
  width: CloudinaryAsset['width'];
  format: CloudinaryAsset['format'];
  bytes: CloudinaryAsset['bytes'];
  blurUrl?: string;
}
