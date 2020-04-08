import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-assign-name',
  templateUrl: './assign-name.component.html',
  styleUrls: ['./assign-name.component.scss']
})
export class AssignNameComponent implements OnInit {

  @Input() assignmentName = '';
  @Output() onConfirmName = new EventEmitter();
  @Input() onlyAssign = false;

  constructor() { }

  ngOnInit() {
  }

  public nextStep(): void {
    if (this.onlyAssign) {
      this.onConfirmName.emit({ name: this.assignmentName, step: 2});
    } else {
      this.onConfirmName.emit({ name: this.assignmentName, step: 1});
    }
  }

  public isDisabled() {
    return !this.assignmentName;
  }
}
