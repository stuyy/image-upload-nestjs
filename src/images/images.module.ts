import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageService } from '../storage/services/storage.service';
import { StorageModule } from '../storage/storage.module';
import { ImageReference } from '../utils/typeorm/entities/ImageReference';
import { Services } from '../utils/types';
import { ImageController } from './controllers/images/image.controller';
import { ImageService } from './services/images/image.service';

@Module({
  imports: [StorageModule, TypeOrmModule.forFeature([ImageReference])],
  controllers: [ImageController],
  providers: [
    {
      provide: Services.IMAGE,
      useClass: ImageService,
    },
    {
      provide: Services.STORAGE,
      useClass: StorageService,
    },
  ],
})
export class ImagesModule {}
