import { PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IStorageService } from '../../../storage/services/storage';
import { ImageReference } from '../../../utils/typeorm/entities/ImageReference';
import { ImageOptionsType, Services } from '../../../utils/types';
import { ImageServiceInterface } from './image';

export class ImageService implements ImageServiceInterface {
  constructor(
    @Inject(Services.STORAGE) private readonly storageService: IStorageService,
    @InjectRepository(ImageReference)
    private readonly imageReferenceRepository: Repository<ImageReference>,
  ) {}

  async upload(
    key: string,
    file: Express.Multer.File,
    imageOptions: ImageOptionsType,
  ): Promise<PutObjectCommandOutput> {
    const uploaded = await this.storageService.upload(key, file, imageOptions);
    console.log(uploaded);
    return uploaded;
  }
  delete() {
    throw new Error('Method not implemented.');
  }
  read(key: string) {
    return this.storageService.getImage(key);
  }
}
