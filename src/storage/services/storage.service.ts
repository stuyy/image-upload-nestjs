import { PutObjectCommandOutput, S3 } from '@aws-sdk/client-s3';
import { Inject } from '@nestjs/common';
import { Services } from '../../utils/types';
import { IStorageService } from './storage';

export class StorageService implements IStorageService {
  constructor(@Inject(Services.S3_CLIENT) private readonly s3Client: S3) {}
  upload(
    key: string,
    file: Express.Multer.File,
  ): Promise<PutObjectCommandOutput> {
    return this.s3Client.putObject({
      Bucket: 'imguploader',
      Key: `${key}`,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
    });
  }

  getImage(key: string) {
    return this.s3Client.getObject({
      Bucket: 'imguploader',
      Key: key,
    });
  }
}
