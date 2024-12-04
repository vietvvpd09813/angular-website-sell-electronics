import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddCategoryComponent } from './form-add-category.component';

describe('FormAddCategoryComponent', () => {
  let component: FormAddCategoryComponent;
  let fixture: ComponentFixture<FormAddCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
