import {
  GetObjectCommandOutput,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { ImageOptionsType } from '../../utils/types';

export interface IStorageService {
  upload(
    key: string,
    file: Express.Multer.File,
    options: ImageOptionsType,
  ): Promise<PutObjectCommandOutput>;
  getImage(key: string): Promise<GetObjectCommandOutput>;
  getPrivateImage();
}
