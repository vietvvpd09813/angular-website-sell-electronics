import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimastaComponent } from './animasta.component';

describe('AnimastaComponent', () => {
  let component: AnimastaComponent;
  let fixture: ComponentFixture<AnimastaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimastaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
