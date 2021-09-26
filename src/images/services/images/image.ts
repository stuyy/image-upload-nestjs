import { GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { ImageReference } from '../../../utils/typeorm/entities/ImageReference';
import { ImageOptionsType } from '../../../utils/types';
export interface ImageServiceInterface {
  upload(
    key: string,
    file: Express.Multer.File,
    imageOptions: ImageOptionsType,
  ): Promise<ImageReference>;
  getImage(key: string): Promise<GetObjectCommandOutput>;
  getImagePermission(imageId: string): Promise<boolean>;
  getImageReference(imageId: string): Promise<ImageReference>;
  validatePassword(imageId: string, password: string): Promise<boolean>;
}
