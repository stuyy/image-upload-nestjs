import { PutObjectCommandOutput } from '@aws-sdk/client-s3';

export interface ImageServiceInterface {
  upload(
    key: string,
    file: Express.Multer.File,
  ): Promise<PutObjectCommandOutput>;
  delete();
  read(key: string);
}
