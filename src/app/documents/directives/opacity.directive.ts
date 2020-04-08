import { Directive, TemplateRef, ViewContainerRef, OnInit, HostListener, DoCheck } from '@angular/core';

@Directive({
  selector: '[opacity]'
})
export class OpacityDirective implements OnInit, DoCheck {
  
  el: HTMLElement;
  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  ngDoCheck(){
    const position  = this.el.getBoundingClientRect();

    const delta = window.innerHeight / 2 - position.top;
    
    if (0 < delta && delta < this.el.offsetHeight) {
      this.show();
    } else {
      this.hide();
    }
  }

  hide() {
    this.el.classList.remove('visible');
  }

  show() {
    this.el.classList.add('visible');
  }
}
