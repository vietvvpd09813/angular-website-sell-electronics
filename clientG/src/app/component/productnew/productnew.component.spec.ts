import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductnewComponent } from './productnew.component';

describe('ProductnewComponent', () => {
  let component: ProductnewComponent;
  let fixture: ComponentFixture<ProductnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductnewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
