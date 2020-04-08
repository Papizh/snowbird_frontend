import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAssigningComponent } from './confirm-assigning.component';

describe('ConfirmAssigningComponent', () => {
  let component: ConfirmAssigningComponent;
  let fixture: ComponentFixture<ConfirmAssigningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmAssigningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAssigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
