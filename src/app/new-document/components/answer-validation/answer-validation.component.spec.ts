import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerValidationComponent } from './answer-validation.component';

describe('AnswerValidationComponent', () => {
  let component: AnswerValidationComponent;
  let fixture: ComponentFixture<AnswerValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
