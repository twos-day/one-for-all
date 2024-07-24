import { BaseModel } from '@/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('twosday_reference')
export class TwosdayReferenceModel extends BaseModel {
  @Column()
  url: string;

  @Column()
  thumbnail: string;

  @Column()
  description: string;
}
