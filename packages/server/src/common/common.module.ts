import { Global, Module } from '@nestjs/common';

import { TelegramService } from './services/telegram.service';

@Global()
@Module({
  providers: [TelegramService],
  exports: [TelegramService],
})
export class CommonModule {}
