import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'image_references' })
export class ImageReference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'image_id' })
  imageId: string;

  @Column({ name: 'e_tag' })
  etag: string;

  @Column({ name: 'is_nsfw' })
  isNSFW: boolean;

  @Column({ name: 'is_protected' })
  isProtected: boolean;

  @Column()
  password: string;
}
