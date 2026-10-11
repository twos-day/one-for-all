import { Module } from '@nestjs/common';
import { ChzzkService } from './chzzk.service.js';
import { ChzzkController } from './chzzk.controller.js';

@Module({
  controllers: [ChzzkController],
  providers: [ChzzkService],
})
export class ChzzkModule {}
