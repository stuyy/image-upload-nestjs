import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Services, SPACES_URL } from '../../../utils/types';
import { ImageServiceInterface } from '../../services/images/image';
import { v4 as uuidv4 } from 'uuid';

@Controller('image')
export class ImageController {
  constructor(
    @Inject(Services.IMAGE)
    private readonly imageService: ImageServiceInterface,
  ) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createImage(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const key = uuidv4().split('-')[0];
      await this.imageService.upload(key, file);
      res.status(201).send(key);
    } catch (err) {
      console.log(err);
      res.send(500);
    }
  }

  @Get(':key')
  async getImage(@Param('key') key: string, @Res() res: Response) {
    console.log(key);
    try {
      await this.imageService.read(key);
      res.send(`${SPACES_URL}/${key}`);
    } catch (err) {
      console.log(err);
      res.send(400);
    }
  }
}
