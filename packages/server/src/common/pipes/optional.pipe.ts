import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class OptionalPipe implements PipeTransform {
  pipes: PipeTransform[];

  constructor(...pipes: PipeTransform[]) {
    this.pipes = pipes;
  }

  public async transform(value: any, metadata: ArgumentMetadata) {
    if (value === undefined || value === null) {
      return value;
    }

    return this.pipes.reduce(async (deferredValue, pipe) => {
      const val = await deferredValue;
      const result = pipe.transform(val, metadata);
      return result;
    }, Promise.resolve(value));
  }
}
