import { Controller, Get } from '@nestjs/common';
import { ChzzkService } from './chzzk.service.js';

@Controller('api/chzzk')
export class ChzzkController {
  constructor(private readonly chzzkService: ChzzkService) {}

  @Get('lives')
  getHello() {
    return this.chzzkService.getLives();
  }
}
