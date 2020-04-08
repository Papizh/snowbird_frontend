import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDeleted'
})
export class FilterDeletedPipe implements PipeTransform {

  transform(array: any, args?: any): any {
    return array.map( (item) => !item.delete);
  }
}
