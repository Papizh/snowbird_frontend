import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDocumentsComponent } from './choose-documents.component';

describe('ChooseDocumentsComponent', () => {
  let component: ChooseDocumentsComponent;
  let fixture: ComponentFixture<ChooseDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
