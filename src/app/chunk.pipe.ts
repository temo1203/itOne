import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Pipe({
  name: 'chunk',
})
export class ChunkPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) {
      return '';
    }

    const chunks = [];
    for (let i = 0; i < value.length; i += 40) {
      chunks.push(value.slice(i, i + 40));
    }

    const result = chunks.join('<br>');
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }
}
