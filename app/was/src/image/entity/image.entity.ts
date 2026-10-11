import { IsString } from 'class-validator';
import { BaseModel } from '@/common/entity/base.entity';
import { UserModel } from '@/user/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { TwosdayPostModel } from '@/twosday/post/entity/post.entity';

@Entity('images')
export class ImageModel extends BaseModel {
  @ManyToOne(() => UserModel, (user) => user.images, { nullable: false })
  user: UserModel;

  @ManyToMany(() => TwosdayPostModel, (post) => post.images)
  posts: TwosdayPostModel[];

  @IsString()
  @Column({
    unique: true,
  })
  key: string; // S3에 저장된 이미지의 키
}
