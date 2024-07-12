import { PickType } from '@nestjs/mapped-types';
import { UserModel } from 'src/user/entities/user.entity';

export class UpdateUserDto extends PickType(UserModel, [
  'email',
  'nickname',
  'password',
  'avatar',
  'verificationCode',
]) {}