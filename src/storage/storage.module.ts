import { S3 } from '@aws-sdk/client-s3';
import { Module } from '@nestjs/common';
import { Services } from '../utils/types';

@Module({
  providers: [
    {
      provide: Services.S3_CLIENT,
      useValue: new S3({
        credentials: {
          accessKeyId: process.env.SPACES_KEY,
          secretAccessKey: process.env.SPACES_SECRET_KEY,
        },
        endpoint: 'https://nyc3.digitaloceanspaces.com/',
        region: 'nyc3',
      }),
    },
  ],
  exports: [
    {
      provide: Services.S3_CLIENT,
      useValue: new S3({
        credentials: {
          accessKeyId: process.env.SPACES_KEY,
          secretAccessKey: process.env.SPACES_SECRET_KEY,
        },
        endpoint: 'https://nyc3.digitaloceanspaces.com/',
        region: 'nyc3',
      }),
    },
  ],
})
export class StorageModule {}
