import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsITEMComponent } from './products-item.component';

describe('ProductsITEMComponent', () => {
  let component: ProductsITEMComponent;
  let fixture: ComponentFixture<ProductsITEMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsITEMComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsITEMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
