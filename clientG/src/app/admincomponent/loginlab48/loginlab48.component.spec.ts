import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loginlab48Component } from './loginlab48.component';

describe('Loginlab48Component', () => {
  let component: Loginlab48Component;
  let fixture: ComponentFixture<Loginlab48Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loginlab48Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Loginlab48Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
