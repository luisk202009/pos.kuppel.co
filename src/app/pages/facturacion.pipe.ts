import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'facturacion'
})
export class FacturacionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
