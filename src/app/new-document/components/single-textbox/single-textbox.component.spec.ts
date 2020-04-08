import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTextboxComponent } from './single-textbox.component';

describe('SingleTextboxComponent', () => {
  let component: SingleTextboxComponent;
  let fixture: ComponentFixture<SingleTextboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTextboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
