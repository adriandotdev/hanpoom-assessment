/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { PickingSlipService } from 'src/services/PickingSlip.service';

@Controller('api/v1/picking-slips')
export class PickingSlip {
  constructor(private readonly pickingSlipService: PickingSlipService) {}

  @Get()
  getHello(): string {
    return this.pickingSlipService.GetPickingSlips();
  }
}
