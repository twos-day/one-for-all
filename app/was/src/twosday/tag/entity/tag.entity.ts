import { TwosdayPostModel } from '@/twosday/post/entity/post.entity';
import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class TwosdayTagModel extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true, // 중복 방지
  })
  name: string;

  @ManyToMany(() => TwosdayPostModel, (post) => post.tags)
  posts: TwosdayTagModel[];
}
