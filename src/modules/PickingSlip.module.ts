/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PickingSlipController } from 'src/controllers/PickingSlip.controller';
import { PickingSlipRepository } from 'src/repositories/PickingSlip.repository';
import { PickingSlipService } from 'src/services/PickingSlip.service';

@Module({
  controllers: [PickingSlipController], // Correctly register the controller
  providers: [PickingSlipService, PickingSlipRepository],
  exports: [PickingSlipService],
})
export class PickingSlipModule {}
