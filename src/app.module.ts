/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PickingSlipModule } from './modules/PickingSlip.module';


@Module({
  imports: [PickingSlipModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
