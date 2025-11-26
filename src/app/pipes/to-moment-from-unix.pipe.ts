import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'toMomentFromUnix'
})
export class ToMomentFromUnixPipe implements PipeTransform {

  transform(inputData: any, textNull: any, format: any,): unknown {
    if(inputData == null){
      return textNull
    }else{
      if (format === null || typeof format === "undefined") {
        return moment.unix(inputData).calendar().toString();
      } else {
          return moment.unix(inputData).format(format);
      }

    }
  }

}
