import { Module } from '@nestjs/common';
import { ImagesModule } from './images/images.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [ImagesModule, StorageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
