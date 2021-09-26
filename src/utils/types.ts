export const SPACES_URL = 'https://imguploader.nyc3.digitaloceanspaces.com';
export const SPACES_BUCKET_NAME = 'imguploader';

export enum Routes {
  IMAGE = 'image',
}

export enum Services {
  IMAGE = 'image',
  STORAGE = 'storage',
  S3_CLIENT = 'S3_CLIENT',
}

export type ImageOptionsType = {
  isNSFW: boolean;
  isProtected: boolean;
  password: string;
};

export enum ImagePermission {
  PUBLIC = 'public-read',
  PRIVATE = 'private',
}
