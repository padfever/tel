import { Injectable, Inject } from '@nestjs/common';
import moment from 'moment';

import { TelegramService } from '../common/services/telegram.service';

export interface ActionStreamOptions {
  user?: string;
  clientTime?: Date;
  serverTime?: Date;
}

@Injectable()
export class ActionStreamTelegramService {
  constructor(private readonly telegram: TelegramService) {}

  private italics(message: string) {
    return `*${message}*`;
  }

  private escapeForMarkdown(message: string) {
    return message
      .replace(/\*/g, '\\*')
      .replace(/\_/g, '\\_')
      .replace(/\=/g, '\\=')
      .replace(/\#/g, '\\#');
  }

  private formatMessage(
    label: string,
    subject: string,
    italicizeLabel: boolean = true,
    italicizeSubject: boolean = false
  ) {
    let _label = this.escapeForMarkdown(label);
    if (italicizeLabel) {
      _label = this.italics(_label);
    }
    let _subject = this.escapeForMarkdown(subject);
    if (italicizeSubject) {
      _subject = this.italics(_subject);
    }

    return `*${_label}*: ${_subject}`;
  }

  private formatDateMessage(date: Date, key: string) {
    const label = key === 'clientTime' ? 'Client Time' : 'Server Time';
    return this.formatMessage(label, moment(date).format());
  }

  private formatOptions(options: ActionStreamOptions): string[] {
    const messages = ['user', 'clientTime', 'serverTime'].map((key) => {
      if ((options[key] ?? null) === null) {
        return null;
      }

      switch (key) {
        case 'clientTime':
        case 'serverTime':
          return this.formatDateMessage(options[key], key);

        default:
        case 'user':
          return this.formatMessage(options[key], key);
      }
    });

    return messages.filter((a) => a);
  }

  public async action(
    subject: string,
    action: string,
    options: ActionStreamOptions = {}
  ): Promise<boolean> {
    let message = this.formatMessage(action, subject, true, true);
    if (options) {
      const extraMessages = this.formatOptions(options);
      for (const extraMessage of extraMessages) {
        message = `${message}\n- ${extraMessage}`;
      }
    }

    return this.telegram.markdown(message, true);
  }
}
