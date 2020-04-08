import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsUsersListComponent } from './organizations-users-list.component';

describe('OrganizationsUsersListComponent', () => {
  let component: OrganizationsUsersListComponent;
  let fixture: ComponentFixture<OrganizationsUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationsUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
