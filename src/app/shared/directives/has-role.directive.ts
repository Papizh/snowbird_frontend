import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appHasRole]'
})

export class HasRoleDirective implements OnInit {

  @Input() appHasRole;
  private userRole: string;

  constructor(private viewContainerRef: ViewContainerRef,
              private template: TemplateRef<any>) {}

  ngOnInit() {
    this.userRole = localStorage.getItem('User-Role');
    this.checkRoles(this.userRole);
  }

  checkRoles(userRole: string) {
    if (!this.appHasRole || this.appHasRole.indexOf(userRole) !== -1) {
      this.viewContainerRef.createEmbeddedView(this.template);
    } else {
      this.viewContainerRef.clear();
    }
  }
}

