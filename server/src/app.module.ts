import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [CommonModule, AnalyticsModule],
})
export class ApplicationModule {}
