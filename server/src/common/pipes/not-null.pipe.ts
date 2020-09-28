import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class NotNullPipe implements PipeTransform {
  constructor(private readonly message: string = 'Cannot be null') {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (value === null) {
      throw new BadRequestException(this.message);
    }

    return value;
  }
}
