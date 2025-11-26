import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginator'
})
export class PaginatorPipe implements PipeTransform {

  transform(array: any[], pageSize: number, pageNumber: number): any[] {
    if (array === undefined || !array.length) return [];

    if (pageSize < 0) return array;

    pageSize = pageSize || 5;
    pageNumber = pageNumber || 1;
    --pageNumber;

    return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
  }

}
