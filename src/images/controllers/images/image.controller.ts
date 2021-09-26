import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Services } from '../../../utils/types';
import { ImageServiceInterface } from '../../services/images/image';
import { v4 as uuidv4 } from 'uuid';
import { ImageOptionsDto } from '../../utils/dto/ImageOptionsDto';
import { ImageDTOValidationPipe } from '../../utils/pipes/ImageDTOValidationPipe';
import { Readable } from 'stream';

@Controller('image')
export class ImageController {
  constructor(
    @Inject(Services.IMAGE)
    private readonly imageService: ImageServiceInterface,
  ) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true }), ImageDTOValidationPipe)
  async createImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() imageOptions: ImageOptionsDto,
    @Res() res: Response,
  ) {
    console.log(imageOptions);
    try {
      const key = uuidv4().split('-')[0];
      const upload = await this.imageService.upload(key, file, imageOptions);
      console.log(upload);
      res.status(201).send(key);
    } catch (err) {
      console.log(err);
      res.send(500);
    }
  }

  @Post(':imageId')
  async getProtectedImage(
    @Param('imageId') imageId: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    // TO-DO: Move to a ValidationPipe
    const isProtected = await this.imageService.getImagePermission(imageId);
    if (!isProtected) return res.sendStatus(400);
    if (!password) return res.sendStatus(403);
    const valid = await this.imageService.validatePassword(imageId, password);
    if (!valid) return res.sendStatus(403);

    try {
      const image = await this.imageService.getImage(imageId);
      const readable = image.Body as Readable;
      // const read = new StreamableFile(readable);
      res.status(200);
      return readable.pipe(res);
      // res.send(`${SPACES_URL}/${key}`);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  @Get(':imageId/reference')
  async getImageReference(
    @Param('imageId') imageId: string,
    @Res() res: Response,
  ) {
    try {
      const imageRef = await this.imageService.getImageReference(imageId);
      res.send(imageRef);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: 'Image Not Found' });
    }
  }
}
