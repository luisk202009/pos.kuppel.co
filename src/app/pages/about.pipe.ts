import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'about'
})
export class AboutPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
