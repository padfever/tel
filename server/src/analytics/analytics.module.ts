import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';

import { ActionStreamTelegramService } from './action-stream-telegram.service';
import { AnalyticsController } from './analytics.controller';

@Module({
  imports: [CommonModule],
  controllers: [AnalyticsController],
  providers: [ActionStreamTelegramService],
  exports: [ActionStreamTelegramService],
})
export class AnalyticsModule {}
