import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdproductComponent } from './adproduct.component';

describe('AdproductComponent', () => {
  let component: AdproductComponent;
  let fixture: ComponentFixture<AdproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdproductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
