import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appScrollDirective]'
})
export class ScrollDirectiveDirective {

  @Output() onScroll = new EventEmitter<number>();

  @HostListener('scroll', ['$event'])
  onListenerTriggered(event: UIEvent): void {
    if (event.srcElement.scrollHeight < event.srcElement.clientHeight + event.srcElement.scrollTop + 0.8) {
      this.onScroll.emit();
    }
  }
}
