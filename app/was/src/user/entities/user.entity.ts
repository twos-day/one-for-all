import { BaseModel } from '@/common/entity/base.entity';
import { ImageModel } from '@/image/entity/image.entity';
import { TwosdayPostModel } from '@/twosday/post/entity/post.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { AccountType } from '../const/account-type.const';
import { StatusEnum } from '../const/status.const';

@Entity('users')
export class UserModel extends BaseModel {
  @Column({ length: 20 })
  @ApiProperty()
  nickname: string;

  @Column({ unique: true })
  email: string;

  @Exclude({ toPlainOnly: true }) // password는 반환하지 않음
  @Column({ nullable: true })
  password: string | null;

  @Column({ nullable: true })
  avatar: string | null;

  @Column({ type: 'enum', enum: AccountType, nullable: true })
  accountType?: AccountType;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  verificationCode: string;

  @Exclude({ toPlainOnly: true })
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  expiresAt: Date | null;

  @Column({ type: 'enum', enum: StatusEnum })
  status: StatusEnum;

  @Column({ default: 1 })
  level: number;

  @OneToMany(() => TwosdayPostModel, (post) => post.author)
  posts: TwosdayPostModel[];

  @OneToMany(() => ImageModel, (image) => image.user)
  images: ImageModel[];
}
