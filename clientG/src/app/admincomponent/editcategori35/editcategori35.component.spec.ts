import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editcategori35Component } from './editcategori35.component';

describe('Editcategori35Component', () => {
  let component: Editcategori35Component;
  let fixture: ComponentFixture<Editcategori35Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editcategori35Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editcategori35Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
