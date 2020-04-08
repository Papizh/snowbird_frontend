import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignNameComponent } from './assign-name.component';

describe('AssignNameComponent', () => {
  let component: AssignNameComponent;
  let fixture: ComponentFixture<AssignNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
