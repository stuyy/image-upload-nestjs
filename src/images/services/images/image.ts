import { PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { ImageOptionsType } from '../../../utils/types';
export interface ImageServiceInterface {
  upload(
    key: string,
    file: Express.Multer.File,
    imageOptions: ImageOptionsType,
  ): Promise<PutObjectCommandOutput>;
  delete();
  read(key: string);
}
