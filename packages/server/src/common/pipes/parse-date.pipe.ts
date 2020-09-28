import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
  Optional,
  PipeTransform,
} from '@nestjs/common';

import {
  ErrorHttpStatusCode,
  HttpErrorByCode,
} from '@nestjs/common/utils/http-error-by-code.util';

export interface ParseDatePipeOptions {
  errorHttpStatusCode?: ErrorHttpStatusCode;
  exceptionFactory?: (error: string) => any;
}

function isValidDate(date: Date) {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
  protected exceptionFactory: (error: string) => any;

  constructor(@Optional() options?: ParseDatePipeOptions) {
    options = options || {};
    const {
      exceptionFactory,
      errorHttpStatusCode = HttpStatus.BAD_REQUEST,
    } = options;

    this.exceptionFactory =
      exceptionFactory ||
      ((error) => new HttpErrorByCode[errorHttpStatusCode](error));
  }

  transform(value: string, metadata: ArgumentMetadata): Date {
    const date = new Date(value);

    if (!isValidDate(date)) {
      throw new BadRequestException('');
    }

    return date;
  }
}
