import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input() user;
  @Input() index;
  @Output() editUserEmit = new EventEmitter();
  @Output() deleteUserEmit = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  public editUser(e): void {
    this.editUserEmit.emit(e);
  }

  public deleteUserItem(e): void {
    this.deleteUserEmit.emit({e});
  }
}
