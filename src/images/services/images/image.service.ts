import { PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { Inject } from '@nestjs/common';
import { IStorageService } from '../../../storage/services/storage';
import { Services } from '../../../utils/types';
import { ImageServiceInterface } from './image';

export class ImageService implements ImageServiceInterface {
  constructor(
    @Inject(Services.STORAGE) private readonly storageService: IStorageService,
  ) {}

  upload(
    key: string,
    file: Express.Multer.File,
  ): Promise<PutObjectCommandOutput> {
    return this.storageService.upload(key, file);
  }
  delete() {
    throw new Error('Method not implemented.');
  }
  read(key: string) {
    return this.storageService.getImage(key);
  }
}
