import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimastaitemComponent } from './animastaitem.component';

describe('AnimastaitemComponent', () => {
  let component: AnimastaitemComponent;
  let fixture: ComponentFixture<AnimastaitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimastaitemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimastaitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
