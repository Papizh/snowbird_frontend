import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDocModalComponent } from './delete-doc-modal.component';

describe('DeleteDocModalComponent', () => {
  let component: DeleteDocModalComponent;
  let fixture: ComponentFixture<DeleteDocModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDocModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDocModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
