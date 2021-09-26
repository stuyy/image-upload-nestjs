import { ArgumentMetadata, HttpStatus, PipeTransform } from '@nestjs/common';
import { ImageOptionsDto } from '../dto/ImageOptionsDto';
import { HttpException } from '@nestjs/common';

export class ImageDTOValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const imageDto = value as ImageOptionsDto;
      if (imageDto.isProtected && !imageDto.password)
        throw new HttpException(
          'Password is required for a protected image',
          HttpStatus.BAD_REQUEST,
        );
      else return value;
    } else if (metadata.type === 'custom') {
      if (!value)
        throw new HttpException('File Required', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
