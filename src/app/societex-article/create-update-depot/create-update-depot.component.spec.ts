import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateDepotComponent } from './create-update-depot.component';

describe('CreateUpdateDepotComponent', () => {
  let component: CreateUpdateDepotComponent;
  let fixture: ComponentFixture<CreateUpdateDepotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateDepotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
