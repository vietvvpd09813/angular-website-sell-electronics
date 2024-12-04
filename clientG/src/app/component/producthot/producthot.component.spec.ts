import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducthotComponent } from './producthot.component';

describe('ProducthotComponent', () => {
  let component: ProducthotComponent;
  let fixture: ComponentFixture<ProducthotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducthotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducthotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
