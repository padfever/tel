import { Injectable } from '@nestjs/common';
import marked from 'marked';
import TerminalRenderer from 'marked-terminal';
import request from 'request';

import { config } from '../../config';

marked.setOptions({
  renderer: new TerminalRenderer(),
});

@Injectable()
export class TelegramService {
  constructor() {}

  private formatMessage(message: string): string {
    return message
      .replace(/\./g, '\\.')
      .replace(/\-/g, '\\-')
      .replace(/\&/g, '%26')
      .replace(/\#/g, '%23')
      .replace(/\{/g, '\\{')
      .replace(/\}/g, '\\}');
  }

  private async sendMessage(
    text: string,
    parse_mode = 'MarkdownV2'
  ): Promise<boolean> {
    if (process.env.NODE_ENV !== 'production') {
      console.debug('Skipping telegram because not production.');
      console.debug(marked(text));
      return;
    }

    const message = this.formatMessage(text);
    const url = `https://api.telegram.org/bot${config.get(
      'telegram:bot_api_key'
    )}/sendMessage?chat_id=${config.get(
      'telegram:channel_id'
    )}&text=${message}&parse_mode=${parse_mode}`;

    return new Promise((resolve, reject) => {
      request(url)
        .on('response', (response) => resolve(response.statusCode === 200))
        .on('error', (error) => reject(error))
        .on('data', (data) => console.debug(data.toString()));
    });
  }

  public async markdown(
    message: string,
    skipEmail?: boolean
  ): Promise<boolean> {
    return this.sendMessage(message);
  }
}
