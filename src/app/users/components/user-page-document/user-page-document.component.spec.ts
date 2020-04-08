import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageDocumentComponent } from './user-page-document.component';

describe('UserPageDocumentComponent', () => {
  let component: UserPageDocumentComponent;
  let fixture: ComponentFixture<UserPageDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPageDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
