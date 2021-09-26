import { PutObjectCommandOutput, S3 } from '@aws-sdk/client-s3';
import { Inject } from '@nestjs/common';
import {
  ImageOptionsType,
  ImagePermission,
  Services,
  SPACES_BUCKET_NAME,
} from '../../utils/types';
import { IStorageService } from './storage';

export class StorageService implements IStorageService {
  constructor(@Inject(Services.S3_CLIENT) private readonly s3Client: S3) {}
  upload(
    key: string,
    file: Express.Multer.File,
    { isProtected }: ImageOptionsType,
  ): Promise<PutObjectCommandOutput> {
    return this.s3Client.putObject({
      Bucket: SPACES_BUCKET_NAME,
      Key: `${key}`,
      Body: file.buffer,
      ACL: isProtected ? ImagePermission.PRIVATE : ImagePermission.PUBLIC,
      ContentType: file.mimetype,
    });
  }

  getImage(key: string) {
    return this.s3Client.getObject({
      Bucket: SPACES_BUCKET_NAME,
      Key: key,
    });
  }
}
