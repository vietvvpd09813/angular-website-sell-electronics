import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdorderComponent } from './adorder.component';

describe('AdorderComponent', () => {
  let component: AdorderComponent;
  let fixture: ComponentFixture<AdorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdorderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
