import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoradStatus } from '../boards-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoradStatus.PRIVATE, BoradStatus.PUBLIC];

  transform(value: any) {
    console.log(value);
    value = value.toUpperCase();

    console.log(value);

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status option`);
    }
    return value;
  }
  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
