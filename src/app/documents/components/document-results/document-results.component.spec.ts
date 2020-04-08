import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentResultsComponent } from './document-results.component';

describe('DocumentResultsComponent', () => {
  let component: DocumentResultsComponent;
  let fixture: ComponentFixture<DocumentResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
