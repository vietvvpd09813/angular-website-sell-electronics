import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductListComponent } from './home-product-list.component';

describe('HomeProductListComponent', () => {
  let component: HomeProductListComponent;
  let fixture: ComponentFixture<HomeProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeProductListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
