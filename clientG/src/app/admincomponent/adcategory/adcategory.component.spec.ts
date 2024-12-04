import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdcategoryComponent } from './adcategory.component';

describe('AdcategoryComponent', () => {
  let component: AdcategoryComponent;
  let fixture: ComponentFixture<AdcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdcategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
