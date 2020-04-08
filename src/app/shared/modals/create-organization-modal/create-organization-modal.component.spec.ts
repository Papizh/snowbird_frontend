import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganizationsModalComponent } from './create-organization-modal.component';

describe('CreateOrganizationsModalComponent', () => {
  let component: CreateOrganizationsModalComponent;
  let fixture: ComponentFixture<CreateOrganizationsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrganizationsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrganizationsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
