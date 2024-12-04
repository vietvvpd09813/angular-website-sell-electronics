import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createcategori35Component } from './createcategori35.component';

describe('Createcategori35Component', () => {
  let component: Createcategori35Component;
  let fixture: ComponentFixture<Createcategori35Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Createcategori35Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Createcategori35Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
