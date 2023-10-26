import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineBreak',
})
export class PipesPipe implements PipeTransform {
  transform(value: string): string {
    if (value && value.length > 20) {
      return value.replace(/(.{35})/g, '$1<br>');
    }
    return value;
  }
}
