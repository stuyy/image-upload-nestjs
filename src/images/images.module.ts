import { Module } from '@nestjs/common';
import { StorageService } from '../storage/services/storage.service';
import { StorageModule } from '../storage/storage.module';
import { Services } from '../utils/types';
import { ImageController } from './controllers/images/image.controller';
import { ImageService } from './services/images/image.service';

@Module({
  imports: [StorageModule],
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
