import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class ImageDto {
  @IsNotEmpty()
  @Transform(({ value }) => JSON.parse(value))
  isNSFW: boolean;

  @IsNotEmpty()
  @Transform(({ value }) => JSON.parse(value))
  isProtected: boolean;

  password: string;
}
