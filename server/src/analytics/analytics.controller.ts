import {
  Controller,
  DefaultValuePipe,
  HttpCode,
  Injectable,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { NotNullPipe } from '../common/pipes/not-null.pipe';
import { OptionalPipe } from '../common/pipes/optional.pipe';
import { ParseDatePipe } from '../common/pipes/parse-date.pipe';
import { ActionStreamTelegramService } from './action-stream-telegram.service';

@Injectable()
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly stream: ActionStreamTelegramService) {}

  @HttpCode(200)
  @Post('action')
  public async action(
    @Query(
      'action',
      new DefaultValuePipe(null),
      new NotNullPipe('`action` cannot be null')
    )
    action: string,
    @Query(
      'subject',
      new DefaultValuePipe(null),
      new NotNullPipe('`subject` cannot be null')
    )
    subject: string,
    @Query('ts', new OptionalPipe(new ParseDatePipe())) clientTime?: Date,
    @Query('user') user?: string
  ): Promise<void> {
    const serverTime = new Date();
    this.stream.action(subject, action, { user, clientTime, serverTime });
  }
}
