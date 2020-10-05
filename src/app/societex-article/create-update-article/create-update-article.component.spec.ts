import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateArticleComponent } from './create-update-article.component';

describe('CreateUpdateArticleComponent', () => {
  let component: CreateUpdateArticleComponent;
  let fixture: ComponentFixture<CreateUpdateArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
