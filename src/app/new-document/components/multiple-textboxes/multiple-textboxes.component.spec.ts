import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleTextboxesComponent } from './multiple-textboxes.component';

describe('MultipleTextboxesComponent', () => {
  let component: MultipleTextboxesComponent;
  let fixture: ComponentFixture<MultipleTextboxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleTextboxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleTextboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
