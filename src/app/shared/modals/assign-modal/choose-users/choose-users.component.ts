import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-choose-users',
  templateUrl: './choose-users.component.html',
  styleUrls: ['./choose-users.component.scss']
})
export class ChooseUsersComponent implements OnInit, OnChanges {

  @Input() usersList;
  @Output() chosenUsersList = new EventEmitter();
  @Output() loadNextPage = new EventEmitter();
  @Output() previousStep = new EventEmitter();
  @Output() onUsersSearch = new EventEmitter();

  public usersSearch$ = new Subject();

  constructor() { }

  ngOnInit() {
    this.onUsersSearch.emit('');
    this.onSearchUsers();
  }

  ngOnChanges() {
  }

  public toggleItemInArray(element): void {
    element.selected = !element.selected;
  }
  
  public nextStep(): void {
    this.chosenUsersList.emit({ userList: this.usersList.filter(user => user.selected), step: 2});
  }

  public isDisabled() {
    return !this.usersList.some(user => user.selected);
  }

  public onScroll() {
  }

  onSearchUsers() {
    this.usersSearch$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
      )
      .subscribe((name: string) => {
        this.onUsersSearch.emit(name);
      });
  }
}
