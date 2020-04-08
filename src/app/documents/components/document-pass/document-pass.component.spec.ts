import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPassComponent } from './document-pass.component';

describe('DocumentPassComponent', () => {
  let component: DocumentPassComponent;
  let fixture: ComponentFixture<DocumentPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
