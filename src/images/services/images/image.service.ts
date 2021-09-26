import { GetObjectCommandOutput } from '@aws-sdk/client-s3';
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
  ): Promise<ImageReference> {
    const uploaded = await this.storageService.upload(key, file, imageOptions);
    console.log(uploaded);
    const newImageRef = this.imageReferenceRepository.create({
      imageId: key,
      etag: uploaded.ETag,
      ...imageOptions,
    });
    return this.imageReferenceRepository.save(newImageRef);
  }

  async getImage(imageId: string): Promise<GetObjectCommandOutput> {
    return this.storageService.getImage(imageId);
  }

  async getImagePermission(imageId: string): Promise<boolean> {
    const imageRef = await this.imageReferenceRepository.findOne({ imageId });
    if (!imageRef) throw new Error('No Image Found');
    return imageRef.isProtected;
  }

  async getImageReference(imageId: string) {
    const imageRef = await this.imageReferenceRepository.findOne({ imageId });
    if (!imageRef) throw new Error('No Image Found');
    return imageRef;
  }

  async validatePassword(imageId: string, password: string): Promise<boolean> {
    const imageRef = await this.imageReferenceRepository.findOne({ imageId });
    if (!imageRef) throw new Error('No Image Found');
    return imageRef.password === password;
  }
}
