import { BaseModel } from '@/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('references')
export class TwosdayReferenceModel extends BaseModel {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @Column({ unique: true })
  url: string;
}
