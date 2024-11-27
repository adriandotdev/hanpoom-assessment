/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { PickingSlipService } from 'src/services/PickingSlip.service';

type GetPickingSlipsQuery = {
    limit?: number,
    offset?: number,
    status?: string
}

@Controller('api/v1/picking-slips')
export class PickingSlipController {
  constructor(private readonly pickingSlipService: PickingSlipService) {}

  @Get('/')
  async getHello(@Query() query: GetPickingSlipsQuery): Promise<any> {

    const result = await this.pickingSlipService.GetPickingSlips(query);

    return {
        status: 200,
        data: result,
        message: 'OK'
    }
  }
}
