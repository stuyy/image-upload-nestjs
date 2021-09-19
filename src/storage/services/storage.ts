import { PutObjectCommandOutput } from '@aws-sdk/client-s3';

export interface IStorageService {
  upload(
    key: string,
    file: Express.Multer.File,
  ): Promise<PutObjectCommandOutput>;
  getImage(key: string);
}
