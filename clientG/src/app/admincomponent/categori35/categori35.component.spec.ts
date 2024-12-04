import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Categori35Component } from './categori35.component';

describe('Categori35Component', () => {
  let component: Categori35Component;
  let fixture: ComponentFixture<Categori35Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Categori35Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Categori35Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
