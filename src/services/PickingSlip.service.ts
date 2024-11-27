/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PickingSlipRepository } from 'src/repositories/PickingSlip.repository';

type GetPickingSlipsQuery = {
    limit?: number,
    offset?: number,
    status?: string
}

@Injectable()
export class PickingSlipService {

 constructor(private readonly pickingSlipRepository: PickingSlipRepository) {}

  async GetPickingSlips(query: GetPickingSlipsQuery): Promise<any> {

    const result = await this.pickingSlipRepository.GetPickingSlips({
        limit: Number(query.limit) || 10,
        offset: Number(query.offset) || 0,
        status: query.status || 'all'
    });

    return result;
  }
}
