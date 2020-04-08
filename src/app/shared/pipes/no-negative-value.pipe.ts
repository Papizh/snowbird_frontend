import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Pipe({
  name: 'noIncorrectValue'
})
export class NoNegativeValuePipe implements PipeTransform {

  constructor(private toastr: ToastrService) {}

  transform(value: number, incorrectValues: string[]): any {
    const incorrect = incorrectValues.some((incorrectValue) => {
      switch (incorrectValue) {
        case 'zero': {
          if (value === 0) {
            setTimeout( () => this.toastr.warning('That value cannot be zero!'), 100);
            return true;
          }
          break;
        }
        case 'negative': {
          if (value < 0) {
            setTimeout( () => this.toastr.warning('That value cannot be negative!'), 100);
            return true;
          }
          break;
        }
      }
      return false;
    });

    if (incorrect) {
      setTimeout(() => this.unfocus(), 100);
    }

    return incorrect ? undefined : value;
  }

  unfocus() {
    window.focus();
    if (document.activeElement) {
        document.activeElement['blur']();
    }
  }
}
